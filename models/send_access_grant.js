const fs = require('fs');
const config = require('../config/config');
const request=require('request');
let gethWebsocketUrl = config.geth.gethWebsocketUrl;
const Web3 = require('web3');
// use the given Provider, e.g in Mist, or instantiate a new websocket provider
const web3 = new Web3(Web3.givenProvider || gethWebsocketUrl);


module.exports = async function SAG(info) {
    //講access grantcode内文包在message中
    let message ={};
    message.ip=info.ip;
    message.accessToken= fs.readFileSync('./accessToken.txt').toString();
    //message.accessToken= "123";
    //message.auth_dur=config.auth.auth_dur;
    message.auth_dur=info.auth_dur;
    let data = JSON.stringify(message);
    console.log(`message:${data}`);
    let password = config.geth.password;

    let nowAccount = info.account;
    /*let nowAccount ="";
    await web3.eth.getAccounts((err, res) => {
        nowAccount = res[0];
        console.log(`nowAccount:${nowAccount}`)
    });*/
    let signed_message = "";

    //將message簽名
    await web3.eth.personal.sign(data, nowAccount, password)
        .then((result) => {
            signed_message = result;
            fs.writeFileSync('./signed_message.txt', signed_message);
            //console.log(`signed_message:${signed_message}`)
        });

    // send the msg to IoT
    let send_msg = {};
    send_msg.signed_message= signed_message;
    send_msg.auth_dur = message.auth_dur;


    return new Promise((resolve, reject) => {
        request.post({
            url:"http://localhost:3002/offchain/access_grant",
            body: send_msg,
            json: true,
        }, function(err,httpResponse,body){
            if (err) {
                reject(err);
                return;
            }
            console.log(`receive ip granted response`);
            console.log(body);
            resolve(body);
        });
    });

};
