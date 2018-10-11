import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import styles from './Balance.module.scss'

const Balance = ({ eth, ocn }) => {
    const ethFromWei = (eth / 1e18)

    return (
        <Fragment>
            <span className={styles.balance} title={ethFromWei.toFixed(10)}>
                <strong>{ethFromWei.toFixed(2)}</strong> Ξ
            </span>
            <span className={styles.balance}>
                <strong>{ocn}</strong> Ọ
            </span>
        </Fragment>
    )
}

Balance.propTypes = {
    eth: PropTypes.string.isRequired,
    ocn: PropTypes.string.isRequired
}

export default Balance
