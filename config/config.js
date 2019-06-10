
//下指令編譯新合約 solcjs -o ./ --bin --abi FourPattern_Two.sol
const fs = require('fs');
var Web3 = require("web3");
var web3 = new Web3;
web3.setProvider(new Web3.providers.HttpProvider("http://localhost:8545"));
require('dotenv').config();
const MC_address = fs.readFileSync('./MC_address.txt').toString();


//讀進合約abi,bytecode
const B_OAuth_Abi = JSON.parse(fs.readFileSync('./migrate/B_OAuth_sol_B_OAuth.abi').toString());
const B_OAuth_Bytecode = '0x' + fs.readFileSync('./migrate/B_OAuth_sol_B_OAuth.bin').toString();

module.exports ={
    port: 3001,
    B_OAuth: {
        abi: B_OAuth_Abi,
        bytecode: B_OAuth_Bytecode,
        //address:process.env.MC_address
    },
    geth: {
        //account: nowAccount,
        //暫時不用
        account:'0x8424dfd424a731ebefc1dbba373dc678430acf0b',
        password: process.env.password
    }
};
