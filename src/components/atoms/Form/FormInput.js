import React, { PureComponent } from 'react'
import { Field } from 'redux-form'
import { ReactComponent as SearchIcon } from '../../../svg/search.svg'
import './FormInput.scss'

class FormInput extends PureComponent {
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
        const { name, label, required, type } = this.props

        return (
            <>
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
                        {...this.props}
                        onFocus={() => this.setState({ isFocused: true })}
                        onBlur={() => this.setState({ isFocused: false })}
                    />
                    {type === 'search' && <SearchIcon />}
                </div>
            </>
        )
    }
}

export default FormInput
