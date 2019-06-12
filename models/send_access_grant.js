const fs = require('fs');
const config = require('../config/config');
let gethWebsocketUrl = config.geth.gethWebsocketUrl;
const Web3 = require('web3');
// use the given Provider, e.g in Mist, or instantiate a new websocket provider
const web3 = new Web3(Web3.givenProvider || gethWebsocketUrl);


module.exports = async function addStatus(info) {
    //講access grantcode内文包在message中
    let message ={};
    message.ip=info.ip;
    message.accessToken= fs.readFileSync('./accessToken.txt').toString();
    //message.accessToken= "123";
    message.auth_dur=info.auth_dur;

    let data = JSON.stringify(message);
    console.log(`message:${data}`);
    let password = config.geth.password;

    let nowAccount ="";
    await web3.eth.getAccounts((err, res) => {
        nowAccount = res[0];
        console.log(`nowAccount:${nowAccount}`)
    });
    let signed_message = "";

    //   web3.eth.accounts.sign(data, '0x4c0883a69102937d6231471b5dbb6204fe5129617082792ae468d01a3f362318');
    //將message簽名
    await web3.eth.personal.sign(data, nowAccount, password)
        .then((result) => {
            signed_message = result;
            //console.log(`signed_message:${signed_message}`)
        });

    return signed_message;

};
