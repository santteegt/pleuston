import React, { PureComponent } from 'react'
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import { Field } from 'redux-form'
import Button from '../../../atoms/Button'
import LinkForm from './LinkForm'
import Link from './Link'
import styles from './index.module.scss'

export default class Links extends PureComponent {
    state = {
        isFormShown: false,
        links: [
            {
                name: 'Sample of Asset Data',
                type: 'sample',
                url: 'https://foo.com/sample.csv'
            },
            {
                name: 'Another Sample of Asset Data',
                type: 'sample',
                url: 'https://foo.com/fqhuifhwnuigbrwfebwjflnwlk/fbenjwkfbenwjkbfnewjlk/sample.csv'
            }
        ]
    }

    toggleForm = (e) => {
        e.preventDefault()

        this.setState({ isFormShown: !this.state.isFormShown })
    }

    addLink = (name, type, url) => {
        const { links } = this.state

        this.setState({
            links: [
                ...links,
                {
                    name,
                    type,
                    url
                }
            ],
            isFormShown: false
        })
    }

    removeLink = (e) => {
        e.preventDefault()

        // TODO: remove respective link from local state
    }

    render() {
        const { isFormShown, links } = this.state

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

                {/* Used to capture and pass the links array data on form submit */}
                <Field
                    component="input"
                    type="hidden"
                    id="links"
                    name="links"
                    value={JSON.stringify(links)}
                />
            </div>
        )
    }
}
