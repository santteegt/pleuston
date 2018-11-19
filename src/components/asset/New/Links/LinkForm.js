import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import isUrl from 'is-url'
import FormInputGroup from '../../../atoms/Form/FormInputGroup'
import FormInput from '../../../atoms/Form/FormInput'
import Button from '../../../atoms/Button'
import styles from './LinkForm.module.scss'

export default class LinkForm extends PureComponent {
    static propTypes = {
        addLink: PropTypes.func.isRequired
    }

    state = {
        name: null,
        type: null,
        url: null,
        hasError: null,
        noUrl: null
    }

    handleSubmit = (e) => {
        e.preventDefault()

        const { name, type, url } = this.state

        // return when required fields are empty, and url value is no url
        // Can't use browser validation cause we are in a form within a form
        if (!name || !type || !url) {
            this.setState({ hasError: true })
            return
        }

        if (url && !isUrl(url)) {
            this.setState({ noUrl: true })
            return
        }

        this.props.addLink(name, type, url)
    }

    onChangeName = (e) => {
        this.setState({ name: e.target.value })
        this.clearErrors()
    }

    onChangeType = (e) => {
        this.setState({ type: e.target.value })
        this.clearErrors()
    }

    onChangeUrl = (e) => {
        this.setState({ url: e.target.value })
        this.clearErrors()
    }

    clearErrors() {
        if (this.state.hasError) this.setState({ hasError: null })
        if (this.state.noUrl) this.setState({ noUrl: null })
    }

    render() {
        const { name, type, url, hasError, noUrl } = this.state

        return (
            <fieldset className={styles.linkForm}>
                <FormInputGroup>
                    <FormInput
                        label="Name"
                        name="linkName"
                        required
                        component="input"
                        type="text"
                        placeholder="e.g. My sample"
                        value={name}
                        onChange={this.onChangeName}
                    />

                    <FormInput
                        label="Type"
                        required
                        name="linkType"
                        component="select"
                        value={type}
                        onChange={this.onChangeType}
                    >
                        <option />
                        <option value="sample">Sample</option>
                        <option value="format">Data Format Definition</option>
                    </FormInput>

                    <FormInput
                        label="Url"
                        name="linkUrl"
                        required
                        component="input"
                        type="url"
                        placeholder="e.g. https://url.com/info"
                        value={url}
                        onChange={this.onChangeUrl}
                    />
                </FormInputGroup>

                <Button onClick={(e) => this.handleSubmit(e)}>Add Link</Button>

                {hasError && <span className={styles.error}>Please fill in all required fields.</span>}
                {noUrl && <span className={styles.error}>Please enter a valid URL.</span>}
            </fieldset>
        )
    }
}
