import React from 'react'
import PropTypes from 'prop-types'
import { reduxForm } from 'redux-form'
import Button from '../atoms/Button'
import FormInput from '../atoms/Form/FormInput'
import AssetList from '../../components/asset/AssetList'

import styles from './AssetSearch.module.scss'

const AssetSearch = ({ page, handleSubmit, assets, handleClick, handleSetPage }) => (
    <>
        <form onSubmit={handleSubmit} className={styles.searchForm}>
            <div className="input-group">
                <FormInput label="Search" name="text" component="input" type="search" placeholder="Search for keyword in the name or description." />
                <Button type="submit">Search</Button>
            </div>
        </form>

        <AssetList assets={assets} handleClick={handleClick} />

        {assets && assets.length && (
            <div className={styles.pagination}>
                <a href="#" className={styles.item} onClick={() => handleSetPage(page - 1)}>&lt; Prev page</a>
                <span className={styles.item}>{ page }</span>
                <a href="#" className={styles.item} onClick={() => handleSetPage(page + 1)}>Next page &gt;</a>
            </div>
        )}
    </>
)

AssetSearch.propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    handleClick: PropTypes.func.isRequired,
    page: PropTypes.number.isRequired,
    handleSetPage: PropTypes.func.isRequired,
    assets: PropTypes.array.isRequired
}

const AssetSearchForm = reduxForm({
    form: 'assetSearch'
})(AssetSearch)

export default AssetSearchForm
