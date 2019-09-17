import React from 'react'
import PropTypes from 'prop-types'
import Button from '../atoms/Button'
import { toDataUrl } from 'ethereum-blockies'
import styles from './Popover.module.scss'

const Popover = ({ networkName, activeAccount, airdropTokens, provider }) => {
    const accountId = activeAccount && activeAccount.getId()
    const identicon = accountId && toDataUrl(accountId)

    return (
        <div className={styles.popover}>
            <div key={'accountName'} className={styles.accountName}>
                {activeAccount ? (
                    <>
                        <img
                            className={styles.avatar}
                            src={identicon}
                            alt="Blockies"
                        />
                        <span className={styles.address} title={accountId}>
                            {accountId}
                        </span>
                    </>
                ) : (
                    'No account selected'
                )}
            </div>
            <div key={'network'} className={styles.popoverInfoline}>
                Network: &nbsp;<strong>{networkName}</strong>
                <Button style={{"marginLeft": '5%'}} onClick={airdropTokens(provider, activeAccount)}>Airdrop</Button>
            </div>
        </div>
    )
}

Popover.propTypes = {
    networkName: PropTypes.string,
    activeAccount: PropTypes.object,
    airdropTokens: PropTypes.func,
    provider: PropTypes.object
}

export default Popover
