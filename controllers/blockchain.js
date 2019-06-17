const authentication_req = require('../models/authentication_req');
const deploy = require('../models/deploy');
const getAccounts = require('../models/getAccounts');

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
        let data = {};
        data.account = ctx.request.body.account;
        data.auth_dur = ctx.request.body.auth_dur;
        try {
            res =  await authentication_req(data);

            ///
            res.auth_dur = data.auth_dur;
            res.account = data.account;
            //res = auth_req_result;
            //重新定向
            // 308 is post
            console.log(`redirecting`);
            ctx.status = 308;
            ctx.body = res;
            ctx.redirect('/offchain/SAG');
        }catch(error) {
            ctx.body = error;
        }
    },
    async getAccounts(ctx) {
        // let formData = ctx.request.body
        let accounts =  await getAccounts();
        ctx.body = accounts;
    }
};
