/* eslint-disable no-console */
import fetchDownload from 'fetch-download'
import AssetModel from '../models/asset'
import { Logger } from '@oceanprotocol/squid'

export async function publish(formValues, account, providers) {
    const { ocean } = providers
    const publisherId = account.getId()
    // Get user entered form values
    const {
        name,
        description,
        license,
        contentUrls,
        author,
        copyrightHolder,
        tags,
        price,
        type,
        updateFrequency
    } = formValues

    // Register on the keeper (on-chain) first, then on the OceanDB
    const assetId = await ocean.register(
        name, description, price, account
    )
    console.log('ASSETID', assetId)
    // Now register in oceandb and publish the metadata
    const newAsset = {
        assetId,
        publisherId,

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
            // links: ,
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
    const res = await ocean.metadata.publishDataAsset(newAsset)
    Logger.debug('res: ', res)
    return newAsset
}

// export async function list(account, providers) {
//     const { ocean } = providers
//     let dbAssets = await ocean.metadata.getAssetsMetadata()
//     // Logger.log('Loaded assets (from provider):', JSON.stringify(dbAssets, null, 2))
//     Logger.log(`Loaded ${Object.keys(dbAssets).length} assets (from provider)`)
//
//     dbAssets = Object.values(dbAssets)
//         .filter(async (asset) => ocean.asset.isAssetActive(asset.assetId))
//     // Logger.log('Loaded assets (that are published on-chain):', JSON.stringify(dbAssets, null, 2))
//     Logger.log(`Loaded ${Object.keys(dbAssets).length} assets (that are published on-chain)`)
//
//     return dbAssets
// }

export async function purchase(asset, account, providers) {
    // const { ocean } = providers

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
