const router = require('koa-router')();
const offchain = require('../controllers/offchain');

module.exports = router
    .post('/SAG', offchain.send_access_grant);
