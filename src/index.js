import React from 'react'
import ReactDOM from 'react-dom'
import { Logger } from '@oceanprotocol/squid'

import thunk from 'redux-thunk'

import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'

import { createBrowserHistory } from 'history'
import {
    ConnectedRouter as Router,
    connectRouter,
    routerMiddleware
} from 'connected-react-router'

import appReducer from './reducers'
import {
    getAccounts,
    getAssets,
    setProviders,
    getOrders,
    getCloudFiles
} from './actions/index'

import App from './App'
import registerServiceWorker from './registerServiceWorker'

const history = createBrowserHistory()

const store = createStore(
    connectRouter(history)(appReducer),
    composeWithDevTools(
        applyMiddleware(thunk),
        applyMiddleware(routerMiddleware(history))
    )
)

registerServiceWorker()

function boot() {
    Logger.log('booting up pleuston')
    store.dispatch(setProviders()).then(() => {
        store.dispatch(getAssets())
        store.dispatch(getAccounts()).then(() => {
            store.dispatch(getOrders())
            store.dispatch(getCloudFiles())
        })
    })
}

/* Das */boot()

ReactDOM.render(
    <Provider store={store}>
        <Router history={history}>
            <App />
        </Router>
    </Provider>,
    document.getElementById('root')
)
