import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import Truncate from 'react-truncate'
import * as Web3 from 'web3'

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

                {metadata.metadata.base.links && <AssetMedia title={metadata.metadata.base.name} links={metadata.metadata.base.links} />}

                <div className="asset__description">
                    <Truncate lines={2}>{metadata.metadata.base.description}</Truncate>
                </div>

                <div className="asset__meta">
                    <div className="asset__price">{Web3.utils.fromWei(metadata.metadata.base.price.toString())} Ọ</div>
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
