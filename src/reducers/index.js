import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
import { reducer as formReducer } from 'redux-form'

import account from './account'
import asset from './asset'
import provider from './provider'

const appReducer = history => combineReducers({
    router: connectRouter(history),
    form: formReducer,
    account,
    asset,
    provider
})

export default appReducer
