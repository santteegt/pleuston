import React from 'react'
import PropTypes from 'prop-types'
import { toDataUrl } from 'ethereum-blockies'
import styles from './Popover.module.scss'

const Popover = ({ networkName, activeAccount }) => {
    const accountId = activeAccount.getId()
    const identicon = accountId && toDataUrl(accountId)

    return (
        <div className={styles.popover}>
            <div key={'accountName'} className={styles.accountName}>
                {activeAccount ? (
                    <>
                        <img className={styles.avatar} src={identicon} alt="Blockies" />
                        <span className={styles.address} title={accountId}>{accountId}</span>
                    </>
                ) : 'No account selected'}
            </div>
            <div key={'network'} className={styles.popoverInfoline}>
                Network: &nbsp;<strong>{networkName}</strong>
            </div>
        </div>
    )
}

Popover.propTypes = {
    networkName: PropTypes.string,
    activeAccount: PropTypes.object
}

export default Popover
