import React, { PureComponent } from 'react'
// import PropTypes from 'prop-types'
import FormInputGroup from '../atoms/Form/FormInputGroup'
import FormInput from '../atoms/Form/FormInput'
import Button from '../atoms/Button'

import styles from './AssetNewLinks.module.scss'

export default class AssetNewLinks extends PureComponent {
    static propTypes = {

    }

    state = {
        isFormShown: false,
        links: [
            {
                title: 'Sample of Asset Data',
                type: 'sample',
                url: 'https://foo.com/sample.csv'
            },
            {
                title: 'Another Sample of Asset Data',
                type: 'sample',
                url: 'https://foo.com/fqhuifhwnuigbrwfebwjflnwlk/fbenjwkfbenwjkbfnewjlk/sample.csv'
            }
        ]
    }

    toggleForm = (e) => {
        e.preventDefault()

        this.setState({ isFormShown: !this.state.isFormShown })
    }

    addLink = (e) => {
        e.preventDefault()

        // TODO: return when required fields are empty, and url value is no url
        // Can't use browser validation cause we are in a form within a form
        // if () return

        const { links } = this.state

        this.setState({
            links: [
                ...links,
                {
                    title: 'hello', // e.target.value
                    type: 'hello',
                    url: 'hello'
                }
            ]
        })

        this.setState({ isFormShown: false })
    }

    removeLink = (e) => {
        e.preventDefault()

        // TODO: remove respective link from local state
    }

    render() {
        const { isFormShown, links } = this.state
        console.log(links) // eslint-disable-line

        return (
            <div className={styles.newLinks}>
                {links && (
                    <ul className={styles.linkList}>
                        {links.map((link, index) => (
                            <li key={index}>
                                <a href={link.url}>{link.title}</a>
                                <span className={styles.linkType}>{link.type}</span>
                                <span className={styles.linkUrl}>{link.url}</span>
                                <button className={styles.remove} title="Remove link" onClick={this.removeLink}>&times;</button>
                            </li>
                        ))}
                    </ul>
                )}

                <Button link onClick={this.toggleForm}>
                    {isFormShown ? '- Cancel' : '+ Add a link'}
                </Button>

                {isFormShown && (
                    <fieldset className={styles.linkForm}>
                        <FormInputGroup>
                            <FormInput label="Title" name="linkTitle" required component="input" type="text" placeholder="e.g. My sample" />

                            <FormInput label="Type" required name="linkType" component="select">
                                <option />
                                <option value="sample">Sample</option>
                                <option value="format">Data Format Definition</option>
                            </FormInput>

                            <FormInput label="Url" name="linkUrl" required component="input" type="url" placeholder="e.g. https://url.com/info" />
                        </FormInputGroup>
                        <Button onClick={this.addLink}>Add Link</Button>
                    </fieldset>
                )}

                {/*

                TODO: construct and collect all link objects in local state
                and pass them to actions/asset.js with this

                <input type="hidden" name="links" value={links} />

                */}
            </div>
        )
    }
}
