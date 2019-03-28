import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import Truncate from 'react-truncate'

import AssetMedia from './AssetMedia'
import './Asset.scss'

class Asset extends PureComponent {
    render() {
        const { asset } = this.props
        const metadata = asset.findServiceByType('Metadata')

        return (
            <div className="asset">
                <header className="asset__header">
                    <h1 className="asset__title">{metadata.metadata.base.name}</h1>
                    <div className="asset__id">
                        <Truncate>{asset.id}</Truncate>
                    </div>
                </header>

                {metadata.metadata.base.files && <AssetMedia title={metadata.metadata.base.name} contentUrls={metadata.metadata.base.files} />}

                <div className="asset__description">
                    <Truncate lines={2}>{metadata.metadata.base.description}</Truncate>
                </div>

                <div className="asset__meta">
                    <div className="asset__price">{metadata.metadata.base.price} Ọ</div>
                    <div className="asset__date">
                        {new Date(metadata.metadata.base.dateCreated).toLocaleDateString('en-US')}
                    </div>
                </div>
            </div>
        )
    }
}

Asset.propTypes = {
    asset: PropTypes.object.isRequired
}

export default Asset
