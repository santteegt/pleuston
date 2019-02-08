module.exports = {
    azure: {
        storageAccount: 'testocnfiles',
        accessKey: '',
        appId: '',
        redirectHost: 'http://localhost:3000',
        scope: 'https://storage.azure.com/user_impersonation'
    },
    aws: {
        Auth: {
            identityPoolId: 'eu-central-1:5abaf99c-0557-4ce4-bcda-ddb2ef97b432',
            region: 'eu-central-1',
            userPoolId: 'eu-central-1_2x4Uz0SiJ',
            userPoolWebClientId: '37gefv0vt954ff9v29lqtf6ai8',
        },
        Storage: {
            bucket: 'pleustontest',
            region: 'eu-central-1',
            level: 'public'
        }
    }
}
