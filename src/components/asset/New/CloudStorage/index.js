import React, { PureComponent } from 'react'
// import PropTypes from 'prop-types'
import { OauthSender } from 'react-oauth-flow'
import Button from '../../../atoms/Button'
import CloudStorageModal from './Modal'
import { ReactComponent as IconAzure } from '../../../../svg/azure.svg'
import { azure } from '../../../../../config/cloudStorage'
import StorageProviders from '../../../../lib/storage-providers'

import styles from './index.module.scss'

const authorizeUrl = `https://login.microsoftonline.com/common/oauth2/v2.0/authorize`

const storageProviders = new StorageProviders()

export default class CloudStorage extends PureComponent {
    state = {
        storageProvider: null,
        isConnectedAzure: false,
        isConnectedAws: false
    }

    componentDidMount() {
        if (typeof window !== 'undefined') {
            window.addEventListener('storage', this.localStorageUpdated)
        }
        this.localStorageUpdated()
    }

    componentWillUnmount() {
        if (typeof window !== 'undefined') {
            window.removeEventListener('storage', this.localStorageUpdated)
        }
    }

    localStorageUpdated = () => {
        this.setState({
            isConnectedAzure: storageProviders.azure.isConnected(),
            isConnectedAws: storageProviders.aws.isConnected()
        })
    }

    closeModal = () => {
        this.setState({ storageProvider: null })
    }

    toggleAzure(e, url) {
        if (e !== undefined) {
            e.preventDefault()
        }
        if (storageProviders.azure.isConnected()) {
            this.setState({ storageProvider: storageProviders.azure })
        } else {
            storageProviders.azure.connect(url)
        }
    }

    disconnectAzure(e) {
        if (e !== undefined) {
            e.preventDefault()
        }
        storageProviders.azure.disconnect()
        this.localStorageUpdated()
    }

    toggleAws(e) {
        if (e !== undefined) {
            e.preventDefault()
        }
        if (storageProviders.aws.isConnected()) {
            this.setState({ storageProvider: storageProviders.aws })
        } else {
            storageProviders.aws.connect()
        }
    }

    disconnectAws(e) {
        if (e !== undefined) {
            e.preventDefault()
        }
        storageProviders.aws.disconnect()
        this.localStorageUpdated()
    }

    render() {
        const { scope } = azure
        return (
            <>
                <div className={styles.cloudstorage}>
                    <OauthSender
                        authorizeUrl={authorizeUrl}
                        clientId={azure.appId}
                        redirectUri={`${azure.redirectHost}/oauth/azure`}
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
                                {this.state.isConnectedAzure && (
                                    <Button
                                        className={styles.logout}
                                        onClick={(e) => this.disconnectAzure(e)}
                                    >
                                    logout
                                    </Button>
                                )}
                            </>
                        )}
                    />

                    <Button
                        link="true"
                        icon={IconAzure}
                        onClick={(e) => this.toggleAws(e)}
                    >
                    Amazon
                    </Button>
                    {this.state.isConnectedAws && (
                        <Button
                            className={styles.logout}
                            onClick={(e) => this.disconnectAws(e)}
                        >
                        logout
                        </Button>
                    )}

                </div>

                <CloudStorageModal
                    handleCloseModal={this.closeModal}
                    isOpen={(this.state.storageProvider !== null)}
                    storageProvider={this.state.storageProvider}
                />
            </>
        )
    }
}
