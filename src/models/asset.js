const AssetModel = {
    assetId: null,
    publisherId: null,

    // OEP-08 Attributes
    // https://github.com/oceanprotocol/OEPs/tree/master/8
    base: {
        name: null,
        description: null,
        dateCreated: null,
        author: null,
        type: '',
        license: null,
        copyrightHolder: null,
        files: [],
        links: [
            {
                name: null,
                type: null,
                url: null
            }
        ],
        tags: [],
        price: '',
        workExample: '',
        inLanguage: ''
    },
    additionalInformation: {
        updateFrequency: null
    }
}

export default AssetModel
