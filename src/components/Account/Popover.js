import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { toDataUrl } from 'ethereum-blockies'
import styles from './Popover.module.scss'

const Popover = ({ networkName, activeAccount }) => {
    const identicon = activeAccount && toDataUrl(activeAccount.getId())

    return (
        <div className={styles.popover}>
            <div key={'accountName'} className={styles.accountName}>
                {activeAccount ? (
                    <Fragment>
                        <img className={styles.avatar} src={identicon} alt="Blockies" />
                        <span className={styles.address} title={activeAccount.getId()}>{activeAccount.getId()}</span>
                    </Fragment>
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
