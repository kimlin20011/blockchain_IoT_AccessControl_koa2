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
        return
    },
    async auth_req(ctx) {
        // let formData = ctx.request.body
        let res = {
            result:{},
        };

        let auth_req_result =  await authentication_req();
        res.result = auth_req_result;
        ctx.body = res;
    },
};
