import React from 'react'
import ReactDOM from 'react-dom'
import Balance from './Balance'

it('Balance renders without crashing', () => {
    const div = document.createElement('div')
    ReactDOM.render(<Balance eth="10000" ocn="10000" />, div)
    ReactDOM.unmountComponentAtNode(div)
})
