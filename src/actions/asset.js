/* eslint-disable no-console */
// import fetchDownload from 'fetch-download'
import AssetModel from '../models/asset'
import { Logger } from '@oceanprotocol/squid'

export async function publish(formValues, account, providers) {
    const { ocean } = providers
    // Get user entered form values
    const {
        name,
        description,
        license,
        contentUrls,
        linkTitle,
        linkType,
        linkUrl,
        author,
        copyrightHolder,
        tags,
        price,
        type,
        updateFrequency
    } = formValues
    // Now register in oceandb and publish the metadata
    const newAsset = {
        // OEP-08 Attributes
        // https://github.com/oceanprotocol/OEPs/tree/master/8
        base: Object.assign(AssetModel.base, {
            name,
            description,
            dateCreated: (new Date()).toString(),
            // size: ,
            author,
            license,
            copyrightHolder,
            // encoding: ,
            // compression: ,
            // contentType: ,
            // workExample: ,
            contentUrls: [contentUrls],
            links: [
                {
                    title: linkTitle,
                    type: linkType,
                    url: linkUrl
                }
            ],
            // inLanguage: ,
            tags: tags ? [tags.split(',')] : [],
            price: parseFloat(price),
            type
        }),
        curation: Object.assign(AssetModel.curation, {
            rating: 0,
            numVotes: 0,
            schema: 'Binary Voting'
        }),
        additionalInformation: Object.assign(AssetModel.additionalInformation, {
            updateFrequency
        })
    }
    const ddo = await ocean.registerAsset(newAsset, account)
    Logger.debug('res: ', ddo)
    return newAsset
}

export async function list(state) {
    const {
        ocean
    } = state.provider
    const searchForm = state.form.assetSearch.values
    const queryRequest = {
        offset: 100,
        page: state.asset.search.page,
        query: {}
    }
    Logger.log('searchForm:', queryRequest)
    if (Object.keys(searchForm).length > 2) {
        queryRequest.query['$and'] = []
    }
    if (searchForm.text !== '') {
        queryRequest.query['$and'] = [
            {
                $text: {
                    $search: searchForm.text
                }
            }
        ]
    }
    if (searchForm.license) {
        queryRequest.query['$and'].push({
            service: {
                '$elemMatch': {
                    'metadata.base.license': searchForm.license
                }
            }
        })
    }
    if (searchForm.type) {
        queryRequest.query['$and'].push({
            service: {
                '$elemMatch': {
                    'metadata.base.type': searchForm.type
                }
            }
        })
    }
    if (searchForm.updateFrequency) {
        queryRequest.query['$and'].push({
            service: {
                '$elemMatch': {
                    'metadata.additionalInformation.updateFrequency': searchForm.updateFrequency
                }
            }
        })
    }
    if (searchForm.priceFrom) {
        queryRequest.query['$and'].push({
            service: {
                '$elemMatch': {
                    'metadata.base.price': {
                        '$gte': searchForm.priceFrom
                    }
                }
            }
        })
    }
    if (searchForm.priceTo) {
        queryRequest.query['$and'].push({
            service: {
                '$elemMatch': {
                    'metadata.base.price': {
                        '$lte': searchForm.priceTo
                    }
                }
            }
        })
    }
    if (searchForm.addedIn) {
        const nowDate = new Date()
        if (searchForm.addedIn === 'today') {
            queryRequest.query['$and'].push({
                service: {
                    '$elemMatch': {
                        'metadata.base.dateCreated': {
                            '$gte': new Date(nowDate.getFullYear(), nowDate.getMonth(), nowDate.getDate())
                        }
                    }
                }
            })
        }
        if (searchForm.addedIn === 'thisMonth') {
            queryRequest.query['$and'].push({
                service: {
                    '$elemMatch': {
                        'metadata.base.dateCreated': {
                            '$gte': new Date(nowDate.getFullYear(), nowDate.getMonth(), 1)
                        }
                    }
                }
            })
        }
        if (searchForm.addedIn === 'thisYear') {
            queryRequest.query['$and'].push({
                service: {
                    '$elemMatch': {
                        'metadata.base.dateCreated': {
                            '$gte': new Date(nowDate.getFullYear(), 0, 1)
                        }
                    }
                }
            })
        }
    }
    let dbAssets = await ocean.searchAssets(queryRequest)
    // Logger.log('Loaded assets (from provider):', JSON.stringify(dbAssets, null, 2))
    Logger.log(`Loaded ${Object.keys(dbAssets).length} assets (from provider)`)

    console.log('assets loaded', dbAssets)
    console.log('OCAN', ocean)

    // dbAssets = Object.values(dbAssets)
    //     .filter(async (asset) => ocean.keeper.market.isAssetActive(asset.id))

    // Logger.log('Loaded assets (that are published on-chain):', JSON.stringify(dbAssets, null, 2))
    Logger.log(`Loaded ${Object.keys(dbAssets).length} assets (that are published on-chain)`)
    return dbAssets
}

export async function purchase(asset, account, providers) {
    // const { ocean } = providers

    /*
    const serviceAgreementId: string = IdGenerator.generateId()
    const serviceAgreementSignature: string = await ocean.signServiceAgreement(ddo.id, serviceAgreementId, consumer)
    const serviceAgreement: ServiceAgreement = await ocean.executeServiceAgreement(ddo.id, serviceAgreementId,
        serviceAgreementSignature, consumer, publisher)
    */

    /*
    Logger.log('Purchasing asset by consumer:', account.name, 'assetid: ', asset.assetId)
    const serviceAgreementId = 1
    // TODO: allow user to set timeout through the UI.
    const timeout = new Date().setHours(new Date().getHours() + 12)
    // const order = await ocean.order.purchaseAsset(asset, timeout, account.name)
    const order = await asset.purchase(asset.assetId, serviceAgreementId, timeout)
    Logger.log('order', order)
    if (order.accessUrl) {
        Logger.log('begin downloading asset data.')
        const res = await fetchDownload(order.accessUrl)
            .then((result) => Logger.log('Asset data downloaded successfully: ', result))
            .catch((error) => Logger.log('Asset download failed: ', error))
        Logger.debug('res: ', res)
    }
    Logger.log('purchase completed, new order is: ', order)
    */
}

// export async function listCloudFiles() {
//     if (cloudName === 'azure') {
//         const fileService = azure.createFileService(storageAccount, accessKey)
//         fileService.listFilesAndDirectoriesSegmented(shareName, folderName, null, null, (error, result, response) => {
//             console.log('files: ', result, response)
//             return (error, result)
//         })
//     }
// }
