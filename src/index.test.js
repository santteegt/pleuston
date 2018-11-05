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

import { Web3Provider } from 'react-web3'

import App from './App'
import * as serviceWorker from './serviceWorker'
import Web3Unavailable from './components/Account/Web3Unavailable'
import Web3AccountUnavailable from './components/Account/Web3AccountUnavailable'

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
        <Web3Provider
            web3UnavailableScreen={() => <Web3Unavailable />}
            accountUnavailableScreen={() => <Web3AccountUnavailable />}
            // onChangeAccount={null}
        >
            <Provider store={store}>
                <Router history={history}>
                    <App />
                </Router>
            </Provider>
        </Web3Provider>,
        div
    )
    ReactDOM.unmountComponentAtNode(div)
})
