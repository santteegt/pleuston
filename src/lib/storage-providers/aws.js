import amplify from 'aws-amplify'
import { Logger } from '@oceanprotocol/squid'
import { aws } from '../../../config/cloudStorage'

amplify.configure(aws)
// hack for getting bucket
const storageOptions = {
    bucket: aws.Storage.bucket,
    customPrefix: {
        public: ''
    },
    level: 'public'
}

class Aws {
    async loadFiles() {
        return amplify.Storage.list('', storageOptions)
    }

    async getSharableLink(fileObject) {
        return amplify.Storage.get(fileObject)
    }

    getPresentableFile(fileObject) {
        return fileObject.key
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
