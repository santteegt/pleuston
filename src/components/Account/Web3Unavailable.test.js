import React from 'react'
import ReactDOM from 'react-dom'
import Web3Unavailable from './Web3Unavailable'

it('Web3Unavailable renders without crashing', () => {
    const div = document.createElement('div')
    ReactDOM.render(<Web3Unavailable />, div)
    ReactDOM.unmountComponentAtNode(div)
})
