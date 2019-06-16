const SAG = require('../models/send_access_grant');

module.exports = {
    async send_access_grant(ctx) {
        console.log(ctx.request.ip);
// 將ip前面表頭去掉
// let ip = req.ip.split(':').pop();
// ip = ip.replace('::ffff:', '');
        let data = ctx.request.body
        //data.ip = ctx.request.ip;
        data.ip = `::ffff:127.0.0.1`;
        let res = {
            result:{},
        };

        //body = ip,auth_dur
        let SAG_result =  await SAG(data);
        res.result = SAG_result;
        ctx.body = res;
    },

};
