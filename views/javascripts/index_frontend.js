'use strict';

/*let contractAddress = $('#contractAddress');
let deployedContractAddressInput = $('#deployedContractAddressInput');
let loadDeployedContractButton = $('#loadDeployedContractButton');
let deployNewContractButton = $('#deployNewContractButton');*/
let IOTSyncButton = $('#IOTSyncButton');

let whoami = $('#whoami');
let whoamiButton = $('#whoamiButton');
let authDuration = $('#authDuration');
let B_OAuth_login_Button = $('#B_OAuth_login_Button');
let updateIoTDataButton = $('#updateIoTDataButton');

let logger = $('#logger');
let nowAccount = "";

let IoTLogined = false;

function log(...inputs) {
	for (let input of inputs) {
		if (typeof input === 'object') {
			input = JSON.stringify(input, null, 2)
		}
		logger.html(input + '\n' + logger.html())
	}
}


// 當按下登入按鍵時
whoamiButton.on('click', async function () {
    nowAccount = whoami.val();
    log(nowAccount, '目前選擇的以太帳戶')
})

// 載入使用者至 select tag
$.get('/blockchain/accounts', function (accounts) {
    for (let account of accounts) {
        whoami.append(`<option value="${account}">${account}</option>`)
    }
    nowAccount = whoami.val();

    log(nowAccount, '目前選擇的以太帳戶')
})

//按下B_OAuth登入之按鈕時
B_OAuth_login_Button.on('click', function () {
  //  if (bankAddress != "") {

    waitTransactionStatus();

        $.post('/blockchain/auth_req', {
            //address: B_OAuthAddress,
            account: nowAccount,
            auth_dur:authDuration.val(),
        }, function (result) {
            log({
                address: nowAccount,
                result : result,
            });

			if(result.result.result.status === true){
                log('登入狀態:已登入');
                IoTLogined =true ;
                $('#loginStatus').html(`登入狀態: ${nowAccount }<b style="color: mediumblue">登入成功</b>`);
                doneTransactionStatus();
			}else{
                log('登入狀態:登入失敗');
                IoTLogined = false;
                $('#loginStatus').html(`登入狀態: ${nowAccount }<b style="color: red">登入失敗</b>`);
                doneTransactionStatus();
			}
        });

});


IOTSyncButton.on('click', function () {
    waitTransactionStatus();
    $.get('/offchain/syncIoTDevice', function (result) {
        log(result);
    });
    $('#IoTStatus').text(`IOT區塊鏈同步狀態：已同步`);
    doneTransactionStatus();
});

function waitTransactionStatus() {
	$('#accountStatus').html('帳戶狀態 <b style="color: blue">(等待區塊鏈交易驗證中...)</b>')
}

function doneTransactionStatus() {
	$('#accountStatus').text('帳戶狀態')
}
