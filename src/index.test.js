import React from 'react'
import ReactDOM from 'react-dom'

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
import Web3Unavailable from './components/metamask/Unavailable'
import Web3AccountUnavailable from './components/metamask/AccountUnavailable'

import appReducer from './reducers'

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
