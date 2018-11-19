import azure from 'azure-storage'
import queryString from 'query-string'
import * as ocean from './ocean'
import * as asset from './asset'
import { Logger } from '@oceanprotocol/squid'
import { storageAccount, accessKey } from '../../config/cloudStorage'

export function setProviders() {
    return async (dispatch) => {
        dispatch({
            type: 'SET_PROVIDERS',
            ...(await ocean.provideOcean())
        })
    }
}

export function getAccounts() {
    return async (dispatch, getState) => {
        const state = getState()
        const {
            ocean
        } = state.provider
        dispatch({
            type: 'SET_ACCOUNTS',
            accounts: await ocean.getAccounts()
        })
    }
}

export function getActiveAccount(state) {
    let {
        activeAccount,
        accounts
    } = state.account
    if (accounts.length === 0) {
        return null
    }
    return accounts[activeAccount]
}

export function setNetworkName() {
    return async (dispatch, getState) => {
        const state = getState()
        const {
            ocean
        } = state.provider
        dispatch({
            type: 'SET_NETWORKNAME',
            networkName: await ocean.keeper.getNetworkName()
        })
    }
}

export function getNetworkName(state) {
    let {
        networkName
    } = state.account
    return networkName
}

export function makeItRain(amount) {
    return async (dispatch, getState) => {
        const state = getState()
        const {
            ocean
        } = state.provider
        try {
            await ocean.keeper.market.requestTokens(
                amount,
                getActiveAccount(state).id
            )
            dispatch(getAccounts())
        } catch (e) {
            Logger.error(e)
        }
    }
}

export function putAsset(formValues) {
    return async (dispatch, getState) => {
        const state = getState()
        const account = getActiveAccount(state)

        await asset.publish(
            formValues,
            account,
            state.provider
        )

        dispatch(getAssets())
    }
}

export function getAssets() {
    return async (dispatch, getState) => {
        const state = getState()
        const assets = (await asset
            .list(state))
            .reduce((map, obj) => {
                map[obj.id] = obj
                return map
            }, {})
        Logger.log('assets:', assets)
        dispatch({
            type: 'GET_ASSETS',
            assets
        })
    }
}

export function setAssetSearchPage(page) {
    return (dispatch) => {
        dispatch({
            type: 'SET_ASSET_SEARCH_PAGE',
            page: page
        })
    }
}

export function setActiveAsset(assetId) {
    return (dispatch) => {
        dispatch({
            type: 'SET_ACTIVE_ASSET',
            activeAsset: assetId
        })
    }
}

export function getActiveAsset(state) {
    const {
        activeAsset,
        assets
    } = state.asset

    if (!activeAsset && state.router.location.pathname) {
        const rgxAssetId = /\/(.*?)/g
        const {
            pathname
        } = state.router.location
        if (rgxAssetId.exec(pathname)) {
            const assetIdFromUrl = pathname.replace(/^.*[\\\/]/, '') // eslint-disable-line
            if (assetIdFromUrl) {
                return assets[assetIdFromUrl]
            }
        }
    }

    return assets[activeAsset]
}

export function purchaseAsset(assetId) {
    return async (dispatch, getState) => {
        const state = getState()
        const activeAsset = getActiveAsset(state)
        const token = await asset.purchase(
            activeAsset,
            getActiveAccount(state),
            state.provider
        )

        dispatch({
            type: 'UPDATE_ASSET',
            assetId,
            asset: Object.assign(activeAsset, {
                token
            })
        })
    }
}

export function getActiveOrder(state) {
    const {
        activeOrder,
        orders
    } = state.order

    if (activeOrder) {
        return orders[activeOrder]
    }

    return {}
}

export function setActiveOrder(orderId) {
    return (dispatch) => {
        dispatch({
            type: 'SET_ACTIVE_ORDER',
            activeOrder: orderId
        })
    }
}

