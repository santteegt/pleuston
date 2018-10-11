import React from 'react'
import { Link } from 'react-router-dom'
import AccountLoader from '../containers/AccountLoader'
import logo from '@oceanprotocol/art/logo/logo-white.svg'
import styles from './Header.module.scss'

const Header = () => (
    <header className={styles.header}>
        <div className={styles.headerContent}>
            <Link to={'/'} className={styles.headerLogo}>
                <img alt="logo" className={styles.headerLogoImage} src={logo} />
                <h1 className={styles.headerTitle}>Data Sets</h1>
            </Link>

            <div className={styles.headerMenu}>
                <AccountLoader />
            </div>

        </div>
    </header>
)

export default Header
