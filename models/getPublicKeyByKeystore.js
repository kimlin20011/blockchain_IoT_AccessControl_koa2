var keythereum = require("keythereum");
const config = require('../config/config');
const Wallet = require('ethereumjs-wallet');

module.exports = async function getPK(info) {
    let datadir = config.geth.keystoreDir;;
    let keyObject = keythereum.importFromFile(info.address, datadir);

    let privateKey = keythereum.recover(info.password, keyObject);

    console.log(privateKey.toString('hex'));
}
