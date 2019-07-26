import React, { Fragment } from 'react'
import PropTypes from 'prop-types'

import Empty from '../atoms/Empty'
import Asset from './Asset'

import styles from './AssetList.module.scss'

const AssetList = ({ assets, handleClick }) =>
    assets.length ? (
        <Fragment>
            <div className={styles.assets}>
                {assets.map(asset => (
                    <div
                        className={styles.tile}
                        key={asset.id}
                        onClick={() => handleClick(asset)}
                        onKeyPress={() => handleClick(asset)}
                        role="link"
                        tabIndex={0}
                    >
                        <Asset asset={asset} />
                    </div>
                ))}
            </div>
        </Fragment>
    ) : (
        <Empty
            title="No data sets yet"
            text="Why not add some of yours?"
            action="+ Add new data set"
            actionLink="/new"
        />
    )

AssetList.propTypes = {
    assets: PropTypes.array.isRequired,
    handleClick: PropTypes.func.isRequired
}

export default AssetList
