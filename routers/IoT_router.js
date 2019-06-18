const router = require('koa-router')();
const IoT = require('../controllers/IoT_controller');

module.exports = router
    .post(`/addUser`,IoT.addUser);
