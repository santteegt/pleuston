import React from 'react'
import ReactDOM from 'react-dom'
import Amplify from 'aws-amplify'
import AwsAuthenication from './AwsAuthenication'
import { aws } from '../../config/cloudStorage'

Amplify.configure(aws)

it('AwsAuthenication renders without crashing', () => {
    const div = document.createElement('div')
    ReactDOM.render(<AwsAuthenication />, div)
    ReactDOM.unmountComponentAtNode(div)
})
