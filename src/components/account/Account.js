import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import Balance from './Balance'
import Status from './Status'
import Popover from './Popover'
import styles from './Account.module.scss'

export default class Account extends PureComponent {
    constructor(props) {
        super(props)

        this.state = {
            popoverOpen: false
        }
    }

    togglePopover() {
        this.setState(prevState => ({
            popoverOpen: !prevState.popoverOpen
        }))
    }

    render() {
        const { activeAccount, networkName, initMakeItRain } = this.props
        const { popoverOpen } = this.state

        const balanceEther = activeAccount ? activeAccount.balance.eth.toString() : '0.00'
        const balanceOcean = activeAccount ? activeAccount.balance.ocn.toString() : '0.00'

        return (
            <div
                className={styles.account}
                onMouseEnter={() => this.togglePopover()}
                onMouseLeave={() => this.togglePopover()}
                onTouchStart={() => this.togglePopover()}
            >
                <Balance eth={balanceEther} ocn={balanceOcean} />
                <Status
                    networkName={networkName}
                    activeAccount={activeAccount}
                    initMakeItRain={initMakeItRain}
                />
                {popoverOpen && (
                    <Popover
                        networkName={this.props.networkName}
                        activeAccount={this.props.activeAccount}
                        initMakeItRain={this.props.initMakeItRain}
                    />
                )}
            </div>
        )
    }
}

Account.propTypes = {
    networkName: PropTypes.string,
    activeAccount: PropTypes.object,
    initMakeItRain: PropTypes.func
}
