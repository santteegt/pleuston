import {
    Ocean
} from '@oceanprotocol/squid/dist/node/squid'

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
    parityScheme,
    parityHost,
    parityPort,
    secretStoreScheme,
    secretStoreHost,
    secretStorePort,
    secretStoreThreshold,
    secretStorePassword,
    secretStoreAddress,
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
        parityUri,
        secretStoreUri,
        threshold: secretStoreThreshold,
        password: secretStorePassword,
        address: secretStoreAddress,
        verbose: verboseLogging
    }

    const ocean = Ocean.getInstance ? await Ocean.getInstance(config) : await new Ocean(config)

    return { ocean }
}
