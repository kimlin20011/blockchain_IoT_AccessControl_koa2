const SAG = require('../models/send_access_grant');

module.exports = {
    async send_access_grant(ctx) {
        console.log(ctx.request.ip);

        let data = ctx.request.body
        data.ip = ctx.request.ip;
        let res = {
            result:{},
        };

        //body = ip,auth_dur
        let SAG_result =  await SAG(data);
        res.result = SAG_result;
        ctx.body = res;
    },

};
