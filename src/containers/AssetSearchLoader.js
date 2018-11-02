import { connect } from 'react-redux'

import AssetSearch from '../components/asset/AssetSearch'
import { getAssets, setAssetSearch } from '../actions'

export default connect(
    state => ({
        initialValues: state.asset.search,
        page: state.asset.search.page
    }),

    dispatch => ({
        onSubmit: values => {
            dispatch(setAssetSearch(values))
            dispatch(getAssets())
        }
    })
)(AssetSearch)
