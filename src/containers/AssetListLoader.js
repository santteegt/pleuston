import { connect } from 'react-redux'
import { push } from 'connected-react-router'

import AssetList from '../components/asset/AssetList'
import { setActiveAsset, updateAssetsQuery, getAssets } from '../actions'

export default connect(
    state => ({
        assets: Object.values(state.asset.assets),
        query: state.asset.query
    }),

    dispatch => ({
        handleSearch: query => {
            dispatch(updateAssetsQuery(query))
            dispatch(getAssets())
        },
        handleClick: asset => {
            dispatch(setActiveAsset(asset.assetId))
            dispatch(push(`/${asset.assetId}`))
        }
    })
)(AssetList)
