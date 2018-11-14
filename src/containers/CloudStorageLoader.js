import { connect } from 'react-redux'
import CloudStorage from '../components/asset/New/CloudStorage'
import { getOauthAccounts } from '../actions'

export default connect(
    state => ({
        oauthAccounts: state.oauthAccounts
    }),
    dispatch => ({
        reloadOauthAccounts: () => {
            dispatch(getOauthAccounts())
        }
    })
)(CloudStorage)
