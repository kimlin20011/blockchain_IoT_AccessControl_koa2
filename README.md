# blockchain_IoT_AccessControl_koa2（高等軟體設計期末專案）

* [user端專案網址](https://github.com/kimlin20011/blockchain_IoT_AccessControl_koa2)
* [IoT端專案網址](https://github.com/kimlin20011/koa_IoT_blockchain)
* [未來研究計劃](https://hackmd.io/@kimlin20011/SyGuXUthN)
* [KOAJS高等軟工期末專題](https://hackmd.io/@kimlin20011/rylBvlei4)

## 期末報告簡介
* 目的
爲了解決IoT安全性與存取權限之問題，本專題以區塊鏈技術來實現OAuth2第三方登入機制，使IoT裝置能夠確認與驗證使用者存取IoT服務之權限
* 問題
	* IoT近年來越來越重要，安全與認證問題將成爲重要的議題
	* 若所有IoT都需要獨立的認證，資源消耗與擴充性將會是很大的問題
	* 一般的OAuth2依賴於第三方服務，但會造成單點失敗的風險，這也威脅到其可用性。
		* 網路釣魚非常可能導致這種模式的失敗
* 實現方法
	* 與區塊鏈智能合約實現第三方驗證機制
		* 驗證權限存取者之以太坊地址，並發送token至user與IoT方，以有利驗證
		* 透過token ，duration，public_key來包裝做驗證
	* IoT透過token認證使得使用者IP能夠存取IoT服務
	* (前面能不能加服務注冊-Edge如何安全存取IoT)
	* 若驗證成功，則發whisper的publice key給user已建立裝置之間的通訊
	
## 使用説明
* 使用 http://localhost:3001/index.html 開啓前端界面，操作api
* 使用 http://localhost:3001/IoT_owner.html 開啓IoT端操作界面

* **部署合約** : 要先確認已經部署B_OAuth至contract
	* 使用deploy之api
* **注冊IoT使用者：** 需要確認以太坊公鑰已經在智能合約上面注冊
	* 若尚未注冊，則使用addParticipant()合約API透過 contract owner發出交易注冊
	* 使用addUser之API/或者使用IoT端之操作界面

# Figure

## 區塊鏈第三方驗證之動態循序圖
![](https://i.imgur.com/oaKvofk.jpg)

* **向智能合約發送權限認證API** : ==透過USER端發出auth_req API==  (localhost:3001/blockchain/auth_req)向智能合約求取IoT存取權限之token
	* 成功的話會重新將token&sender address儲存與本地端，并且重新導向/offchain/SAG 之地址，IoT也會同時訂閲到同一份
	* 失敗的話則丟出error結束授權過程
* **將token簽章送至IoT端認證**: User端透過user的私鑰將（token,duration,要存取的IP位址）簽章之後，包含duration送至IoT端認證
	* IoT透過簽章與自身的所儲存的DATA(token&sender address)使用ecrecover還原簽章之address，一方面確認簽章者身份為智能合約之授權方，一方面確認user所擁有的token是正確的
* **IoT發送核准認證**，並核發Refresh token(下次使用者存取IoT資料是不必再透過區塊鏈求取access token)

## user後端-Koa2之應用架構
![](https://i.imgur.com/00HN098.jpg)

* app.js為後端入口文件
* app.js使用Koa2 middleware來處理http request，並以aspect核心邏輯來應用所有middleware
* 在此系統中，app.js包含4個子middleware

## 專案之文件目錄圖

![](https://i.imgur.com/75MAoGp.png)



## 系統部署圖
![](https://i.imgur.com/idydeyU.jpg)
* 使用者節點
	* 部署區塊鏈客戶端(geth)全節點，可參與區塊鏈驗證
	* 安裝有web3後端，透過該後端向區塊鏈智能合約發出鏈上之權限驗證
* IoT節點
	* 部署區塊鏈客戶端(geth)輕節點，可訂閲智能合約所發出之Event
	* koa後端-可以透過Web3與區塊鏈溝通，並授權User IoT服務存取之權限
* Blockchain Server
	* 去中心化區塊鏈節點，處理智能合約等運算
	* 處理區塊鏈交易驗證等等...
* 傳輸方法
	* 區塊鏈節點之間透過devp2p傳輸。
	* 裝置之間透過Http協定傳輸。

## User端Dapp之Class diagram

![](https://i.imgur.com/livNVrJ.jpg)

* MVC架構
* 在此專案中statics資料夾代表view
* http經過router之後，透過controller，引用適當的module處理

# API
## User端API

### deploy contract
* 簡介：部署權限驗證合約至區塊鏈
#### api
>HTTP Method: post  
>URL:http://localhost:3001/blockchain/deploy      


### auth_req
* 簡介：向智能合約發送權限認證API
#### api
>HTTP Method: post  
>URL:http://localhost:3001/blockchain/auth_req      
>Body(x-www-form-urlencoded):    
>>account: string (發出交易之賬號,透過此賬號求取智能合約權限)
>>auth_dur: int （預計存取時間） 



### send access grant
* 簡介：**將token簽章送至IoT端認證**: User端透過user的私鑰將（token,duration,要存取的IP位址）簽章之後，包含duration送至IoT端認證
	* IoT透過簽章與自身的所儲存的DATA(token&sender address)使用ecrecover還原簽章之address，一方面確認簽章者身份為智能合約之授權方，一方面確認user所擁有的token是正確的
#### api
>HTTP Method: post  
>URL:http://localhost:3001/IoT/SAG      
>Body(x-www-form-urlencoded):    
>>account: string (發出交易之賬號,透過此賬號求取智能合約權限)
>>auth_dur: int （預計存取時間） 



## IoT Device端 API
### token_subscribe
* 簡介：訂閲區塊鏈發出的token
#### api
>HTTP Method: GET  

>URL:http://localhost:3002/IoT/subscribe_token      

>Body(x-www-form-urlencoded):    
  
  
### access_grant
* 簡介：接收到user所發出的access grant請求後，比對智能合約的token資料
#### api
>HTTP Method: POST  

>URL:http://localhost:3002/IoT/access_grant      

>Body(x-www-form-urlencoded):    
  
>>signed_msg: string（whisperPK）  
>>access_token: string   
>>sender_address: string
>>auth_dur: int  
>> sender_ip:string

# Install
## 專案安裝步驟（installation）
* 下載專案
```shell=
git clone https://github.com/kimlin20011/blockchain_IoT_AccessControl_koa2.git
```
* install package
```shell=
npm install
```

* 安裝私有連(見下一節)
	* 或單元測試區塊鏈 ganache-cli（選擇性，或是直接假設以太坊私有鏈，需要至少2組賬號）
	* 若使用ganachi至`./config/config.js` 將　`gethWebsocketUrl:ws://localhost:8546`,  8546部分改爲8545
	
```shell=
npm install -g ganache-cli
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

* 使用 http://localhost:3001/index.html 開啓前端界面，操作api

* 以同樣方式安裝 IoT端後端
	* [IoT端專案網址](https://github.com/kimlin20011/koa_IoT_blockchain)



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

# 參考資料
[IOT Access control and Authentication Management via blockchain/June 2018](https://hackmd.io/EZkqQfgFT4mAAqGcwCMc-w)
###### tags: `koajs`