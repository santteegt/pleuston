import React, { Component } from 'react'
import Empty from '../atoms/Empty'
import Button from '../atoms/Button'
import styles from './OauthResult.module.scss'

export default class OauthResult extends Component {
    render() {
        return (
            <div className={styles.screen}>
                <div>
                    <Empty title="Success" text="Click the Azure button again to see your blobs." />
                    <Button link="true" onClick={() => window.close()}>Close window</Button>
                </div>
            </div>
        )
    }
}
