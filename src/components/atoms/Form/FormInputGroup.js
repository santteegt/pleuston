import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import styles from './FormInputGroup.module.scss'

export default class FormInputGroup extends PureComponent {
    state = { isFocused: false }

    static propTypes = {
        children: PropTypes.any
    }

    render() {
        const { children } = this.props

        return <div className={styles.inputGroup}>{children}</div>
    }
}
