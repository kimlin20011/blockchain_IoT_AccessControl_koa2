"use strict";
//var net = require('net');
const fs = require('fs');
const config = require('../config/config');
let gethWebsocketUrl = config.geth.gethWebsocketUrl;
const Web3 = require('web3');
// use the given Provider, e.g in Mist, or instantiate a new websocket provider
const web3 = new Web3(Web3.givenProvider || gethWebsocketUrl);
const unlockAccount = require('./unlock');

module.exports = async function addUser(data) {
    let B_OAuthAbi = config.B_OAuth.abi;
//取得目前geth中第一個account
    let nowAccount =data.account;
    let addUserAccount = data.addUserAccount;
    console.log(data);

    let password = config.geth.password;
    let B_OAuth = new web3.eth.Contract(B_OAuthAbi);
    B_OAuth.options.address = await fs.readFileSync('./B_OAuth_address.txt').toString();
    console.log(`address: ${B_OAuth.options.address}`)
    // 解鎖
    let unlock = await unlockAccount(nowAccount,password);
    if (!unlock) {
        console.log(`not unlock`);
        return;
    };
    return new Promise((resolve, reject) => {
        let result ={};
        B_OAuth.methods
            .addParticipant(addUserAccount)
            .send({
                from: nowAccount,
                gas: 3000000
            })
            .on("receipt", function(receipt) {

                fs.writeFileSync('./Participant.txt', receipt.events.participantAdded.returnValues.newParticipant);
                //送出驗證求取伺服器ip授權層序
                //回傳值*/
                //resolve(receipt.events.participantAdded.returnValues.newParticipant);
                resolve(`已增加使用者${receipt.events.participantAdded.returnValues.newParticipant}`);
            })
            .on("error", function(error) {
                result.info =`智能合約AddUser操作失敗`;
                result.error= error.toString();
                result.status = false;
                console.log(result);
                reject(result);
            });
    });
};
