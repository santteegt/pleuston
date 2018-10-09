import React, { Component } from 'react'
import { OauthSender } from 'react-oauth-flow'
import { appId, tenantId } from '../../../config/cloudStorage'

const authorizeUrl = `https://login.microsoftonline.com/${tenantId}/oauth2/v2.0/authorize`

export default class Oauth extends Component {
    render() {
        return (
            <OauthSender
                authorizeUrl={authorizeUrl}
                clientId={appId}
                redirectUri="http://localhost:3000/oauth/azure"
                args={{
                    response_type: 'token',
                    scope: 'https://storage.azure.com/user_impersonation'
                }}
                render={({ url }) => <a href={url}>Oauth to Azure</a>}
            />
        )
    }
}
