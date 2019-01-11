// import azure from 'azure-storage'
import queryString from 'query-string'
// import {
//     storageAccount,
//     accessKey
// } from '../../config/cloudStorage'

class Azure {
    /*
    constructor() {

    }
    */
    loadFiles() {
        /* Get list of blobs in cloud storage if cloud access is defined in the config file */
        /*
        return (dispatch, getState) => {
            const state = getState()

            if (state.oauthAccounts.azure !== undefined) {
                const tokenCredential = new azure.TokenCredential(state.oauthAccounts.azure.access_token)
                const blobService = azure.createBlobServiceWithTokenCredential(`https://${storageAccount}.blob.core.windows.net`, tokenCredential)
                try {
                    blobService.listContainersSegmented(null, async function(error, results) {
                        if (error) {
                            Logger.error('Error listing containers', error)
                            dispatch({
                                type: 'CLOUD_ERROR',
                                error: `Error listing containers: ${error.message}`
                            })
                        } else {
                            const cloudBlobs = []
                            for (const con of results.entries) {
                                const files = await getContainerFiles(con.name)
                                for (const file of files) {
                                    cloudBlobs.push({
                                        container: con.name,
                                        blobName: file.name
                                    })
                                }
                            }
                            Logger.log('Blobs from azure storage: ', cloudBlobs)
                            dispatch({
                                type: 'CLOUD_BLOBS',
                                blobs: cloudBlobs
                            })
                        }
                    })
                } catch (error) {
                    dispatch({
                        type: 'CLOUD_ERROR',
                        error: `Error: ${error.message}`
                    })
                }
            }
        }
        */
    }
    getSharableLink(fileObject) {
        // generate sharable link from object
        /*
        const selectionWithData = []
        for (const e of this.state.selection) {
            selectionWithData.push(this.props.blobs[e])
        }
        const blobService = azure.createBlobService(storageAccount, accessKey)
        const timeout = (new Date().getTime()) + 3600 * 24 * 30 // 12 hours
        const sharedAccessPolicy = {
            AccessPolicy: {
                Permissions: azure.BlobUtilities.SharedAccessPermissions.READ,
                Expiry: timeout
            }
        }
        const firstBlob = selectionWithData[0]
        const token = blobService.generateSharedAccessSignature(firstBlob.container, firstBlob.blobName, sharedAccessPolicy)
        const sasUrl = blobService.getUrl(firstBlob.container, firstBlob.blobName, token)
        this.props.linkSetter(sasUrl)
        this.props.handleCloseModal()
        */
    }
    getPresentableFile(fileObject) {
        // parse fileObject to presentable string
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
        /*
        return new Promise((resolve, reject) => {
            const blobservice = azure.createBlobService(storageAccount, accessKey)
            blobservice.listBlobsSegmented(container, null, (error, result) => {
                if (!error) {
                    resolve(result.entries)
                } else {
                    reject(error.message)
                }
            })
        })
        */
    }
}

export default Azure
