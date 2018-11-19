import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Field } from 'redux-form'
import { ReactComponent as SearchIcon } from '../../../svg/search.svg'
import FormHelp from './FormHelp'
import './FormInput.scss'

class FormInput extends PureComponent {
    static propTypes = {
        name: PropTypes.string.isRequired,
        label: PropTypes.string.isRequired,
        required: PropTypes.bool,
        help: PropTypes.string,
        component: PropTypes.string.isRequired,
        type: PropTypes.string,
        placeholder: PropTypes.string,
        additionalComponent: PropTypes.element
    }

    state = { isFocused: false }

    inputWrapClasses() {
        if (this.props.type === 'search') {
            return 'input-wrap input-wrap-search'
        } else if (this.props.type === 'search' && this.state.isFocused) {
            return 'input-wrap input-wrap-search is-focused'
        } else if (this.state.isFocused && this.props.type !== 'search') {
            return 'input-wrap is-focused'
        } else {
            return 'input-wrap'
        }
    }

    render() {
        const { name, label, required, type, help, additionalComponent, ...props } = this.props

        return (
            <div className="form__group">
                <label
                    htmlFor={name}
                    className={required ? 'form__label is-required' : 'form__label'}
                    title={required ? 'Required' : null}
                >
                    {label}
                </label>
                <div className={this.inputWrapClasses()}>
                    <Field
                        className="input"
                        id={name}
                        name={name}
                        required={required}
                        type={type}
                        {...props}
                        onFocus={() => this.setState({ isFocused: true })}
                        onBlur={() => this.setState({ isFocused: false })}
                    />
                    {type === 'search' && <SearchIcon />}
                </div>
                {help && <FormHelp>{help}</FormHelp>}

                {additionalComponent && additionalComponent}
            </div>
        )
    }
}

export default FormInput
