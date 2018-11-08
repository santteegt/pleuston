import React from 'react'
import ReactDOM from 'react-dom'

import CloudStorageActions from './CloudStorageActions'

it('CloudStorageActions renders without crashing', () => {
    const div = document.createElement('div')
    ReactDOM.render(
        <CloudStorageActions
            reloadOauthAccounts={() => null}
            oauthAccounts={{}}
        />,
        div
    )
    ReactDOM.unmountComponentAtNode(div)
})
