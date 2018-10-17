import React, { Component } from 'react'
import Empty from '../atoms/Empty'

class OauthResult extends Component {
    render() {
        return (
            <Empty title="Authorized" text="You can now see azure blobs in list!" action="+ Add new data set" actionLink="/new" />
        )
    }
}

export default OauthResult
