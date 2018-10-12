import { connect } from 'react-redux'

import Oauth from '../pages/oauth'
import { updateOauthAccounts } from '../actions/index'

export default connect(state => ({
    ...updateOauthAccounts(state)
}))(Oauth)
