import React, { PureComponent } from 'react'
import { Field } from 'redux-form'
import FormHelp from './FormHelp'
import './FormInput.scss'

class FormInput extends PureComponent {
    state = { isFocused: false }

    render() {
        const { name, label, required, help, additionalComponent } = this.props

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
                        {...this.props}
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
