import AssetModel from '../models/asset'
import { Logger } from '@oceanprotocol/squid'
// import quertString from 'query-string'

export async function publish(formValues, account, providers) {
    const { ocean } = providers
    // Get user entered form values
    const {
        name,
        description,
        license,
        files,
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
            author,
            license,
            copyrightHolder,
            files: [{
                index: 0,
                url: files
            }],
            links: links,
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
    try {
        const asset = await ocean.assets.create(
            newAsset,
            account
        )
        Logger.debug('asset: ', asset)
        return asset
    } catch (e) {
        // make readable errors
        Logger.log('error:', e)
    }
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
    let queryRequest = {
        offset: 500,
        page: state.asset.search.page,
        sort: {
            text: 1
        },
        query: {}
    }
    if (searchForm.text && searchForm.text !== '') {
        queryRequest.query['text'] = [searchForm.text]
    }
    if (searchForm.license) {
        queryRequest.query['license'] = [searchForm.license]
    }
    if (searchForm.type) {
        queryRequest.query['type'] = [searchForm.type]
    }
    if (searchForm.categories) {
        queryRequest.query['categories'] = [searchForm.categories]
    }
    if (searchForm.updateFrequency) {
        queryRequest.query['updateFrequency'] = [searchForm.updateFrequency]
    }
    if (searchForm.priceFrom) {
        queryRequest.query['price'] = [searchForm.priceFrom]
    }
    if (searchForm.priceTo) {
        queryRequest.query['price'] = [0, searchForm.priceTo]
    }
    if (searchForm.priceFrom && searchForm.priceTo) {
        queryRequest.query['price'] = [searchForm.priceFrom, searchForm.priceTo]
    }
    if (searchForm.addedIn) {
        queryRequest.query['created'] = [searchForm.addedIn]
    }
    let dbAssets = await ocean.assets.query(queryRequest)
    Logger.log(`Loaded ${Object.keys(dbAssets).length} assets (from provider)`)
    return dbAssets
}

export async function purchase(inputDdo, consumer, providers) {
    const { ocean } = providers
    try {
        const accessService = inputDdo.findServiceByType('Access')
        const agreementId = await ocean.assets.order(
            inputDdo.id,
            accessService.serviceDefinitionId,
            consumer
        )
        const folder = ''
        const path = await ocean.assets.consume(agreementId, inputDdo.id, accessService.serviceDefinitionId, consumer, folder)
        Logger.log('path', path)
    } catch (e) {
        Logger.log('error', e)
    }
}
