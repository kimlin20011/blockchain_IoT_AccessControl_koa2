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

let logger = $('#logger');
let nowAccount = "";

// IOT button
let updateIoTDataButton = $('#updateIoTDataButton');

//let IoTLogined = false;
// used mapping
let IoTLoginedMap = new Map();

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
    islogined();
    log(nowAccount, '目前選擇的以太帳戶')
});

// 載入使用者至 select tag
$.get('/blockchain/accounts', function (accounts) {
    for (let account of accounts) {
        whoami.append(`<option value="${account}">${account}</option>`)
    }
    nowAccount = whoami.val();
    islogined();
    log(nowAccount, '目前選擇的以太帳戶')
});

//按下B_OAuth登入之按鈕時
B_OAuth_login_Button.on('click', function () {
    waitTransactionStatus();
    islogined();

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
                //IoTLogined =true ;
                //set mapping value
                IoTLoginedMap.set(nowAccount, `succeeded`);
                $('#loginStatus').html(`登入狀態: ${nowAccount}<b style="color: mediumblue"><br>登入成功 ${IoTLoginedMap.get(nowAccount)}</b>`);
                islogined();
                doneTransactionStatus();
			}else{
                log('登入狀態:登入失敗');
                //IoTLogined = false;
                IoTLoginedMap.set(nowAccount, `failed`);
                $('#loginStatus').html(`登入狀態: ${nowAccount}<b style="color: red"><br>登入失敗 ${IoTLoginedMap.get(nowAccount)}</b>`);
                islogined();
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


updateIoTDataButton.on('click', function () {
    if (IoTLoginedMap.get(nowAccount) === `succeeded`){
        log(`更新device資料`);
        $('#isGranted').html(`1. 登入狀態: ${nowAccount}<b style="color: green"><br>您已登入，可開始操作device</b>`);
        $('#tempData').text(`現在氣溫: ${1+Math.floor(Math.random()*50)}`);
        $('#gpsData').text(`現在濕度: ${1+Math.floor(Math.random()*50)}`);
    }else{
        log(`您尚未登入，請先從上方登入`);
        $('#isGranted').html(`1. 登入狀態: ${nowAccount}<b style="color: red"><br>您尚未登入，請先從上方登入</b>`);
    }
});


function islogined() {
    if (IoTLoginedMap.get(nowAccount) === `succeeded`){
        $('#isGranted').html(`1. 登入狀態: ${nowAccount}<b style="color: green"><br>您已登入，可開始操作device</b>`);
        $('#loginStatus').html(`登入狀態: ${nowAccount}<b style="color: mediumblue"><br>登入成功 </b>`);
    }else{
        $('#isGranted').html(`1. 登入狀態: ${nowAccount}<b style="color: red"><br>您尚未登入，請先從上方登入</b>`);
        $('#loginStatus').html(`登入狀態: ${nowAccount}<b style="color: red"><br>尚未登入 </b>`);
    }
}

function waitTransactionStatus() {
	$('#accountStatus').html('帳戶狀態 <b style="color: blue">(等待區塊鏈交易驗證中...)</b>')
}

function doneTransactionStatus() {
	$('#accountStatus').text('帳戶狀態')
}


// mouseover
$(function() {
    $("#IOTSyncButton").mouseover(function () {
    $("#IOTSyncButton").attr('style', 'background-color: #608de2' );
     });
    $("#IOTSyncButton").mouseout(function () {
    $("#IOTSyncButton").attr('style', 'background-color: #4364a1' );
        });
});

$(function() {
    $("#whoamiButton").mouseover(function () {
    $("#whoamiButton").attr('style', 'background-color: #608de2' );
        });
    $("#whoamiButton").mouseout(function () {
    $("#whoamiButton").attr('style', 'background-color: #4364a1' );
        });
});

$(function() {
    $("#B_OAuth_login_Button").mouseover(function () {
    $("#B_OAuth_login_Button").attr('style', 'background-color: #608de2' );
        });
    $("#B_OAuth_login_Button").mouseout(function () {
    $("#B_OAuth_login_Button").attr('style', 'background-color: #4364a1' );
        });
});

$(function() {
    $("#updateIoTDataButton").mouseover(function () {
    $("#updateIoTDataButton").attr('style', 'background-color: #608de2' );
        });
    $("#updateIoTDataButton").mouseout(function () {
    $("#updateIoTDataButton").attr('style', 'background-color: #4364a1' );
        });
});
