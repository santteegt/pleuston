import React, { Component } from 'react'
import Empty from '../atoms/Empty'
import Button from '../atoms/Button'
import styles from './OauthResult.module.scss'

export default class OauthResult extends Component {
    constructor(props) {
        super(props)

        this.counterInterval = null
        this.startTimer = this.startTimer.bind(this)
        this.countDown = this.countDown.bind(this)

        this.state = { count: 3 }
    }

    componentDidMount() {
        this.startTimer()
    }

    componentWillUnmount() {
        clearInterval(this.counterInterval)
    }

    startTimer() {
        if (!this.counterInterval && this.state.count > 0) {
            this.counterInterval = setInterval(this.countDown, 1000)
        }
    }

    countDown() {
        let count = this.state.count - 1
        this.setState({ count })

        if (count === 0) {
            clearInterval(this.counterInterval)
            window.close()
        }
    }

    render() {
        return (
            <div className={styles.screen}>
                <div>
                    <Empty title="Success" text="Click the Azure button again to see your blobs." />
                    <Button link="true" onClick={() => window.close()}>Closing window in {this.state.count}s ...</Button>
                </div>
            </div>
        )
    }
}
