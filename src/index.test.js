import React from 'react'
import ReactDOM from 'react-dom'

import thunk from 'redux-thunk'

import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'

import { createBrowserHistory } from 'history'
import {
    ConnectedRouter as Router,
    routerMiddleware
} from 'connected-react-router'

import appReducer from './reducers'

import Web3Provider from 'react-web3-provider'
import { Logger } from '@oceanprotocol/squid'

import App from './App'
import * as serviceWorker from './serviceWorker'
import Web3Unavailable from './components/Account/Web3Unavailable'

const history = createBrowserHistory()

const store = createStore(
    appReducer(history),
    composeWithDevTools(
        applyMiddleware(
            routerMiddleware(history), // for dispatching history actions
            thunk
        )
    )
)

serviceWorker.register()

it('index renders without crashing', () => {
    const div = document.createElement('div')
    ReactDOM.render(
        <Provider store={store}>
            <Web3Provider
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
        div
    )
    ReactDOM.unmountComponentAtNode(div)
})
