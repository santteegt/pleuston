import { connect } from 'react-redux'
import { push } from 'connected-react-router'

import AssetSearch from '../components/Asset/AssetSearch'
import { getAssets, setActiveAsset, setAssetSearchPage } from '../actions'

export default connect(
    state => ({
        initialValues: state.asset.search,
        page: state.asset.search.page,
        totalPages: state.asset.totalPages,
        assets: Object.values(state.asset.assets)
    }),

    dispatch => ({
        onSubmit: values => {
            dispatch(setAssetSearchPage(1))
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
