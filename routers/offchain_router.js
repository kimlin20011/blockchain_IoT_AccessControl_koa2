const router = require('koa-router')();
const offchain = require('../controllers/offchain');

module.exports = router
    .get(`/syncIoTDevice`,offchain.iot_sub_token)
    .post('/SAG', offchain.send_access_grant);
