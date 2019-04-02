import React from 'react'
import PropTypes from 'prop-types'

import './Asset.scss'

const AssetMedia = ({
    links,
    title
}) => (
    <>
        {links && links[0].url && links[0].url.match(/\.(jpeg|jpg|gif|png)$/) &&
        <img alt={title} className="asset__img" src={links[0].url} />}
    </>
)

AssetMedia.propTypes = {
    links: PropTypes.array.isRequired,
    title: PropTypes.string.isRequired
}

export default AssetMedia
