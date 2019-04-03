module.exports = {
    azure: {
        storageAccount: '',
        accessKey: '',
        appId: '',
        redirectHost: 'http://localhost:3000',
        scope: 'https://storage.azure.com/user_impersonation'
    },
    aws: {
        Auth: {
            identityPoolId: '',
            region: '',
            userPoolId: '',
            userPoolWebClientId: ''
        },
        Storage: {
            bucket: '',
            region: '',
            level: 'public'
        }
    }
}
