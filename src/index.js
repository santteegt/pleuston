import React from 'react'
import ReactDOM from 'react-dom'
import {
    nodeScheme,
    nodeHost,
    nodePort
} from '../config/ocean'

import thunk from 'redux-thunk'

import { Logger } from '@oceanprotocol/squid'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'

import { createBrowserHistory } from 'history'
import {
    ConnectedRouter as Router,
    routerMiddleware
} from 'connected-react-router'

import Web3Provider from 'react-web3-provider'
import Web3Unavailable from './components/Account/Web3Unavailable'

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

// fix injected web3 to specific npm version
if (window.web3) {
    window.web3 = new Web3(window.web3.currentProvider)
}

const history = createBrowserHistory()

const store = createStore(
    appReducer(history),
    composeWithDevTools(
        applyMiddleware(
            routerMiddleware(history),
            thunk
        )
    )
)

const bootstrap = () => {
    store.dispatch(setProviders()).then(() => {
        store.dispatch(getOauthAccounts())
        store.dispatch(setNetworkName())
        store.dispatch(getAccounts())
        store.dispatch(getAssets())
        // TODO: get own orders
    })
}

const detectAccountChange = async () => {
    let accounts = await window.web3.eth.getAccounts()
    let account = accounts[0]
    setInterval(async () => {
        accounts = await window.web3.eth.getAccounts()
        if (accounts.length && accounts[0] !== account) {
            account = accounts[0] // eslint-disable-line
            store.dispatch(getAccounts())
            // TODO: get own orders
        }
    }, 1000)
}

serviceWorker.register()
ReactDOM.render(
    <Provider store={store}>
        <Web3Provider
            defaultProvider={(callback) => {
                const fallbackWeb3 = new Web3(new Web3.providers.HttpProvider(`${nodeScheme}://${nodeHost}:${nodePort}`))
                window.web3 = fallbackWeb3
                bootstrap()
                callback(fallbackWeb3)
            }}
            acceptProvider={async (web3, accept, reject) => {
                window.web3 = web3
                let accounts = await web3.eth.getAccounts()
                if (accounts.length === 0 && window.ethereum) {
                    try {
                        await window.ethereum.enable()
                        accounts = await web3.eth.getAccounts()
                    } catch (e) {
                        Logger.log('ethereum.enable() error:', e)
                        reject()
                    }
                }
                if (accounts.length >= 1) {
                    bootstrap()
                    detectAccountChange()
                    accept()
                } else {
                    reject()
                }
            }}
            error={(err) => {
                Logger.log('Web3 error:', err)
                return <Web3Unavailable />
            }}
        >
            <Router history={history}>
                <App />
            </Router>
        </Web3Provider>
    </Provider>,
    document.getElementById('root')
)
