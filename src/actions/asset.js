import AssetModel from '../models/asset'
import { Logger } from '@oceanprotocol/squid'
import quertString from 'query-string'

export async function publish(formValues, account, providers) {
    const { ocean } = providers
    // Get user entered form values
    const {
        name,
        description,
        license,
        contentUrls,
        links,
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
            links: links,
            // inLanguage: ,
            tags: tags,
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
    let searchForm
    if (state.form && state.form.assetSearch && state.form.assetSearch.values) {
        searchForm = state.form.assetSearch.values
    } else {
        searchForm = {
            page: 0,
            text: ''
        }
    }
    const queryRequest = {
        offset: 100,
        page: state.asset.search.page,
        query: {}
    }
    Logger.log('searchForm:', queryRequest)
    if (Object.keys(searchForm).length > 2) {
        queryRequest.query['$and'] = []
    }
    if (searchForm.text && searchForm.text !== '') {
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
    Logger.log(`Loaded ${Object.keys(dbAssets).length} assets (from provider)`)
    return dbAssets
}

export function download(fileName) {
    const parsedUrl = quertString.parseUrl(fileName)
    setTimeout(() => {
        // eslint-disable-next-line
        window.open(parsedUrl.query.url)
    }, 100)
}
