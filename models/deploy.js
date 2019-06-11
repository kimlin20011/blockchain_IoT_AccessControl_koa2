"use strict";
//var net = require('net');
const fs = require('fs');

/*var Web3 = require("web3");
var web3 = new Web3;
web3.setProvider('ws://localhost:8545');*/

const Web3 = require('web3');
// use the given Provider, e.g in Mist, or instantiate a new websocket provider
const web3 = new Web3(Web3.givenProvider || 'ws://localhost:8545');

const config = require('../config/config');
const unlockAccount = require('./unlock');

module.exports = async function deploy_contract() {
    let B_OAuthBytecode = config.B_OAuth.bytecode;
    let B_OAuthAbi = config.B_OAuth.abi;
//取得目前geth中第一個account
    let nowAccount ="";
    await web3.eth.getAccounts((err, res) => {nowAccount = res[0]});

    let password = config.geth.password;
    let B_OAuth = new web3.eth.Contract(B_OAuthAbi);

    // 解鎖
    let unlock = await unlockAccount(nowAccount,password);
    if (!unlock) {
        console.log(`not unlock`)
        return;
    }

    return new Promise((resolve, reject) => {
        B_OAuth
            .deploy({
                data: B_OAuthBytecode
            })
            .send({
                from: nowAccount,
                gas: 6000000
            })
            .on('error', function(error){
                reject(`部署失敗${error}`);
            })
            .on("receipt", function(receipt) {
                console.log(receipt);
                // 更新合約介面
                let B_OAuth_Address = receipt.contractAddress;
                //將新生成的mc地址寫進.txt檔案
                fs.writeFileSync('./B_OAuth_address.txt', B_OAuth_Address);
                resolve(`合約地址:${B_OAuth_Address}`);
            })
    });

};

