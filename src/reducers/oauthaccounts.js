const initialState = {}

const account = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_OAUTH_ACCOUNTS':
            return Object.assign({}, state, action.oauthAccounts)
        default:
            return state
    }
}

export default account
