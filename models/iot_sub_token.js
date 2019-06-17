const request=require('request');

module.exports = async function iot_sub_token() {

    return new Promise((resolve, reject) => {
        request.get({
            url:"http://localhost:3002/blockchain/sub_token",
        }, function(err,httpResponse,body){
            if (err) {
                reject(err);
                return;
            }
            console.log(`response`);
            resolve(body);
        });
    });
};
