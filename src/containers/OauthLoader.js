import { connect } from 'react-redux'

import Oauth from '../pages/Oauth'
import { updateOauthAccounts } from '../actions/index'

export default connect(state => ({
    ...updateOauthAccounts(state)
}))(Oauth)
