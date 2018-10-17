import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'

import account from './account'
import asset from './asset'
import provider from './provider'
import order from './order'
import cloudStorage from './cloudStorage'
import oauthAccounts from './oauthaccounts'

const appReducer = combineReducers({
    form: formReducer,
    account,
    asset,
    provider,
    order,
    cloudStorage,
    oauthAccounts
})

export default appReducer
