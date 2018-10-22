import { connect } from 'react-redux'
import CloudStorageActions from '../components/asset/CloudStorageActions'

export default connect(state => ({
    oauthAccounts: state.oauthAccounts
}))(CloudStorageActions)
