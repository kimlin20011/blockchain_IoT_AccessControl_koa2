"use strict";
//var net = require('net');
const fs = require('fs');

const Web3 = require('web3');
// use the given Provider, e.g in Mist, or instantiate a new websocket provider
const web3 = new Web3(Web3.givenProvider || 'ws://localhost:8545');

const config = require('../config/config');
const unlockAccount = require('./unlock');

module.exports = async function deploy_contract() {
    let B_OAuthAbi = config.B_OAuth.abi;
//取得目前geth中第一個account
    let nowAccount ="";
    await web3.eth.getAccounts((err, res) => {
        nowAccount = res[0];
        console.log(`nowAccount:${nowAccount}`)
    });

    let password = config.geth.password;
    let B_OAuth = new web3.eth.Contract(B_OAuthAbi);
    B_OAuth.options.address = await fs.readFileSync('./B_OAuth_address.txt').toString();
    console.log(`address: ${B_OAuth.options.address}`)
    // 解鎖
    let unlock = await unlockAccount(nowAccount,password);
    if (!unlock) {
        console.log(`not unlock`);
        return;
    }

    return new Promise((resolve, reject) => {

        let result ={}
        B_OAuth.methods
            .authentication_req()
            .send({
                from: nowAccount,
                gas: 3000000
            })
            .on("receipt", function(receipt) {
                result.receipt= receipt;
                console.log(receipt);//多加
                //取得adc回傳的event
                //回傳值*/
                resolve(receipt);
            })
            .on("error", function(error) {
                result.status = `智能合約操作失敗`;
                result.error= error.toString();
                console.log(result);
                reject(result);
            });
    });

};
