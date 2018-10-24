import React from 'react'
import ReactDOM from 'react-dom'

import CloudStorageActions from './CloudStorageActions'

it('CloudStorageActions renders without crashing', () => {
    const div = document.createElement('div')
    ReactDOM.render(
        <CloudStorageActions linkSetter={() => null} />,
        div
    )
    ReactDOM.unmountComponentAtNode(div)
})
