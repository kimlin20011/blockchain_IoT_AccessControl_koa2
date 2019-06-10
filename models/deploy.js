"use strict";
//var net = require('net');
const fs = require('fs');
var Web3 = require("web3");
var web3 = new Web3;
//web3.setProvider("\\\\.\\pipe\\geth.ipc", net);
web3.setProvider('ws://localhost:8545');
const config = require('../../config/development_config');
const unlockAccount = require('../unlock');

module.exports = async function deploy_contract() {
    let MCBytecode = config.MC.bytecode;
    let MCAbi = config.MC.abi;
//取得目前geth中第一個account
    let nowAccount ="";
    await web3.eth.getAccounts((err, res) => {nowAccount = res[0]});
//let accounts =await web3.eth.getAccounts();
    console.log(`nowAccount:${nowAccount}`);

    let password = config.geth.password;
    let mc = new web3.eth.Contract(MCAbi);

    // 解鎖
    let unlock = await unlockAccount(nowAccount,password);
    if (!unlock) {
        return;
    }
    return new Promise((resolve, reject) => {
        // 找尋
        mc
            .deploy({
                data: MCBytecode
            })
            .send({
                from: nowAccount,
                gas: 4400000
            })
            .on('error', function(error){
                reject(`部署失敗${error}`);
            })
            .on("receipt", function(receipt) {
                console.log(receipt);
                // 更新合約介面
                let MC_Address = receipt.contractAddress;
                //將新生成的mc地址寫進.txt檔案
                fs.writeFileSync('./MC_address.txt', MC_Address);
                fs.writeFileSync('../four_pattern_fog/MC_address.txt', MC_Address);
                resolve(`合約地址:${MC_Address}`);
            })
    });

};

