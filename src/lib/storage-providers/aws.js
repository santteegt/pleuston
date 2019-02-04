// import amplify from 'aws-amplify'
// import { Logger } from '@oceanprotocol/squid'
import amplify from 'aws-amplify'

const conf = {
    s3: {
        REGION: process.env.AWS_S3_UPLOADS_BUCKET_REGION,
        BUCKET: process.env.AWS_S3_UPLOADS_BUCKET_NAME
    },
    cognito: {
        REGION: process.env.AWS_COGNITO_REGION,
        USER_POOL_ID: process.env.AWS_COGNITO_USER_POOL_ID,
        USER_POOL_APP_CLIENT_ID: process.env.AWS_COGNITO_USER_POOL_APP_CLIENT_ID,
        IDENTITY_POOL_ID: process.env.AWS_COGNITO_IDENTITY_POOL_ID
    }
}

amplify.configure({
    Auth: conf.auth,
    Storage: {
        ...conf.storage,
        level: 'private'
    }
})

class Aws {
    async loadFiles() {
        const objs = await amplify.Storage.list('', { level: 'private' })
        return objs.map((file) => {
            return file.key
        }).filter((path) => {
            return path !== ''
        })
    }

    async getSharableLink(fileObject) {
        return amplify.Storage.get(fileObject)
    }

    async getPresentableFile(fileObject) {
        // kra
    }

    isConnected() {
        let oauthAccount = {}
        let storeObject = window.localStorage.getItem('oauthAws')
        if (storeObject !== null && storeObject !== undefined) {
            oauthAccount = JSON.parse(storeObject)
            if (oauthAccount) {
                // check for expirations
                return true
            }
        }
        return false
    }

    async connect(url) {
        /*
        const username = 'testUser'
        const password = 'password'
        return amplify.Auth.signIn(username, password)
        */
        // Authenticator
        /*
        let { idToken, accessToken, refreshToken, user } = somewhere();
        Auth.setCognitoSession({
            idToken,
            accessToken,
            refreshToken,
            user
        }).then(user => {
            console.log(user); // The Cognito user object
        });
        */
        const windowObjectReference = window.open( // eslint-disable-line
            '/aws',
            'Connect to Aws',
            'resizable,scrollbars,status,width=400,height=500'
        )
        return windowObjectReference
    }

    updateConnected(state) {
        // kra
    }

    disconnect() {
        delete window.localStorage.removeItem('oauthAws')
    }
}

export default Aws
