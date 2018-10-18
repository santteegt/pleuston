import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { OauthSender } from 'react-oauth-flow'
import Button from '../atoms/Button'
import CloudStorageModal from './CloudStorageModal'
import { ReactComponent as IconAzure } from '../../svg/azure.svg'
import { appId, tenantId, redirectHost, scope } from '../../../config/cloudStorage'

import styles from './CloudStorageActions.module.scss'

const authorizeUrl = `https://login.microsoftonline.com/${tenantId}/oauth2/v2.0/authorize`

export default class CloudStorageActions extends PureComponent {
    constructor(props) {
        super(props)

        this.state = {
            isModalOpen: false
        }

        this.toggleModal = this.toggleModal.bind(this)
    }

    toggleModal(e) {
        if (e !== undefined) {
            e.preventDefault()
        }
        this.setState({ isModalOpen: !this.state.isModalOpen })
    }

    render() {
        const { linkSetter } = this.props
        const isConnected = window.localStorage.getItem('oauthAccounts') !== null

        return (
            <>
                <div className={styles.cloudstorage}>
                    {isConnected ? (
                        <Button
                            link="true"
                            icon={IconAzure}
                            onClick={(e) => this.toggleModal(e)}
                        >
                            Azure
                        </Button>
                    ) : (
                        <OauthSender
                            authorizeUrl={authorizeUrl}
                            clientId={appId}
                            redirectUri={`${redirectHost}/oauth/azure`}
                            args={{ response_type: 'token', scope }}
                            render={({ url }) => (
                                <Button href={url} icon={IconAzure}>
                                    Connect to Azure
                                </Button>
                            )}
                        />
                    )}
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

CloudStorageActions.propTypes = {
    linkSetter: PropTypes.func.isRequired
}
