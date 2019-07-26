import React from 'react'
import ReactDOM from 'react-dom'
import Popover from './Popover'

it('Popover renders without crashing', () => {
    const div = document.createElement('div')
    ReactDOM.render(
        <Popover
            networkName="Hello"
            activeAccount={{ getId: () => '0x00000000' }}
        />,
        div
    )
    ReactDOM.unmountComponentAtNode(div)
})

it('Popover renders without account', () => {
    const div = document.createElement('div')
    ReactDOM.render(<Popover networkName="Hello" />, div)
    ReactDOM.unmountComponentAtNode(div)
})
