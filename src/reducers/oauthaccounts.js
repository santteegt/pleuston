import { Logger } from '@oceanprotocol/squid'

const initialState = {
}

const account = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_OAUTH_ACCOUNTS':
            Logger.log('oauthAccounts', action.oauthAccounts)
            return Object.assign({}, state, action.oauthAccounts)
        default:
            return state
    }
}

export default account
