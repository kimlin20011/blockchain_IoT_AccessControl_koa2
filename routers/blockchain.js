const router = require('koa-router')()
const blockchain = require('../controllers/blockchain')

module.exports = router
    .get('/', blockchain)
    .post('/deploy', blockchain.deploy_contract)
