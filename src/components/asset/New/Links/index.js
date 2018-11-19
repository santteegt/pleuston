import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import Button from '../../../atoms/Button'
import LinkForm from './LinkForm'
import Link from './Link'
import styles from './index.module.scss'

export default class Links extends PureComponent {
    static propTypes = {
        fields: PropTypes.object.isRequired,
        resetLinksForm: PropTypes.func.isRequired
    }

    state = {
        isFormShown: false
    }

    toggleForm = (e) => {
        e.preventDefault()

        this.setState({ isFormShown: !this.state.isFormShown })
    }

    addLink = (name, type, url) => {
        this.props.fields.push({ name: name, type: type, url: url })
        this.props.resetLinksForm()
        this.setState({ isFormShown: !this.state.isFormShown })
    }

    removeLink = (index) => {
        this.props.fields.remove(index)
    }

    render() {
        const { isFormShown } = this.state
        return (
            <div className={styles.newLinks}>
                {this.props.fields && (
                    <TransitionGroup component="ul" className={styles.linkList}>
                        {this.props.fields.map((link, index) => (
                            <CSSTransition
                                key={index}
                                timeout={400}
                                classNames="fade"
                            >
                                <Link link={this.props.fields.get(index)} removeLink={() => this.removeLink(index)} />
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

            </div>
        )
    }
}
