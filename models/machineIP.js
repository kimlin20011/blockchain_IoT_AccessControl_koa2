const request=require('request');

module.exports = async function machineIP() {
    return new Promise((resolve, reject) => {
        request.get({
            url:"http://localhost:3002/offchain/machineIP",
            json: true,
        }, function(err,httpResponse,body){
            if (err) {
                reject(err);
                return;
            }
            console.log(`get machine IP`);
            console.log(body);
            resolve(body);
        });
    });
}
