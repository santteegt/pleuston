/* eslint-disable no-console */
import { connect } from 'react-redux'
import { push } from 'connected-react-router'
import { change, reset } from 'redux-form'
import AssetNewForm from '../components/asset/New'
import {
    putAsset
} from '../actions/index'

export default connect(
    null,
    dispatch => ({
        onSubmit: values => {
            console.log('form values: ', values)
            dispatch(putAsset(values))
            dispatch(reset('newAsset'))
            dispatch(push('/'))
        },
        linkSetter: (newValue) => {
            dispatch(change('newAsset', 'contentUrls', newValue))
        }
    })
)(AssetNewForm)
