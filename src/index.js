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

import { Web3Provider } from 'react-web3'
import Web3Unavailable from './components/Account/Web3Unavailable'
import Web3AccountUnavailable from './components/Account/Web3AccountUnavailable'

import appReducer from './reducers'
import {
    getAccounts,
    getAssets,
    setProviders,
    getOrders,
    getCloudFiles,
    getOauthAccounts
} from './actions/index'

import App from './App'
import * as serviceWorker from './serviceWorker'

const history = createBrowserHistory()

const store = createStore(
    connectRouter(history)(appReducer),
    composeWithDevTools(
        applyMiddleware(thunk),
        applyMiddleware(routerMiddleware(history))
    )
)

serviceWorker.register()

window.addEventListener('load', () => {
    Logger.log('booting up pleuston')
    store.dispatch(setProviders())
        .then(() => {
            store.dispatch(getAssets())
            store.dispatch(getOauthAccounts())
            store.dispatch(getAccounts())
                .then(() => {
                    store.dispatch(getOrders())
                    store.dispatch(getCloudFiles())
                })
        })
})

ReactDOM.render(
    <Provider store={store}>
        <Web3Provider
            onChangeAccount={() => store.dispatch(getAccounts())}
            web3UnavailableScreen={() => <Web3Unavailable />}
            accountUnavailableScreen={() => <Web3AccountUnavailable />}
        >
            <Router history={history}>
                <App />
            </Router>
        </Web3Provider>
    </Provider>,
    document.getElementById('root')
)
