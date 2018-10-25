import React, { PureComponent } from 'react'
import { Field } from 'redux-form'
import FormHelp from './FormHelp'
import './FormInput.scss'

class FormInput extends PureComponent {
    state = { isFocused: false }

    render() {
        const { name, label, required, help } = this.props

        return (
            <>
                <div>
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
                </div>
                {help && <FormHelp>{help}</FormHelp>}
            </>
        )
    }
}

export default FormInput
