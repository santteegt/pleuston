import { connect } from 'react-redux'
import { push } from 'connected-react-router'

import AssetSearch from '../components/asset/AssetSearch'
import { getAssets, setActiveAsset, setAssetSearchPage } from '../actions'

export default connect(
    state => ({
        initialValues: state.asset.search,
        page: state.asset.search.page,
        assets: Object.values(state.asset.assets)
    }),

    dispatch => ({
        onSubmit: values => {
            dispatch(setAssetSearchPage(0))
            dispatch(getAssets())
        },
        handleClick: asset => {
            dispatch(setActiveAsset(asset.id))
            dispatch(push(`/${asset.id}`))
        },
        handleSetPage: page => {
            dispatch(setAssetSearchPage(page))
            dispatch(getAssets())
        }
    })
)(AssetSearch)
