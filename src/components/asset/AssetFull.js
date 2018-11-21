import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

import AssetMedia from './AssetMedia'
import AssetFullMeta from './AssetFullMeta'

import Button from '../atoms/Button'
import styles from './AssetFull.module.scss'

// const Editable = ({ name, value, onFieldChange, onValueChange }) => (
//     <input name={name} type="text" value={value} onChange={onValueChange} />
// )

// Editable.propTypes = {
//     name: PropTypes.string,
//     value: PropTypes.string,
//     onFieldChange: PropTypes.func,
//     onValueChange: PropTypes.func
// }

class AssetFull extends PureComponent {
    constructor(props) {
        super(props)

        this.state = {
            isWritable: false
        }
    }

    onEdit(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    render() {
        const {
            asset,
            handlePurchase
        } = this.props
        if (!asset) return null
        const metadata = asset.findServiceByType('Metadata')
        const {
            base,
            // curation,
            additionalInformation
        } = metadata.metadata
        // OEP-08 Base Attributes
        const {
            name,
            description,
            dateCreated,
            // size,
            author,
            type,
            license,
            copyrightHolder,
            // encoding,
            // compression,
            // contentType,
            // workExample,
            contentUrls,
            links,
            // inLanguage,
            tags,
            price
        } = base

        return (
            <div className={styles.assetFull}>
                <h1 className={styles.assetFullTitle}>{name}</h1>

                {contentUrls && contentUrls.length && (
                    <p>
                        <AssetMedia title={name} contentUrls={contentUrls} />
                    </p>
                )}

                {/* <AssetFullMeta label="Publisher" item={publisherId} truncate /> */}

                <AssetFullMeta label="Author" item={author} />

                {copyrightHolder && <AssetFullMeta label="Copyright holder" item={copyrightHolder} />}

                <AssetFullMeta label="Published" item={dateCreated} />

                <AssetFullMeta label="ID" item={asset.id} truncate />

                {description && <AssetFullMeta label="Description" item={description} />}

                {contentUrls && contentUrls.length && (
                    <AssetFullMeta label="URL" item={contentUrls[0] || 'Please purchase'} link={contentUrls[0]} />
                )}

                {links && links.length > 0 && <AssetFullMeta label="Links" links={links} />}

                <AssetFullMeta label="Price" item={`${price} Ọ`} />
                {/* <AssetFullMeta label="Token" item={token || 'Please purchase'} /> */}

                {tags && tags.length > 0 && (
                    <AssetFullMeta label="Tags" item={tags.map(tag => (tag))} />
                )}

                <AssetFullMeta label="Type" item={type} />

                <AssetFullMeta label="License" item={license} />

                {additionalInformation.updateFrequency && (
                    <AssetFullMeta label="Update Frequency" item={additionalInformation.updateFrequency} />
                )}

                <div className={styles.assetFullActions}>
                    <Button primary="true" onClick={() => handlePurchase(asset)}>Purchase</Button>
                </div>
            </div>
        )
    }
}

AssetFull.propTypes = {
    handlePurchase: PropTypes.func,
    asset: PropTypes.object
}

export default AssetFull
