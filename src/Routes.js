import React from 'react'
import { Route, Switch } from 'react-router-dom'
import NotFound from './pages/NotFound'
import Datasets from './pages/Datasets'
import NewDataset from './pages/NewDataset'
import Orders from './pages/Orders'
import DatasetLoader from './containers/DatasetLoader'
import OrderLoader from './containers/OrderLoader'
import OauthLoader from './containers/OauthLoader'
import AwsAuthenication from './pages/AwsAuthenication'

const Routes = () => (
    <Switch>
        <Route exact component={Datasets} path="/" />
        <Route exact component={NewDataset} path="/new" />
        <Route exact component={Orders} path="/orders" />
        <Route exact component={OrderLoader} path="/orders/:id" />
        <Route exact component={OauthLoader} path="/oauth/:id" />
        <Route exact component={AwsAuthenication} path="/aws" />
        <Route exact component={DatasetLoader} path="/:id" />

        <Route component={NotFound} />
    </Switch>
)

export default Routes
