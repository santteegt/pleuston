import React, { Component } from 'react'
import { Authenticator } from 'aws-amplify-react'
import { Logger } from '@oceanprotocol/squid'

import Amplify from 'aws-amplify'
import { aws } from '../../config/cloudStorage'

Amplify.configure(aws)

export default class AwsAuthenication extends Component {
    handleStateChange = state => {
        if (state === 'signedIn') {
            // this.props.onUserSignIn()
            // save to storage that I'm logged
            Logger.log('state', state)
        }
    }
    render() {
        return (
            <div>
                <Authenticator onStateChange={this.handleStateChange} />
            </div>
        )
    }
}
