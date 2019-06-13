# blockchain_IoT_AccessControl_koa2  

## 區塊鏈第三方驗證之動態循序圖
![](https://i.imgur.com/nhKyA9R.jpg)

## 專案下載
* 下載專案
```shell=
git clone https://github.com/kimlin20011/blockchain_IoT_AccessControl_koa2.git
```
* install package
```shell=
npm install
```

* 需要新增`.env`檔
```javascript=
HOST = 'localhost'
password = '自行修改geth的設定密碼'
```

* start project
```shell=
npm start
```
* 安裝單元測試區塊鏈 ganache-cli（選擇性，或是直接假設以太坊私有鏈，需要至少2組賬號）
```shell=
npm install -g ganache-cli
```



## 區塊鏈安裝  
### 安裝go(注意go 版本要在1.8以上)
```shell=
$ wget https://dl.google.com/go/go1.10.1.linux-armv6l.tar.gz

$ sudo tar -C /usr/local -xzf go1.10.1.linux-armv6l.tar.gz

$ export PATH=$PATH:/usr/local/go/bin
```


### 安裝geth

```shell=
$ mkdir src

$ cd src

$ sudo apt-get install -y git build-essential libgmp3-dev golang

$ git clone -b release/1.8 https://github.com/ethereum/go-ethereum.git

$ cd go-ethereum

$ make

$ sudo cp build/bin/geth /usr/local/bin/

```


## 安裝私有鏈

先在一個empty 的資料夾建立一個genesis.json

* 範例碼
```json=
{
  "config": {
    "chainId": 33,
    "homesteadBlock": 0,
    "eip155Block": 0,
    "eip158Block": 0,
    "ByzantiumBlock": 0 
  },
  "nonce": "0x0000000000000033",
  "timestamp": "0x0",
  "parentHash": "0x0000000000000000000000000000000000000000000000000000000000000000",
  "gasLimit": "0x8000000",
  "difficulty": "0x1",
  "mixhash": "0x0000000000000000000000000000000000000000000000000000000000000000",
  "coinbase": "0x3333333333333333333333333333333333333333",
  "alloc": {}
}
```


* initialize -讀取genesis.json並初始化私有鏈鎖
```shell=
geth --datadir ./data/ init genesis.json
```

* 開啓geth with web socket

```
geth --datadir data --networkid 33 --ws --wsaddr "0.0.0.0" --wsapi "eth,web3,personal,debug,db,admin,miner,net,shh,txpool" --wsport 8546 --wsorigins "*" --rpc --shh --rpcport 8545 --rpccorsdomain "*" --rpcapi " eth,web3,personal,debug,db,admin,miner,net,shh,txpool " --nodiscover console
```