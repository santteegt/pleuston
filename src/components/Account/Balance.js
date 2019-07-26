import React from 'react'
import PropTypes from 'prop-types'
import styles from './Balance.module.scss'

const Balance = ({ eth, ocn }) => {
    const ethFromWei = eth / 1e18

    return (
        <>
            <span className={styles.balance} title={ethFromWei.toFixed(10)}>
                <strong>{ethFromWei.toFixed(3).slice(0, -1)}</strong> Ξ
            </span>
            <span className={styles.balance}>
                <strong>{ocn}</strong> Ọ
            </span>
        </>
    )
}

Balance.propTypes = {
    eth: PropTypes.string.isRequired,
    ocn: PropTypes.string.isRequired
}

export default Balance
