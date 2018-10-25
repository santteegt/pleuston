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
        isLinkShown: false,
        links: []
    }

    toggleLink = (e) => {
        e.preventDefault()

        this.setState({ isLinkShown: !this.state.isLinkShown })
    }

    render() {
        const { isLinkShown } = this.state

        return (
            <div className={styles.newLinks}>
                <Button link onClick={this.toggleLink}>
                    {isLinkShown ? '- Remove link' : '+ Add a link'}
                </Button>

                {isLinkShown && (
                    <div className={styles.link}>
                        <FormInputGroup>
                            <FormInput label="Title" name="linkTitle" required component="input" type="text" placeholder="e.g. My sample" />

                            <FormInput label="Type" required name="linkType" component="select">
                                <option />
                                <option value="sample">Sample</option>
                                <option value="format">Data Format Definition</option>
                            </FormInput>

                            <FormInput label="Url" name="linkUrl" required component="input" type="url" placeholder="e.g. https://url.com/info" />
                        </FormInputGroup>
                    </div>
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
