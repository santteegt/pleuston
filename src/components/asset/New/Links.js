import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import {
    CSSTransition,
    TransitionGroup
} from 'react-transition-group'
import FormInputGroup from '../../atoms/Form/FormInputGroup'
import FormInput from '../../atoms/Form/FormInput'
import Button from '../../atoms/Button'

import styles from './Links.module.scss'

const Link = ({ link, removeLink }) => (
    <li>
        <a href={link.url}>{link.title}</a>
        <span className={styles.linkType}>{link.type}</span>
        <span className={styles.linkUrl}>{link.url}</span>
        <button className={styles.remove} title="Remove link" onClick={removeLink}>&times;</button>
    </li>
)

Link.propTypes = {
    link: PropTypes.object.isRequired,
    removeLink: PropTypes.func.isRequired
}

const LinkForm = ({ addLink }) => (
    <fieldset className={styles.linkForm}>
        <FormInputGroup>
            <FormInput label="Title" name="linkTitle" required component="input" type="text" placeholder="e.g. My sample" onChange={this.handleChange} />

            <FormInput label="Type" required name="linkType" component="select" onChange={this.handleChange} >
                <option />
                <option value="sample">Sample</option>
                <option value="format">Data Format Definition</option>
            </FormInput>

            <FormInput label="Url" name="linkUrl" required component="input" type="url" placeholder="e.g. https://url.com/info" onChange={this.handleChange} />
        </FormInputGroup>
        <Button onClick={addLink}>Add Link</Button>
    </fieldset>
)

LinkForm.propTypes = {
    addLink: PropTypes.func.isRequired
}

export default class Links extends PureComponent {
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
                    title: e.target.linkTitle.value,
                    type: e.target.linkType.value,
                    url: e.target.linkUrl.value
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
                    <TransitionGroup component="ul" className={styles.linkList}>
                        {links.map((link, index) => (
                            <CSSTransition
                                key={index}
                                timeout={400}
                                classNames="fade"
                            >
                                <Link link={link} removeLink={this.removeLink} />
                            </CSSTransition>
                        ))}
                    </TransitionGroup>
                )}

                <Button link onClick={this.toggleForm}>
                    {isFormShown ? '- Cancel' : '+ Add a link'}
                </Button>

                <CSSTransition
                    classNames="grow"
                    in={isFormShown}
                    timeout={200}
                    unmountOnExit
                    onExit={() => this.setState({ isFormShown: false })}
                >
                    <LinkForm addLink={this.addLink} />
                </CSSTransition>

                <input type="hidden" name="links" value={links} />
            </div>
        )
    }
}
