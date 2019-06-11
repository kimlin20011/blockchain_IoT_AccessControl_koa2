/**
 * 整合所有子路由
 */

const router = require('koa-router')();

const blockchain = require('./blockchain');


//router.use('/', home.routes(), home.allowedMethods())
router.use('/blockchain', blockchain.routes(), blockchain.allowedMethods());


module.exports = router;
