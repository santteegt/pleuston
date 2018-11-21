import React from 'react'
import Layout from '../components/Layout'
import ScreenHeader from '../components/ScreenHeader'
import AssetSearchLoader from '../containers/AssetSearchLoader'

const Datasets = () => (
    <Layout>
        <ScreenHeader title="Data Sets" subtitle="Explore all data sets" />
        <AssetSearchLoader />
    </Layout>
)

export default Datasets
