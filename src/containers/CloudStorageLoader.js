import { connect } from 'react-redux'
import CloudStorage from '../components/asset/New/CloudStorage'

export default connect(state => ({
    oauthAccounts: state.oauthAccounts
}))(CloudStorage)
