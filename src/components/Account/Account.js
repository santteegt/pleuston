import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import Balance from './Balance'
import Status from './Status'
import Popover from './Popover'
import styles from './Account.module.scss'

export default class Account extends PureComponent {
    static propTypes = {
        networkName: PropTypes.string,
        activeAccount: PropTypes.object,
        initMakeItRain: PropTypes.func
    }

    state = {
        popoverOpen: false,
        balance: null
    }

    async getBalances(prevProps) {
        if (this.props.activeAccount !== null) {
            const balance = await this.props.activeAccount.getBalance()
            this.setState(() => ({
                balance: balance
            }))
        }
    }

    componentDidUpdate(prevProps) {
        if (prevProps.activeAccount !== this.props.activeAccount) {
            this.getBalances(prevProps)
        }
    }

    componentDidMount() {
        this.getBalances()
    }

    togglePopover() {
        this.setState(prevState => ({
            popoverOpen: !prevState.popoverOpen
        }))
    }

    render() {
        const { activeAccount, networkName, initMakeItRain } = this.props
        const { popoverOpen, balance } = this.state

        return (
            <div
                className={styles.account}
                onMouseEnter={() => this.togglePopover()}
                onMouseLeave={() => this.togglePopover()}
                onTouchStart={() => this.togglePopover()}
            >
                {balance && (
                    <Balance eth={balance.eth.toString()} ocn={balance.ocn.toString()} />
                )}
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
