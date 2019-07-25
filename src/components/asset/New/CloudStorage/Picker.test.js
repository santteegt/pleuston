import React from 'react'
import ReactDOM from 'react-dom'

import CloudStoragePicker from './Picker'

it('CloudStoragePicker renders without crashing', () => {
    const div = document.createElement('div')
    ReactDOM.render(
        <CloudStoragePicker
            fileSetter={() => null}
            handleCloseModal={() => null}
            storageProvider={{
                loadFiles: () => {
                    return []
                }
            }}
            blobs={[]}
            error={null}
        />,
        div
    )
    ReactDOM.unmountComponentAtNode(div)
})
