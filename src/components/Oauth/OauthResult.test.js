import React from 'react'
import ReactDOM from 'react-dom'
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import {
    ConnectedRouter as Router,
    routerMiddleware
} from 'connected-react-router'
import { createBrowserHistory } from 'history'
import appReducer from '../../reducers'

import OauthResult from './OauthResult'

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

it('OauthResult renders without crashing', () => {
    const div = document.createElement('div')
    ReactDOM.render(
        <Provider store={store}>
            <Router history={history}>
                <OauthResult />
            </Router>
        </Provider>,
        div
    )
    ReactDOM.unmountComponentAtNode(div)
})
