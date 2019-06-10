const deploy = require('../models/deploy');


module.exports = {

    async deploy_contract(ctx) {
       // let formData = ctx.request.body
        let res = {
            result:{},
        }

        let deploy_result =  await deploy();
        res.result = deploy_result;
        ctx.body = res;
    },
}
