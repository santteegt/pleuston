import azure from 'azure-storage'
import * as ocean from './ocean'
import * as asset from './asset'
import { Logger } from '@oceanprotocol/squid'
import { storageAccount, accessKey } from '../../config/cloudStorage'
import queryString from 'query-string'

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
        const { ocean } = state.provider
        dispatch({
            type: 'SET_ACCOUNTS',
            accounts: await ocean.getAccounts()
        })
    }
}

export function getActiveAccount(state) {
    let { activeAccount, accounts } = state.account
    if (accounts.length === 0) {
        return null
    }
    return accounts[activeAccount]
}

export function setNetworkName() {
    return async (dispatch, getState) => {
        const state = getState()
        const { ocean } = state.provider
        dispatch({
            type: 'SET_NETWORKNAME',
            networkName: await ocean.keeper.getNetworkName()
        })
    }
}

export function getNetworkName(state) {
    let { networkName } = state.account
    return networkName
}

export function makeItRain(amount) {
    return async (dispatch, getState) => {
        const state = getState()
        const { ocean } = state.provider
        try {
            await ocean.account.requestTokens(
                amount,
                getActiveAccount(state).name
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
    /* Get list of assets for the current selected account */
    return async (dispatch, getState) => {
        const state = getState()
        const assets = (await asset
            .list(
                getActiveAccount(state),
                state.provider
            ))
            .reduce((map, obj) => {
                map[obj.assetId] = obj
                return map
            }, {})

        dispatch({
            type: 'GET_ASSETS',
            assets
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
    const { activeAsset, assets } = state.asset

    if (!activeAsset && state.router.location.pathname) {
        const rgxAssetId = /\/(.*?)/g
        const { pathname } = state.router.location
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
            asset: Object.assign(activeAsset, { token })
        })
    }
}

export function setAssetFilter(filter) {
    return (dispatch) => {
        dispatch({
            type: 'SET_ASSET_FILTER',
            filter
        })
    }
}

export function getActiveOrder(state) {
    const { activeOrder, orders } = state.order

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
        const { ocean } = state.provider
        let orders = await ocean.order.getOrdersByConsumer(account.name)
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
    }
    window.localStorage.setItem('oauthAccounts', JSON.stringify(state.oauthAccounts))
    return (dispatch) => {
        dispatch({
            type: 'SET_OAUTH_ACCOUNTS',
            oauthAccounts: state.oauthAccounts
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

            blobService.listContainersSegmented(null, function(error, results) {
                if (error) {
                    Logger.error('Error listing containers', error)
                    dispatch({
                        type: 'CLOUD_ERROR',
                        error: `Error listing containers: ${error.message}`
                    })
                } else {
                    Logger.log('CONTAINERS', results)
                    const cloudBlobs = []

                    for (const con of results.entries) {
                        /*
                        // FOLLOWING FUNCTIONS ARE NOT WORKING DUE AZURE PREVIEW
                        blobService.listBlobsSegmented(containr.name, null, (error, results) => {
                            if (!error) {
                                Logger.log('Blobs in Azure Storage.', results)
                            } else {
                                Logger.error('Error listing Blobs in Azure Storage.', error)
                            }
                        })
                        */
                        const blobservice = azure.createBlobService(storageAccount, accessKey)
                        blobservice.listBlobsSegmented(con.name, null, (error, result) => {
                            if (!error) {
                                // Just process blobs,ignoring directories for now
                                for (let blob of result.entries) {
                                    // Deal with blob object
                                    cloudBlobs.push({ container: con.name, blobName: blob.name })
                                }
                            } else {
                                Logger.error('Error listing Blobs in Azure Storage.', error)
                                dispatch({
                                    type: 'CLOUD_ERROR',
                                    error: `Error listing Blobs in Azure Storage: ${error.message}`
                                })
                            }
                        })
                    }

                    Logger.log('Blobs from azure storage: ', cloudBlobs)
                    dispatch({
                        type: 'CLOUD_BLOBS',
                        blobs: cloudBlobs
                    })
                }
            })
        }
    }
}
