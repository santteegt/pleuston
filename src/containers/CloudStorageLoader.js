import { connect } from 'react-redux'
import CloudStoragePicker from '../components/asset/CloudStoragePicker'

export default connect(state => ({
    blobs: Object.values(state.cloudStorage.blobs).map((fileObject, index) => ({
        id: index,
        container: fileObject.container,
        blobName: fileObject.blobName,
        value: false
    })),
    error: state.cloudStorage.error
}))(CloudStoragePicker)
