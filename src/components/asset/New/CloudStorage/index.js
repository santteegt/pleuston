import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { OauthSender } from 'react-oauth-flow'
import Button from '../../../atoms/Button'
import CloudStorageModal from './Modal'
import { ReactComponent as IconAzure } from '../../../../svg/azure.svg'
import { appId, redirectHost, scope } from '../../../../../config/cloudStorage'

import styles from './index.module.scss'

const authorizeUrl = `https://login.microsoftonline.com/common/oauth2/v2.0/authorize`

export default class CloudStorage extends PureComponent {
    static propTypes = {
        oauthAccounts: PropTypes.object.isRequired,
        reloadOauthAccounts: PropTypes.func.isRequired
    }

    state = {
        isModalOpen: false,
        isConnected: false
    }

    componentDidMount() {
        if (typeof window !== 'undefined') {
            this.setState({ isConnected: !!window.localStorage.getItem('oauthAccounts') })

            window.addEventListener('storage', this.localStorageUpdated)
        }
    }

    componentWillUnmount() {
        if (typeof window !== 'undefined') {
            window.removeEventListener('storage', this.localStorageUpdated)
        }
    }

    localStorageUpdated = () => {
        if (!window.localStorage.getItem('oauthAccounts')) {
            this.setState({ isConnected: false })
        } else {
            this.props.reloadOauthAccounts()
        }
    }

    isConnected = () => {
        return this.props.oauthAccounts.azure && this.props.oauthAccounts.azure.expires_on < Date.now()
    }

    toggleModal = () => {
        this.setState({ isModalOpen: !this.state.isModalOpen })
    }

    toggleOauthPopup(url) {
        const windowObjectReference = window.open( // eslint-disable-line
            url,
            'Connect to Azure',
            'resizable,scrollbars,status,width=400,height=500'
        )
        return windowObjectReference
    }

    toggleAzure(e, url) {
        if (e !== undefined) {
            e.preventDefault()
        }
        this.setState({ isConnected: this.isConnected })
        if (this.state.isConnected) {
            this.toggleModal()
        } else {
            this.toggleOauthPopup(url)
        }
    }

    clearOauthAccounts = () => {
        if (typeof window !== 'undefined') {
            window.localStorage.removeItem('oauthAccounts')
        }
        this.setState({ isConnected: false })
    }

    render() {
        return (
            <>
                <div className={styles.cloudstorage}>
                    <OauthSender
                        authorizeUrl={authorizeUrl}
                        clientId={appId}
                        redirectUri={`${redirectHost}/oauth/azure`}
                        args={{ response_type: 'token', scope }}
                        state={{ from: '/new' }}
                        render={({ url }) => (
                            <>
                                <Button
                                    link="true"
                                    icon={IconAzure}
                                    onClick={(e) => this.toggleAzure(e, url)}
                                >
                                Azure
                                </Button>
                                {this.state.isConnected && (
                                    <Button
                                        className={styles.logout}
                                        onClick={this.clearOauthAccounts}
                                    >
                                    logout
                                    </Button>
                                )}
                            </>
                        )}
                    />
                </div>

                <CloudStorageModal
                    isOpen={this.state.isModalOpen}
                    handleCloseModal={this.toggleModal}
                />
            </>
        )
    }
}
