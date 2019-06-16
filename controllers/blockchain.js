const authentication_req = require('../models/authentication_req');
const deploy = require('../models/deploy');

module.exports = {

    async deploy_contract(ctx) {
       // let formData = ctx.request.body
        let res = {
            result:{},
        };

        let deploy_result =  await deploy();
        res.result = deploy_result;

        ctx.body = res;
    },
    async auth_req(ctx) {
        // let formData = ctx.request.body
        let res = {};

        let auth_req_result =  await authentication_req();
        res = auth_req_result;
        //重新定向
        // 308 is post
        console.log(`redirecting`);
        ctx.status = 308;
        ctx.redirect('/offchain/SAG');
        //回傳
        ctx.body = res;
    },
};
