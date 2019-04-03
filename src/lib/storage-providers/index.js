import Aws from './aws'
import Azure from './azure'

class StorageProviders {
    constructor() {
        return {
            aws: new Aws(),
            azure: new Azure()
        }
    }
}

export default StorageProviders
