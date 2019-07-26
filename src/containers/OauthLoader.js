import { connect } from 'react-redux'

import OauthResult from '../components/Auth/OauthResult'
import { updateOauthAccounts } from '../actions/index'

export default connect(state => ({
    ...updateOauthAccounts(state)
}))(OauthResult)
