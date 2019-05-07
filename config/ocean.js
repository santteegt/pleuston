module.exports = {
    // -----
    // Setup with local services
    // -----

    nodeScheme: 'http',
    nodeHost: 'localhost',
    nodePort: 8545,

    aquariusScheme: 'http',
    aquariusHost: 'aquarius',
    aquariusPort: 5000,

    brizoScheme: 'http',
    brizoHost: 'localhost',
    brizoPort: 8030,
    brizoAddress: '0x00bd138abd70e2f00903268f3db08f2d25677c9e',

    parityScheme: 'http',
    parityHost: 'localhost',
    parityPort: 8545,

    secretStoreScheme: 'http',
    secretStoreHost: 'localhost',
    secretStorePort: 12001,

    /*
    nodeScheme: 'https',
    nodeHost: 'nile.dev-ocean.com',
    nodePort: 443,

    aquariusScheme: 'https',
    aquariusHost: 'nginx-aquarius.dev-ocean.com',
    aquariusPort: 443,

    brizoScheme: 'https',
    brizoHost: 'nginx-brizo.dev-ocean.com',
    brizoPort: 443,
    brizoAddress: '0x413c9BA0A05B8A600899B41b0c62dd661e689354',

    parityScheme: 'https',
    parityHost: 'nile.dev-ocean.com',
    parityPort: 443,

    secretStoreScheme: 'https',
    secretStoreHost: 'secret-store.dev-ocean.com',
    secretStorePort: 443,
    */
    verboseLogging: true
}
