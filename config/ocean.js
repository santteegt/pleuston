module.exports = {
    // -----
    // Setup with local services
    // -----
    nodeScheme: 'http',
    nodeHost: 'keeper-node',
    nodePort: 8545,

    aquariusScheme: 'http',
    aquariusHost: 'aquarius',
    aquariusPort: 5000,

    brizoScheme: 'http',
    brizoHost: 'brizo',
    brizoPort: 8030,

    parityScheme: 'http',
    parityHost: 'localhost',
    parityPort: 8545,

    secretStoreScheme: 'http',
    secretStoreHost: 'localhost',
    secretStorePort: 12001,

    secretStoreThreshold: 0,
    secretStorePassword: 'node0',
    secretStoreAddress: '0x00bd138abd70e2f00903268f3db08f2d25677c9e',

    verboseLogging: true
}
