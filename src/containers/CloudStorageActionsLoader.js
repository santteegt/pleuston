import { connect } from 'react-redux'
import CloudStorageActions from '../components/asset/CloudStorageActions'
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
)(CloudStorageActions)
