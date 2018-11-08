import React from 'react'
import ReactDOM from 'react-dom'

import CloudStoragePicker from './CloudStoragePicker'

it('CloudStoragePicker renders without crashing', () => {
    const div = document.createElement('div')
    ReactDOM.render(
        <CloudStoragePicker
            linkSetter={() => null}
            handleCloseModal={() => null}
            blobs={[]}
            error={null}
            loadCloudFiles={() => null}
            resetCloudFiles={() => null}
        />,
        div
    )
    ReactDOM.unmountComponentAtNode(div)
})
