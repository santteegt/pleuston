import { connect } from 'react-redux'
import CloudStoragePicker from '../components/asset/New/CloudStorage/Picker'

export default connect(state => ({
    blobs: Object.values(state.cloudStorage.blobs).map((fileObject, index) => ({
        id: index,
        container: fileObject.container,
        blobName: fileObject.blobName,
        value: false
    })),
    error: state.cloudStorage.error
}))(CloudStoragePicker)
