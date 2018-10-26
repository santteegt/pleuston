import React from 'react'
import ReactDOM from 'react-dom'

import CloudStorage from '.'

it('CloudStorage renders without crashing', () => {
    const div = document.createElement('div')
    ReactDOM.render(
        <CloudStorage linkSetter={() => null} />,
        div
    )
    ReactDOM.unmountComponentAtNode(div)
})
