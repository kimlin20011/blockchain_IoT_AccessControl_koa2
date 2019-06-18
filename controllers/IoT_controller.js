const addUser = require('../models/addUser');

module.exports = {
    async addUser(ctx) {
         let data = ctx.request.body;
        let res = {};

        let addUser_result =  await addUser(data);
        res.result = addUser_result;
        ctx.body = res;
    },
}
