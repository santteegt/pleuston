import * as ocean from './ocean'
import * as asset from './asset'
import { Logger } from '@oceanprotocol/squid'
import StorageProviders from '../lib/storage-providers'

const storageProviders = new StorageProviders()

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
            accounts: await ocean.accounts.list()
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
        } catch (error) {
            Logger.error(error.message)
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
        const { assets, totalPages } = await asset.list(state)
        const reducedAssets = assets.reduce((map, obj) => {
            map[obj.id] = obj
            return map
        }, {})
        dispatch({
            type: 'GET_ASSETS',
            assets: reducedAssets,
            totalPages
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
        await asset.purchase(
            assetId,
            getActiveAccount(state),
            state.provider
        )
    }
}

export function updateOauthAccounts(state) {
    storageProviders.azure.updateConnected(state)
}
