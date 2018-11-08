/* eslint-disable no-console */
import { connect } from 'react-redux'
import { push } from 'connected-react-router'
import { reset } from 'redux-form'
import AssetNewForm from '../components/asset/AssetNew'
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
        }
    })
)(AssetNewForm)
