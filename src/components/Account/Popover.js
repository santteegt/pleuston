import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import Blockies from 'react-blockies'
import styles from './Popover.module.scss'

const Popover = ({ networkName, activeAccount, initMakeItRain }) => {
    return (
        <div className={styles.popover}>
            <div key={'accountName'} className={styles.popoverInfoline}>
                {activeAccount ? (
                    <Fragment>
                        <Blockies
                            size={10}
                            scale={2}
                            className={styles.avatar}
                            seed={activeAccount.name}
                        />
                        <span className={styles.address} title={activeAccount.name}>{activeAccount.name}</span>
                    </Fragment>
                ) : 'No account selected'}
            </div>
            <div key={'network'} className={styles.popoverInfoline}>
                Network: &nbsp;<strong>{networkName}</strong>
                {networkName !== 'Kovan' && <div>Please connect to Kovan</div>}
            </div>
            <div key={'makeItRain'} className={styles.popoverInfoline}>
                <button className={styles.action} onClick={initMakeItRain}>Make it rain</button>
            </div>
        </div>
    )
}

Popover.propTypes = {
    networkName: PropTypes.string,
    activeAccount: PropTypes.object,
    initMakeItRain: PropTypes.func
}

export default Popover
