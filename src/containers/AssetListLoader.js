import { connect } from 'react-redux'
import { push } from 'connected-react-router'

import AssetList from '../components/asset/AssetList'
import { setActiveAsset } from '../actions'

export default connect(
    state => ({
        assets: Object.values(state.asset.assets)
    }),

    dispatch => ({
        handleClick: asset => {
            dispatch(setActiveAsset(asset.assetId))
            dispatch(push(`/${asset.assetId}`))
        }
    })
)(AssetList)
