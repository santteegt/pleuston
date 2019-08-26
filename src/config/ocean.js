module.exports = {
    // -----
    // Setup with local services
    // -----
    keeperNodeUri:
        process.env.REACT_APP_KEEPER_NODE_URI || 'http://localhost:8545',
    aquariusUri: process.env.REACT_APP_AQUARIUS_URI || 'http://localhost:5000',
    brizoUri: process.env.REACT_APP_BRIZO_URI || 'http://localhost:8030',
    brizoAddress:
        process.env.REACT_APP_BRIZO_ADDRESS ||
        '0x00bd138abd70e2f00903268f3db08f2d25677c9e',
    secretStoreUri:
        process.env.REACT_APP_SECRETSTORE_URI || 'http://localhost:12001',

    verboseLogging: true
}
