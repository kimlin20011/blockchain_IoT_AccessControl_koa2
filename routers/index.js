/**
 * 整合所有子路由
 */

const router = require('koa-router')();

const blockchain = require('./blockchain');
const offchain = require('./offchain_router');


//router.use('/', home.routes(), home.allowedMethods())
router.use('/blockchain', blockchain.routes(), blockchain.allowedMethods());
router.use('/offchain', offchain.routes(), offchain.allowedMethods());


module.exports = router;
