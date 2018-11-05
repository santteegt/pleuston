import { connect } from 'react-redux'
import { push } from 'connected-react-router'

import AssetSearch from '../components/asset/AssetSearch'
import { getAssets, setAssetSearch, setActiveAsset, setAssetSearchPage } from '../actions'

export default connect(
    state => ({
        initialValues: state.asset.search,
        page: state.asset.search.page,
        assets: Object.values(state.asset.assets)
    }),

    dispatch => ({
        onSubmit: values => {
            dispatch(setAssetSearch(values))
            dispatch(getAssets())
        },
        handleClick: asset => {
            dispatch(setActiveAsset(asset.assetId))
            dispatch(push(`/${asset.assetId}`))
        },
        handleSetPage: page => {
            dispatch(setAssetSearchPage(page))
            dispatch(getAssets())
        }
    })
)(AssetSearch)
