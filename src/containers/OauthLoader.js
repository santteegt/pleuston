import { connect } from 'react-redux'

import OauthResult from '../components/Oauth/OauthResult'
import { updateOauthAccounts } from '../actions/index'

export default connect(state => ({
    ...updateOauthAccounts(state)
}))(OauthResult)
