import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { reduxForm } from 'redux-form'
import { OauthSender } from 'react-oauth-flow'
import Button from '../atoms/Button'
import FormInput from '../atoms/Form/FormInput'
import FormHelp from '../atoms/Form/FormHelp'
import AssetNewModal from './AssetNewModal'
import { ReactComponent as IconAzure } from '../../svg/azure.svg'
import { appId, tenantId, redirectHost } from '../../../config/cloudStorage'

import styles from './AssetNew.module.scss'

const authorizeUrl = `https://login.microsoftonline.com/${tenantId}/oauth2/v2.0/authorize`

const CloudStorage = ({ toggleModal }) => {
    const isConnected = window.localStorage.getItem('oauthAccounts') !== null

    return (
        <div className={styles.cloudstorage}>
            {isConnected ? (
                <Button
                    link="true"
                    icon={IconAzure}
                    onClick={(e) => toggleModal(e)}
                >
                    Azure
                </Button>
            ) : (
                <OauthSender
                    authorizeUrl={authorizeUrl}
                    clientId={appId}
                    redirectUri={`${redirectHost}/oauth/azure`}
                    args={{
                        response_type: 'token',
                        scope: 'https://storage.azure.com/user_impersonation'
                    }}
                    render={({ url }) => (
                        <Button
                            href={url}
                            icon={IconAzure}
                        >
                            Connect to Azure
                        </Button>
                    )}
                />
            )}
        </div>
    )
}

CloudStorage.propTypes = {
    toggleModal: PropTypes.func.isRequired
}

class AssetNew extends Component {
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
        const {
            handleSubmit,
            linkSetter
        } = this.props

        return (
            <Fragment>
                <form className="form" onSubmit={handleSubmit}>
                    <div className="form__group">
                        <FormInput label="Title" name="name" required component="input" type="text" placeholder="" />
                        <FormHelp>The title of your asset.</FormHelp>
                    </div>
                    <div className="form__group">
                        <FormInput label="Description" name="description" required component="textarea" rows="5" placeholder="" />
                        <FormHelp>Describe your asset, explaining what the data represents and what it can be used for.</FormHelp>
                    </div>
                    <div className="form__group">
                        <FormInput label="Url" name="contentUrls" required component="input" type="url" placeholder="e.g. https://url.com/dataset.zip" />

                        <FormHelp>Add a URL pointing to your data set asset or select it from cloud storage providers.</FormHelp>

                        <CloudStorage toggleModal={this.toggleModal} />
                    </div>
                    <div className="form__group">
                        <FormInput label="Price" name="price" required type="number" component="input" placeholder="0" />
                        <FormHelp>Price of your asset in Ocean Tokens.</FormHelp>
                    </div>

                    <div className="form__group">
                        <FormInput label="Author" name="author" required component="input" type="text" placeholder="e.g. Tfl, Disney Corp." />
                        <FormHelp>The name of the entity generating this data.</FormHelp>
                    </div>
                    <div className="form__group">
                        <FormInput label="Type" required name="type" component="select">
                            <option />
                            <option value="dataset">Data set</option>
                            <option value="algorithm">Algorithm</option>
                            <option value="container">Container</option>
                            <option value="workflow">Workflow</option>
                            <option value="other">Other</option>
                        </FormInput>
                        <FormHelp>The type of your asset.</FormHelp>
                    </div>
                    <div className="form__group">
                        <FormInput label="License" required name="license" component="select">
                            <option value="none">No License Specified</option>
                            <option value="Public Domain">Public Domain</option>
                            <option value="CC BY">CC BY: Attribution</option>
                            <option value="CC BY-SA">CC BY-SA: Attribution ShareAlike</option>
                            <option value="CC BY-ND">CC BY-ND: Attribution-NoDerivs</option>
                            <option value="CC BY-NC">CC BY-NC: Attribution-NonCommercial</option>
                            <option value="CC BY-NC-SA">CC BY-NC-SA: Attribution-NonCommercial-ShareAlike</option>
                            <option value="CC BY-NC-ND">CC BY-NC-ND: Attribution-NonCommercial-NoDerivs</option>
                        </FormInput>
                    </div>
                    <div className="form__group">
                        <FormInput label="Copyright holder" name="copyrightHolder" component="input" type="text" placeholder="" />
                        <FormHelp>The party holding the legal copyright.</FormHelp>
                    </div>

                    <div className="form__group">
                        <FormInput label="Tags" name="tags" component="input" placeholder="e.g. climate, ocean, atmosphere, temperature, earth-science, public" />
                        <FormHelp>Categorize your asset by one or more tags, separated by comma.</FormHelp>
                    </div>
                    <div className="form__group">
                        <FormInput label="Update Frequency" name="updateFrequency" component="select">
                            <option />
                            <option value="seldom">Seldom</option>
                            <option value="annually">Annually</option>
                            <option value="quarterly">Quarterly</option>
                            <option value="never">Never expected to get updated</option>
                        </FormInput>
                        <FormHelp>How often are updates expected, or is the resource static?</FormHelp>
                    </div>
                    <div className="form__group">
                        <Button primary="true" type="submit">Publish</Button>
                    </div>
                </form>

                <AssetNewModal
                    isOpen={this.state.isModalOpen}
                    handleCloseModal={this.toggleModal}
                    linkSetter={linkSetter}
                />
            </Fragment>
        )
    }
}

AssetNew.propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    linkSetter: PropTypes.func.isRequired
}

const AssetNewForm = reduxForm({
    form: 'newAsset',
    fields: ['name']
})(AssetNew)

export default AssetNewForm
