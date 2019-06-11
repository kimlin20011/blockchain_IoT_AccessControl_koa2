const router = require('koa-router')();
const blockchain = require('../controllers/blockchain');

module.exports = router
    //.get('/', blockchain)
    .post('/auth_req', blockchain.auth_req)
    .post('/deploy', blockchain.deploy_contract);
