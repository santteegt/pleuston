import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import Balance from './Balance'
import Status from './Status'
import Popover from './Popover'
import styles from './Account.module.scss'

export default class Account extends PureComponent {
    static propTypes = {
        networkName: PropTypes.string,
        activeAccount: PropTypes.object
    }

    state = {
        popoverOpen: false,
        balance: null
    }

    _isMounted = false

    componentDidMount() {
        this._isMounted = true
        this.getBalances()
    }

    componentDidUpdate(prevProps) {
        if (prevProps.activeAccount !== this.props.activeAccount) {
            this.getBalances(prevProps)
        }
    }

    componentWillUnmount() {
        this._isMounted = false
    }

    async getBalances(prevProps) {
        if (this.props.activeAccount !== null) {
            const balance = await this.props.activeAccount.getBalance()
            if (this._isMounted) {
                this.setState(() => ({
                    balance: balance
                }))
            }
        }
    }

    togglePopover() {
        this.setState(prevState => ({
            popoverOpen: !prevState.popoverOpen
        }))
    }

    render() {
        const { activeAccount, networkName } = this.props
        const { popoverOpen, balance } = this.state

        return (
            <div
                className={styles.account}
                onMouseEnter={() => this.togglePopover()}
                onMouseLeave={() => this.togglePopover()}
                onTouchStart={() => this.togglePopover()}
            >
                {balance && (
                    <Balance
                        eth={balance.eth.toString()}
                        ocn={balance.ocn.toString()}
                    />
                )}
                <Status
                    networkName={networkName}
                    activeAccount={activeAccount}
                />
                {popoverOpen && (
                    <Popover
                        networkName={this.props.networkName}
                        activeAccount={this.props.activeAccount}
                    />
                )}
            </div>
        )
    }
}
