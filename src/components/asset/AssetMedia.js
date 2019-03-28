import React from 'react'

import './Asset.scss'

const AssetMedia = ({
    files,
    title
}) => (
    files[0].match(/\.(jpeg|jpg|gif|png)$/) &&
    <img alt={title} className="asset__img" src={files[0]} />
)

export default AssetMedia
