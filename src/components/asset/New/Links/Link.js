import React from 'react'
import PropTypes from 'prop-types'
import styles from './Link.module.scss'

const Link = ({ link, removeLink }) => (
    <li>
        <a href={link.url}>{link.title}</a>
        <span className={styles.linkType}>{link.type}</span>
        <span className={styles.linkUrl}>{link.url}</span>
        <button className={styles.remove} title="Remove link" onClick={removeLink}>&times;</button>
    </li>
)

Link.propTypes = {
    link: PropTypes.object.isRequired,
    removeLink: PropTypes.func.isRequired
}

export default Link
