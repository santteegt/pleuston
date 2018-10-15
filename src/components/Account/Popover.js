import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import Blockies from 'react-blockies'
import { OauthSender } from 'react-oauth-flow'
import { appId, tenantId } from '../../../config/cloudStorage'
import styles from './Popover.module.scss'

const authorizeUrl = `https://login.microsoftonline.com/${tenantId}/oauth2/v2.0/authorize`

const Popover = ({ networkName, activeAccount, initMakeItRain }) => {
    return (
        <div className={styles.popover}>
            <div key={'accountName'} className={styles.popoverInfoline}>
                {activeAccount ? (
                    <Fragment>
                        <Blockies
                            size={10}
                            scale={2}
                            className={styles.avatar}
                            seed={activeAccount.name}
                        />
                        <span className={styles.address} title={activeAccount.name}>{activeAccount.name}</span>
                    </Fragment>
                ) : 'No account selected'}
            </div>
            <div key={'network'} className={styles.popoverInfoline}>
                Network: &nbsp;<strong>{networkName}</strong>
            </div>
            <div key={'makeItRain'} className={styles.popoverInfoline}>
                <button className={styles.action} onClick={initMakeItRain}>Make it rain</button>
            </div>
            <div key={'oauth'} className={styles.popoverInfoline}>
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
            </div>
        </div>
    )
}

Popover.propTypes = {
    networkName: PropTypes.string,
    activeAccount: PropTypes.object,
    initMakeItRain: PropTypes.func
}

export default Popover
