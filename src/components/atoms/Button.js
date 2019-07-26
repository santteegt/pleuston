import React from 'react'
import PropTypes from 'prop-types'
import styles from './Button.module.scss'

const ButtonIcon = ({ icon }) => {
    const TagName = icon
    return <TagName className={styles.icon} />
}

ButtonIcon.propTypes = {
    icon: PropTypes.any
}

const Button = ({ icon, children, primary, link, ...props }) => {
    let classes

    if (primary) {
        classes = styles.buttonPrimary
    } else if (link) {
        classes = styles.link
    } else {
        classes = styles.button
    }

    return props.href ? (
        <a href={props.href} {...props}>
            {icon && <ButtonIcon icon={icon} />}
            {children}
        </a>
    ) : (
        <button className={classes} {...props}>
            {icon && <ButtonIcon icon={icon} />}
            {children}
        </button>
    )
}

Button.propTypes = {
    children: PropTypes.string.isRequired,
    primary: PropTypes.string,
    link: PropTypes.any,
    href: PropTypes.any,
    icon: PropTypes.any
}

export default Button
