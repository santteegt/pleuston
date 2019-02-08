import storage from 'azure-storage'
import queryString from 'query-string'
import { azure } from '../../../config/cloudStorage'
import { Logger } from '@oceanprotocol/squid'

class Azure {
    loadFiles() {
        return new Promise((resolve, reject) => {
            const oauthObject = window.localStorage.getItem('oauthAzure')
            const accessToken = JSON.parse(oauthObject).access_token
            const tokenCredential = new storage.TokenCredential(accessToken)
            const blobService = storage.createBlobServiceWithTokenCredential(`https://${azure.storageAccount}.blob.core.windows.net`, tokenCredential)
            blobService.listContainersSegmented(null, async (error, results) => {
                if (error) {
                    Logger.error('Error listing containers', error)
                    reject(error)
                } else {
                    const cloudBlobs = []
                    for (const con of results.entries) {
                        const files = await this.getContainerFiles(con.name)
                        for (const file of files) {
                            cloudBlobs.push({
                                container: con.name,
                                blobName: file.name
                            })
                        }
                    }
                    resolve(cloudBlobs)
                }
            })
        })
    }

    async getSharableLink(fileObject) {
        const blobService = storage.createBlobService(azure.storageAccount, azure.accessKey)
        const timeout = (new Date().getTime()) + 3600 * 24 * 30 // 12 hours
        const sharedAccessPolicy = {
            AccessPolicy: {
                Permissions: storage.BlobUtilities.SharedAccessPermissions.READ,
                Expiry: timeout
            }
        }
        const token = blobService.generateSharedAccessSignature(fileObject.container, fileObject.blobName, sharedAccessPolicy)
        const sasUrl = blobService.getUrl(fileObject.container, fileObject.blobName, token)
        return sasUrl
    }

    getPresentableFile(fileObject) {
        return fileObject.container + '/' + fileObject.blobName
    }

    isConnected() {
        let oauthAccount = {}
        let storeObject = window.localStorage.getItem('oauthAzure')
        if (storeObject !== null && storeObject !== undefined) {
            oauthAccount = JSON.parse(storeObject)
            if (oauthAccount) {
                // check for expirations
                return true
            }
        }
        return false
    }

    connect(url) {
        const windowObjectReference = window.open( // eslint-disable-line
            url,
            'Connect to Azure',
            'resizable,scrollbars,status,width=400,height=500'
        )
        return windowObjectReference
    }

    updateConnected(state) {
        if (state.router.location.pathname === '/oauth/azure') {
            const query = queryString.parse(state.router.location.hash)
            const storeObject = query
            storeObject.expires_on = new Date(new Date().getTime() + parseInt(query['expires_in'])).getTime()
            window.localStorage.setItem('oauthAzure', JSON.stringify(storeObject))
        }
    }

    disconnect() {
        delete window.localStorage.removeItem('oauthAzure')
    }

    getContainerFiles(container) {
        return new Promise((resolve, reject) => {
            const blobservice = storage.createBlobService(azure.storageAccount, azure.accessKey)
            blobservice.listBlobsSegmented(container, null, (error, result) => {
                if (!error) {
                    resolve(result.entries)
                } else {
                    reject(error.message)
                }
            })
        })
    }
}

export default Azure
