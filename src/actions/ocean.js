import { Ocean } from '@oceanprotocol/squid'

import {
    nodeScheme,
    nodeHost,
    nodePort,
    aquariusScheme,
    aquariusHost,
    aquariusPort,
    brizoScheme,
    brizoHost,
    brizoPort,
    brizoAddress,
    parityScheme,
    parityHost,
    parityPort,
    secretStoreScheme,
    secretStoreHost,
    secretStorePort,
    verboseLogging
} from '../../config/ocean'

export async function provideOcean() {
    const nodeUri = `${nodeScheme}://${nodeHost}:${nodePort}`
    const aquariusUri = `${aquariusScheme}://${aquariusHost}:${aquariusPort}`
    const brizoUri = `${brizoScheme}://${brizoHost}:${brizoPort}`
    const parityUri = `${parityScheme}://${parityHost}:${parityPort}`
    const secretStoreUri = `${secretStoreScheme}://${secretStoreHost}:${secretStorePort}`

    const config = {
        nodeUri,
        aquariusUri,
        brizoUri,
        brizoAddress,
        parityUri,
        secretStoreUri,
        verbose: verboseLogging
    }

    const ocean = await Ocean.getInstance(config)

    return { ocean }
}
