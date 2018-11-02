import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { reduxForm } from 'redux-form'
import Button from '../atoms/Button'
import FormInput from '../atoms/Form/FormInput'
import FormHelp from '../atoms/Form/FormHelp'
import AssetListLoader from '../../containers/AssetListLoader'

const AssetSearch = ({ page, handleSubmit }) => (
    <Fragment>
        <form className="form" onSubmit={handleSubmit}>
            <div className="form__group">
                <FormInput label="Search" name="text" required component="input" type="text" placeholder="" />
                <FormHelp>Search for any keyword in the name or description.</FormHelp>
            </div>
            <div className="form__group">
                <Button primary="true" type="submit">Search</Button>
            </div>
        </form>
        <AssetListLoader />
        <div>
          TODO PAGINATION
        </div>
    </Fragment>
)

AssetSearch.propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    page: PropTypes.number.isRequired
}

const AssetSearchForm = reduxForm({
    form: 'assetSearch'
})(AssetSearch)

export default AssetSearchForm
