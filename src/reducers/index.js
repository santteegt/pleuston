import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
import { reducer as formReducer } from 'redux-form'

import account from './account'
import asset from './asset'
import provider from './provider'
import order from './order'
import cloudStorage from './cloudStorage'
import oauthAccounts from './oauthaccounts'

const appReducer = history => combineReducers({
    router: connectRouter(history),
    form: formReducer,
    account,
    asset,
    provider,
    order,
    cloudStorage,
    oauthAccounts
})

export default appReducer
