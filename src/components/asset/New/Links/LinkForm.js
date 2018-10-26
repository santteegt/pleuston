import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import FormInputGroup from '../../../atoms/Form/FormInputGroup'
import FormInput from '../../../atoms/Form/FormInput'
import Button from '../../../atoms/Button'
import styles from './LinkForm.module.scss'

export default class LinkForm extends PureComponent {
    static propTypes = {
        addLink: PropTypes.func.isRequired
    }

    state = {
        title: null,
        type: null,
        url: null
    }

    onChangeTitle = (e) => {
        this.setState({ title: e.target.value })
    }

    onChangeType = (e) => {
        this.setState({ type: e.target.value })
    }

    onChangeUrl = (e) => {
        this.setState({ url: e.target.value })
    }

    componentWillUnmount() {
        this.setState({ title: null, type: null, url: null })
    }

    render() {
        const { title, type, url } = this.state
        const { addLink } = this.props

        return (
            <fieldset className={styles.linkForm}>
                <FormInputGroup>
                    <FormInput
                        label="Title"
                        name="linkTitle"
                        required
                        component="input"
                        type="text"
                        placeholder="e.g. My sample"
                        value={title}
                        onChange={this.onChangeTitle}
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
                <Button onClick={(e) => addLink(e, title, type, url)}>Add Link</Button>
            </fieldset>
        )
    }
}
