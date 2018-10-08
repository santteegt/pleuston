import React, { Component } from 'react'
import { OauthSender } from 'react-oauth-flow'
import { appId, tenantId } from '../../../config/cloudStorage'

const authorizeUrl = `https://login.microsoftonline.com/${tenantId}/oauth2/authorize`

export default class Oauth extends Component {
    render() {
        return (
            <OauthSender
                authorizeUrl={authorizeUrl}
                clientId={appId} // {process.env.CLIENT_ID}
                redirectUri="http://localhost:3000/oauth/azure"
                state={{ from: '/oauth/azure' }}
                render={({ url }) => <a href={url}>Oauth to Azure</a>}
            />
        )
    }
}
