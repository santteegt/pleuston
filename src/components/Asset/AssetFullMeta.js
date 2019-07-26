import React from 'react'
import PropTypes from 'prop-types'
import Truncate from 'react-truncate'

import styles from './AssetFullMeta.module.scss'

const Links = ({ links }) =>
    links.map((link, i) => (
        <div className={styles.link} key={i}>
            <a href={link.url}>{link.name}</a>
            <span>({link.type})</span>
        </div>
    ))

const AssetFullMeta = ({ label, item, links, truncate }) => (
    <div className={styles.metaLine}>
        <div className={styles.metaLabel}>{label}</div>
        <div className={styles.metaValue}>
            {links ? (
                <Links links={links} />
            ) : truncate ? (
                <Truncate>{item}</Truncate>
            ) : (
                item
            )}
        </div>
    </div>
)

AssetFullMeta.propTypes = {
    label: PropTypes.string.isRequired,
    item: PropTypes.any,
    links: PropTypes.array,
    truncate: PropTypes.bool
}

export default AssetFullMeta
