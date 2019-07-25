import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

import AssetMedia from './AssetMedia'
import AssetFullMeta from './AssetFullMeta'

import * as Web3 from 'web3'

import Button from '../atoms/Button'
import styles from './AssetFull.module.scss'

export default class AssetFull extends PureComponent {
    static propTypes = {
        handlePurchase: PropTypes.func,
        asset: PropTypes.object
    }

    render() {
        const { asset, handlePurchase } = this.props
        if (!asset) return null

        const metadata = asset.findServiceByType('Metadata')
        const { base, additionalInformation } = metadata.metadata

        // OEP-08 Base Attributes
        const {
            name,
            description,
            dateCreated,
            author,
            type,
            license,
            copyrightHolder,
            links,
            tags,
            price
        } = base

        return (
            <div className={styles.assetFull}>
                <h1 className={styles.assetFullTitle}>{name}</h1>
                <h2 className={styles.did}>{asset.id}</h2>

                {links && links.length && (
                    <p>
                        <AssetMedia title={name} links={links} />
                    </p>
                )}

                {/* <AssetFullMeta label="Publisher" item={publisherId} truncate /> */}

                <AssetFullMeta label="Author" item={author} />

                {copyrightHolder && (
                    <AssetFullMeta
                        label="Copyright holder"
                        item={copyrightHolder}
                    />
                )}

                <AssetFullMeta label="Published" item={dateCreated} />

                {description && (
                    <AssetFullMeta label="Description" item={description} />
                )}

                {links && links.length > 0 && (
                    <AssetFullMeta label="Links" links={links} />
                )}

                <AssetFullMeta
                    label="Price"
                    item={`${Web3.utils.fromWei(price.toString())} Ọ`}
                />

                {tags && tags.length > 0 && (
                    <AssetFullMeta
                        label="Tags"
                        item={tags.map(tag => (
                            <span key={tag} className={styles.tag}>
                                {tag}
                            </span>
                        ))}
                    />
                )}

                <AssetFullMeta label="Type" item={type} />

                <AssetFullMeta label="License" item={license} />

                {additionalInformation &&
                    additionalInformation.updateFrequency && (
                        <AssetFullMeta
                            label="Update Frequency"
                            item={additionalInformation.updateFrequency}
                        />
                    )}

                <div className={styles.assetFullActions}>
                    <Button
                        primary="true"
                        onClick={() => handlePurchase(asset)}
                    >
                        Purchase
                    </Button>
                </div>
            </div>
        )
    }
}
