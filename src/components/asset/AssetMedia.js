import React from 'react'

import './Asset.scss'

const AssetMedia = ({
    links,
    title
}) => (
    links[0].url.match(/\.(jpeg|jpg|gif|png)$/) &&
    <img alt={title} className="asset__img" src={links[0].url} />
)

export default AssetMedia
