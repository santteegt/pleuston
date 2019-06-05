import React from 'react'
import { Route, Switch } from 'react-router-dom'
import NotFound from './pages/NotFound'
import Datasets from './pages/Datasets'
import NewDataset from './pages/NewDataset'
import DatasetLoader from './containers/DatasetLoader'
import OauthLoader from './containers/OauthLoader'
import AwsAuthenication from './components/AwsAuth/AwsAuthenication'

const Routes = () => (
    <Switch>
        <Route exact component={Datasets} path="/" />
        <Route exact component={NewDataset} path="/new" />
        <Route exact component={OauthLoader} path="/oauth/:id" />
        <Route exact component={AwsAuthenication} path="/aws" />
        <Route exact component={DatasetLoader} path="/:id" />

        <Route component={NotFound} />
    </Switch>
)

export default Routes
