module.exports = {
    // -----
    // Setup with local services
    // -----
    nodeUri: process.env.NODE_URI || 'http://localhost:8545',
    aquariusUri: process.env.AQUARIUS_URI || 'http://localhost:5000',
    brizoUri: process.env.BRIZO_URI || 'http://localhost:8030',
    brizoAddress:
        process.env.BRIZO_ADDRESS ||
        '0x00bd138abd70e2f00903268f3db08f2d25677c9e',
    secretStoreUri: process.env.SECRETSTORE_URI || 'http://localhost:12001',

    verboseLogging: true
}
