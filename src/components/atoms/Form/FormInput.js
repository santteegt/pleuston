import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Field } from 'redux-form'
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
                <div className={this.state.isFocused ? 'input-wrap is-focused' : 'input-wrap'}>
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
                </div>
                {help && <FormHelp>{help}</FormHelp>}

                {additionalComponent && additionalComponent}
            </div>
        )
    }
}

export default FormInput
