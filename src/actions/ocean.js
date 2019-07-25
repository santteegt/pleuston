import { Ocean } from '@oceanprotocol/squid'

import {
    nodeUri,
    aquariusUri,
    brizoUri,
    brizoAddress,
    secretStoreUri,
    verboseLogging
} from '../config/ocean'

export async function provideOcean() {
    const config = {
        nodeUri,
        aquariusUri,
        brizoUri,
        brizoAddress,
        parityUri: nodeUri,
        secretStoreUri,
        verbose: verboseLogging
    }

    const ocean = await Ocean.getInstance(config)

    return { ocean }
}
