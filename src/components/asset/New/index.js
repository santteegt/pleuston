import React from 'react'
import PropTypes from 'prop-types'
import { Form, reduxForm, FieldArray } from 'redux-form'
import Button from '../../atoms/Button'
import FormInput from '../../atoms/Form/FormInput'
import FormHelp from '../../atoms/Form/FormHelp'
import CloudStorageLoader from '../../../containers/CloudStorageLoader'
import Links from './Links/'

const AssetNew = ({ handleSubmit, linkSetter, resetLinksForm }) => (
    <Form className="form" onSubmit={handleSubmit}>

        <FormInput label="Title" name="name" required component="input" type="text" help="The title of your asset." />

        <FormInput label="Description" name="description" required component="textarea" rows="5" help="Describe your asset, explaining what the data represents and what it can be used for." />

        <FormInput
            label="Asset file"
            name="files"
            required
            component="input"
            type="url"
            placeholder="e.g. https://url.com/dataset.zip"
            help="Add a URL pointing to your data set asset or select it from cloud storage providers."
            additionalComponent={<CloudStorageLoader linkSetter={linkSetter} />}
        />

        <FormInput label="Price" name="price" required type="number" component="input" placeholder="0" help="Price of your asset in Ocean Tokens." />

        <FormInput label="Author" name="author" required component="input" type="text" placeholder="e.g. Tfl, Disney Corp." help="The name of the entity generating this data." />

        <FormInput label="Type" required name="type" component="select" help="The type of your asset.">
            <option />
            <option value="dataset">Data set</option>
            <option value="algorithm">Algorithm</option>
            <option value="container">Container</option>
            <option value="workflow">Workflow</option>
            <option value="other">Other</option>
        </FormInput>

        <FormInput label="License" required name="license" component="select">
            <option value="none">No License Specified</option>
            <option value="Public Domain">Public Domain</option>
            <option value="CC BY">CC BY: Attribution</option>
            <option value="CC BY-SA">CC BY-SA: Attribution ShareAlike</option>
            <option value="CC BY-ND">CC BY-ND: Attribution-NoDerivs</option>
            <option value="CC BY-NC">CC BY-NC: Attribution-NonCommercial</option>
            <option value="CC BY-NC-SA">CC BY-NC-SA: Attribution-NonCommercial-ShareAlike</option>
            <option value="CC BY-NC-ND">CC BY-NC-ND: Attribution-NonCommercial-NoDerivs</option>
        </FormInput>

        <div className="form__group">
            <h3 className="form__group__title">Links</h3>

            <FormHelp>Provide one or multiple links (e.g. samples, format definitions, web links) to give supplementary information about an Asset.</FormHelp>

            <FieldArray name="links" resetLinksForm={resetLinksForm} component={Links} />
        </div>

        <FormInput label="Copyright holder" name="copyrightHolder" component="input" type="text" placeholder="" help="The party holding the legal copyright." />

        <FormInput label="Tags" name="tags" component="input" placeholder="e.g. climate, ocean, atmosphere, temperature, earth-science, public" help="Categorize your asset by one or more tags, separated by comma." />

        <FormInput label="Update Frequency" name="updateFrequency" component="select" help="How often are updates expected, or is the resource static?">
            <option />
            <option value="seldom">Seldom</option>
            <option value="annually">Annually</option>
            <option value="quarterly">Quarterly</option>
            <option value="never">Never expected to get updated</option>
        </FormInput>

        <div className="form__group">
            <Button primary="true" type="submit">Publish</Button>
        </div>
    </Form>
)

AssetNew.propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    linkSetter: PropTypes.func.isRequired,
    resetLinksForm: PropTypes.func.isRequired
}

const AssetNewForm = reduxForm({
    form: 'newAsset',
    fields: ['name']
})(AssetNew)

export default AssetNewForm
