import React from 'react'
import PropTypes from 'prop-types'

import logo from '../../node_modules/oceanprotocol-art/logo/logo-white.svg'
import './Header.css'

const Header = ({ activeAccount }) => (
    <header className="header">
        <a className="header__logo" href="/">
            <img alt="logo" className="header__logo__image" src={logo} />
            <h1 className="header__title">
                Pigeon market
            </h1>
        </a>
        <nav className="header__menu">
            <span className="header__menu__user">{activeAccount ? activeAccount.name : 'No account selected'}</span>
        </nav>
    </header>
)

Header.propTypes = {
    activeAccount: PropTypes.object, // eslint-disable-line
}

export default Header
