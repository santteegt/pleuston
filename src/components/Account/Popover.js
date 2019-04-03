import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import Blockies from 'react-blockies'
import styles from './Popover.module.scss'

const Popover = ({ networkName, activeAccount }) => {
    return (
        <div className={styles.popover}>
            <div key={'accountName'} className={styles.accountName}>
                {activeAccount ? (
                    <Fragment>
                        <Blockies
                            size={10}
                            scale={2}
                            className={styles.avatar}
                            seed={activeAccount.getId()}
                        />
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
