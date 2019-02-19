import React, { Component } from 'react'
import { Authenticator } from 'aws-amplify-react'
import Empty from '../atoms/Empty'
import Button from '../atoms/Button'
import styles from './AwsAuthenication.module.scss'

import Amplify from 'aws-amplify'
import { aws } from '../../../config/cloudStorage'

Amplify.configure(aws)

export default class AwsAuthenication extends Component {
    state = {
        count: 3,
        logged: false
    }

    counterInterval = null

    handleStateChange = state => {
        if (state === 'signedIn') {
            this.setState({ logged: true })
            this.startTimer()
        }
    }

    componentWillUnmount() {
        clearInterval(this.counterInterval)
    }

    startTimer = () => {
        if (!this.counterInterval && this.state.count > 0) {
            this.counterInterval = setInterval(this.countDown, 1000)
        }
    }

    countDown = () => {
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
                {!this.state.logged && <Authenticator onStateChange={this.handleStateChange} />}
                {this.state.logged && <div>
                    <Empty title="Success" text="Click the Aws button again to see your blobs." />
                    <Button link="true" onClick={() => window.close()}>{`Closing window in ${this.state.count}s ...`}</Button>
                </div>}
            </div>
        )
    }
}
