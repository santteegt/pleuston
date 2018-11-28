import React from 'react'
import ReactDOM from 'react-dom'

import thunk from 'redux-thunk'

import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import { dispatchSubscribe } from 'redux-dispatch-subscribe'

import { createBrowserHistory } from 'history'
import {
    ConnectedRouter as Router,
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
    // getOrders,
    getOauthAccounts,
    setNetworkName
} from './actions/index'

import App from './App'
import * as serviceWorker from './serviceWorker'

import * as Web3 from 'web3'

// Replace the old injected version by the new local
if (window.web3) {
    window.web3 = new Web3(window.web3.currentProvider)
}

const history = createBrowserHistory()

const store = createStore(
    appReducer(history),
    composeWithDevTools(
        applyMiddleware(
            routerMiddleware(history), // for dispatching history actions
            thunk
        ),
        dispatchSubscribe()
    )
)
store.addDispatchListener(action => {
    if (action.type === 'web3/RECEIVE_ACCOUNT') {
        store.dispatch(setProviders()).then(() => {
            store.dispatch(getOauthAccounts())
            store.dispatch(setNetworkName())
            store.dispatch(getAccounts())
            store.dispatch(getAssets())
            // TODO: get own orders
        })
    }
    if (action.type === 'web3/CHANGE_ACCOUNT') {
        store.dispatch(getAccounts())
        // TODO: get own orders
    }
})

serviceWorker.register()

ReactDOM.render(
    <Provider store={store}>
        <Web3Provider
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
