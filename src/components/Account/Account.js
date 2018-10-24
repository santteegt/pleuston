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
        balanceEther: null,
        balanceOcean: null
    }

    async getBalances(prevProps) {
        if (this.props.activeAccount !== null) {
            const balanceEther = await this.props.activeAccount.getEtherBalance()
            const balanceOcean = await this.props.activeAccount.getOceanBalance()
            this.setState(() => ({
                balanceEther: balanceEther.toString(),
                balanceOcean: balanceOcean.toString()
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
        const { popoverOpen, balanceEther, balanceOcean } = this.state

        return (
            <div
                className={styles.account}
                onMouseEnter={() => this.togglePopover()}
                onMouseLeave={() => this.togglePopover()}
                onTouchStart={() => this.togglePopover()}
            >
                {balanceOcean && balanceEther && (
                    <Balance eth={balanceEther} ocn={balanceOcean} />
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