export function getOrders() {
    return async (dispatch, getState) => {
        const state = getState()
        const account = getActiveAccount(state)
        if (!account) {
            Logger.error('Active account is not set!')
            return []
        }
        const {
            ocean
        } = state.provider
        // Logger.log('ORDERS: ', await ocean.getOrdersByAccount(account))
        // let orders = await ocean.order.getOrdersByConsumer(account.name)
        let orders = await ocean.getOrdersByAccount(account)
        // Logger.log('ORDERS: ', orders, Object.values(state.asset.assets))
        let assets = null
        // do we have assets in the state?ß
        if (Object.values(state.asset.assets).length !== 0) {
            // yep, map them to assets
            assets = Object.values(state.asset.assets).reduce((map, obj) => {
                map[obj.assetId] = obj
                return map
            })
        }
        // do we have mapped assets?
        if (assets !== null && Object.values(assets).length !== 0) {
            // yep, so map the names of the assets to the order
            for (let order of orders) {
                if (order._resourceId && assets[order._resourceId] && assets[order._resourceId].base) {
                    order.assetName = assets[order._resourceId].base.name
                }
            }
        }
        // map orders by order id
        orders = await orders.reduce((map, obj) => {
            map[obj._id] = obj
            return map
        }, {})
        // Logger.log('Mapped orders: ', JSON.stringify(orders, null, 2))
        Logger.log(`Mapped ${Object.keys(orders).length} orders.`)

        dispatch({
            type: 'SET_ORDERS',
            orders
        })
    }
}

export function getOauthAccounts() {
    return (dispatch) => {
        let oauthAccounts = {}
        let storeObject = window.localStorage.getItem('oauthAccounts')
        if (storeObject !== null && storeObject !== undefined) {
            oauthAccounts = JSON.parse(storeObject)
        }
        dispatch({
            type: 'SET_OAUTH_ACCOUNTS',
            oauthAccounts: oauthAccounts
        })
    }
}

export function updateOauthAccounts(state) {
    if (state.router.location.pathname === '/oauth/azure') {
        const query = queryString.parse(state.router.location.hash)
        state.oauthAccounts['azure'] = query
        state.oauthAccounts['azure'].expires_on = new Date(new Date().getTime() + parseInt(query['expires_in'])).getTime()
    }
    window.localStorage.setItem('oauthAccounts', JSON.stringify(state.oauthAccounts))
    return (dispatch) => {
        dispatch({
            type: 'SET_OAUTH_ACCOUNTS',
            oauthAccounts: state.oauthAccounts
        })
    }
}

export function clearCloudFiles() {
    return (dispatch) => {
        dispatch({
            type: 'CLEAR_CLOUD_BLOBS'
        })
    }
}

export function getCloudFiles() {
    /* Get list of blobs in cloud storage if cloud access is defined in the config file */
    return (dispatch, getState) => {
        const state = getState()

        if (state.oauthAccounts.azure !== undefined) {
            const tokenCredential = new azure.TokenCredential(state.oauthAccounts.azure.access_token)
            const blobService = azure.createBlobServiceWithTokenCredential(`https://${storageAccount}.blob.core.windows.net`, tokenCredential)
            try {
                blobService.listContainersSegmented(null, async function(error, results) {
                    if (error) {
                        Logger.error('Error listing containers', error)
                        dispatch({
                            type: 'CLOUD_ERROR',
                            error: `Error listing containers: ${error.message}`
                        })
                    } else {
                        const cloudBlobs = []
                        for (const con of results.entries) {
                            const files = await getContainerFiles(con.name)
                            for (const file of files) {
                                cloudBlobs.push({
                                    container: con.name,
                                    blobName: file.name
                                })
                            }
                        }
                        Logger.log('Blobs from azure storage: ', cloudBlobs)
                        dispatch({
                            type: 'CLOUD_BLOBS',
                            blobs: cloudBlobs
                        })
                    }
                })
            } catch (error) {
                dispatch({
                    type: 'CLOUD_ERROR',
                    error: `Error: ${error.message}`
                })
            }
        }
    }
}

export function getContainerFiles(container) {
    return new Promise((resolve, reject) => {
        const blobservice = azure.createBlobService(storageAccount, accessKey)
        blobservice.listBlobsSegmented(container, null, (error, result) => {
            if (!error) {
                resolve(result.entries)
            } else {
                reject(error.message)
            }
        })
    })
}
