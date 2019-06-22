const SAG = require('../models/send_access_grant');
const iot_sub_token = require('../models/iot_sub_token');
const machineIP = require('../models/machineIP');

module.exports = {
    async send_access_grant(ctx) {

        let data = ctx.request.body;

        data.ip = await machineIP(data);
/*        if(ctx.request.ip === `::1`){
            data.ip = `127.0.0.1`;
        }else{
            let ip = ctx.request.ip.split(':');
            data.ip = ip[3];
            console.log(`ip receive by SAG ${ctx.request.ip}`);
            console.log(`ip split ${ip[3]}`);
        }*/


/*        let ip_details = req.socket.address();
        console.log(ip_details);
        // { address: '::ffff:127.0.0.1', family: 'IPv6', port: 3001 */
        let res = {
            result:{},
        };

        //body = ip,auth_dur
        let SAG_result =  await SAG(data);
        res.result = SAG_result;
        ctx.body = res;
    },
    async iot_sub_token(ctx) {
        let iot_sub_token_result =  await iot_sub_token();
        ctx.body = iot_sub_token_result;
    }

};
