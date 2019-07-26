import React from 'react'
import ReactDOM from 'react-dom'
import Web3AccountUnavailable from './Web3AccountUnavailable'

it('Web3AccountUnavailable renders without crashing', () => {
    const div = document.createElement('div')
    ReactDOM.render(<Web3AccountUnavailable />, div)
    ReactDOM.unmountComponentAtNode(div)
})
