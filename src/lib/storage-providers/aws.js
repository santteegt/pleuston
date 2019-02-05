import amplify from 'aws-amplify'
import { Logger } from '@oceanprotocol/squid'

/*
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
*/

amplify.configure({
    // Auth: conf.auth,
    // Storage: {
    //     ...conf.storage,
    //     level: 'private'
    // },
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
        Logger.log(fileObject)
    }

    isConnected() {
        let storeObject = window.localStorage.getItem('amplify-authenticator-authState')
        if (storeObject !== null && storeObject !== undefined) {
            if (storeObject === 'signedIn') {
                // check for expirations
                return true
            }
        }
        return false
    }

    async connect(url) {
        const windowObjectReference = window.open( // eslint-disable-line
            '/aws',
            'Connect to Aws',
            'resizable,scrollbars,status,width=400,height=500'
        )
        return windowObjectReference
    }

    updateConnected(state) {
        // not needed (set by amplify)
    }

    disconnect() {
        delete window.localStorage.removeItem('amplify-authenticator-authState')
    }
}

export default Aws
