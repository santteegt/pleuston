import { connect } from 'react-redux'
import CloudStoragePicker from '../components/asset/New/CloudStorage/Picker'
import { change } from 'redux-form'

export default connect(
    state => ({}),
    dispatch => ({
        linkSetter: (newValue) => {
            dispatch(change('newAsset', 'contentUrls', newValue))
        }
    })
)(CloudStoragePicker)
