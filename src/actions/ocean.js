import { Ocean } from '@oceanprotocol/squid'

import {
    keeperNodeUri,
    aquariusUri,
    brizoUri,
    brizoAddress,
    secretStoreUri,
    verboseLogging
} from '../config/ocean'

export async function provideOcean() {
    const config = {
        keeperNodeUri,
        aquariusUri,
        brizoUri,
        brizoAddress,
        parityUri: keeperNodeUri,
        secretStoreUri,
        verbose: verboseLogging
    }

    const ocean = await Ocean.getInstance(config)

    return { ocean }
}
