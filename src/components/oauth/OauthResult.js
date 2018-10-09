import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router'
// import { OauthReceiver } from 'react-oauth-flow'
// import { appId, appAuthKey } from '../../../config/cloudStorage'

class OauthResult extends Component {
    render() {
        const { location } = this.props
        return (
            <div>{JSON.stringify(location)}</div>
        )
    }
}

OauthResult.propTypes = {
    location: PropTypes.object
}

export default withRouter(OauthResult)
