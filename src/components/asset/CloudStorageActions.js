import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { OauthSender } from 'react-oauth-flow'
import Button from '../atoms/Button'
import CloudStorageModal from './CloudStorageModal'
import { ReactComponent as IconAzure } from '../../svg/azure.svg'
import { appId, redirectHost, scope } from '../../../config/cloudStorage'

import styles from './CloudStorageActions.module.scss'

const authorizeUrl = `https://login.microsoftonline.com/common/oauth2/v2.0/authorize`

export default class CloudStorageActions extends PureComponent {
    static propTypes = {
        linkSetter: PropTypes.func.isRequired
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
        } else if (!this.state.isConnected) {
            this.setState({ isConnected: true })
        }
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

        //
        // TODO: use Redux' global state to check if user is connected here
        // Won't work right now, cause popup and OAuthResult need to dispatch more
        // https://stackoverflow.com/questions/43514537/maintain-redux-state-from-popup-to-main-window
        //
        // const isConnected = this.props.oauthAccounts.azure && this.props.oauthAccounts.azure.expires_on < Date.now()

        if (this.state.isConnected) {
            this.toggleModal()
        } else {
            this.toggleOauthPopup(url)
        }
    }

    render() {
        const { linkSetter } = this.props

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
                            <Button
                                link="true"
                                icon={IconAzure}
                                onClick={(e) => this.toggleAzure(e, url)}
                            >
                                Azure
                            </Button>
                            // TODO: add some feedback for connected state
                            // TODO: add signout/disconnect action
                        )}
                    />
                </div>

                <CloudStorageModal
                    isOpen={this.state.isModalOpen}
                    handleCloseModal={this.toggleModal}
                    linkSetter={linkSetter}
                />
            </>
        )
    }
}
