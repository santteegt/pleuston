import React from 'react'
import PropTypes from 'prop-types'
import { reduxForm } from 'redux-form'
import Button from '../atoms/Button'
import FormHelp from '../atoms/Form/FormHelp'
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
            <div className="form__group">
                <FormInput label="Type" name="type" component="select">
                    <option />
                    <option value="dataset">Data set</option>
                    <option value="algorithm">Algorithm</option>
                    <option value="container">Container</option>
                    <option value="workflow">Workflow</option>
                    <option value="other">Other</option>
                </FormInput>
                <FormHelp>The type of your asset.</FormHelp>
            </div>
            <div className="form__group">
                <FormInput label="License" name="license" component="select">
                    <option />
                    <option value="none">No License Specified</option>
                    <option value="Public Domain">Public Domain</option>
                    <option value="CC BY">CC BY: Attribution</option>
                    <option value="CC BY-SA">CC BY-SA: Attribution ShareAlike</option>
                    <option value="CC BY-ND">CC BY-ND: Attribution-NoDerivs</option>
                    <option value="CC BY-NC">CC BY-NC: Attribution-NonCommercial</option>
                    <option value="CC BY-NC-SA">CC BY-NC-SA: Attribution-NonCommercial-ShareAlike</option>
                    <option value="CC BY-NC-ND">CC BY-NC-ND: Attribution-NonCommercial-NoDerivs</option>
                </FormInput>
            </div>
            <div className="form__group">
                <FormInput label="Update Frequency" name="updateFrequency" component="select">
                    <option />
                    <option value="seldom">Seldom</option>
                    <option value="annually">Annually</option>
                    <option value="quarterly">Quarterly</option>
                    <option value="never">Never expected to get updated</option>
                </FormInput>
                <FormHelp>How often are updates expected, or is the resource static?</FormHelp>
            </div>
            <div className="form__group">
                <FormInput label="Price from" name="priceFrom" component="input" type="number" placeholder="" />
                <FormHelp>Price from</FormHelp>
            </div>
            <div className="form__group">
                <FormInput label="Price to" name="priceTo" component="input" type="number" placeholder="" />
                <FormHelp>Price to</FormHelp>
            </div>
            <div className="form__group">
                <FormInput label="Update Frequency" name="addedIn" component="select">
                    <option />
                    <option value="today">Today</option>
                    <option value="thisMonth">This month</option>
                    <option value="thisYear">This year</option>
                </FormInput>
                <FormHelp>Added</FormHelp>
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
