import { connect } from 'react-redux'
import Account from '../components/Account/Account'
import { getActiveAccount, getNetworkName, airdropTokens } from '../actions/index'

export default connect(state => ({
    networkName: getNetworkName(state),
    activeAccount: getActiveAccount(state),
    airdropTokens: airdropTokens,
    provider: state.provider
}))(Account)
