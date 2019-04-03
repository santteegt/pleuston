const initialState = {
    networkName: 'unknown',
    accounts: [],
    activeAccount: 0
}

const account = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_ACCOUNTS':
            return {
                ...state,
                accounts: action.accounts
            }
        case 'SET_NETWORKNAME':
            return {
                ...state,
                networkName: action.networkName
            }
        default:
            return state
    }
}

export default account
