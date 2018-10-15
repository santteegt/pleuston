import { connect } from 'react-redux'
import Account from '../components/Account/Account'
import {
    getActiveAccount,
    getNetworkName,
    makeItRain
} from '../actions/index'

export default connect(
    state => ({
        networkName: getNetworkName(state),
        activeAccount: getActiveAccount(state)
    }),

    dispatch => ({
        initMakeItRain: () => {
            dispatch(makeItRain(10))
        }
    })
)(Account)
