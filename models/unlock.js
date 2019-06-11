"use strict";

const Web3 = require('web3');
// use the given Provider, e.g in Mist, or instantiate a new websocket provider
const web3 = new Web3(Web3.givenProvider || 'ws://localhost:8545');

module.exports = async function unlockAccount(nowAccount,password) {

    console.log(`nowAccount: ${nowAccount} `);

    return web3.eth.personal
        .unlockAccount(nowAccount, password, 9999)
        .then(function(result) {
            console.log(result);
            console.log("account已解鎖");
            return true;
        })
        .catch(function(err) {
            console.log(err);
            console.log("account密碼輸入錯誤");
            return false;
        });
};
