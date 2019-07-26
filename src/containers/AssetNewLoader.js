/* eslint-disable no-console */
import { connect } from 'react-redux'
import { push } from 'connected-react-router'
import { change, reset } from 'redux-form'
import AssetNewForm from '../components/Asset/New'
import { putAsset } from '../actions/index'

export default connect(
    null,
    dispatch => ({
        onSubmit: values => {
            console.log('form values: ', values)
            dispatch(putAsset(values))
            dispatch(reset('newAsset'))
            dispatch(push('/'))
        },
        fileSetter: newValue => {
            dispatch(change('newAsset', 'files', newValue))
        },
        resetLinksForm: () => {
            dispatch(change('newAsset', 'linkName', ''))
            dispatch(change('newAsset', 'linkType', ''))
            dispatch(change('newAsset', 'linkUrl', ''))
        }
    })
)(AssetNewForm)
