import { connect } from 'react-redux'
import CloudStoragePicker from '../components/asset/New/CloudStorage/Picker'
import { change } from 'redux-form'

export default connect(
    state => ({}),
    dispatch => ({
        fileSetter: (newValue) => {
            dispatch(change('newAsset', 'files', newValue))
        }
    })
)(CloudStoragePicker)
