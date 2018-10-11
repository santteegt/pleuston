import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import styles from './Balance.module.scss'

const Balance = ({ eth, ocn }) => (
    <Fragment>
        <span className={styles.balance}>
            <strong>{(eth / 1e18).toFixed(2)}</strong> Ξ
        </span>
        <span className={styles.balance}>
            <strong>{ocn}</strong> Ọ
        </span>
    </Fragment>
)

Balance.propTypes = {
    eth: PropTypes.string.isRequired,
    ocn: PropTypes.string.isRequired
}

export default Balance
