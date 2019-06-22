'use strict';


let whoami = $('#whoami');
let whoamiButton = $('#whoamiButton');
let addUser = $('#addUser');
let addUserButton = $('#addUserButton');

let IOTSyncButton = $('#IOTSyncButton');

let logger = $('#logger');
let nowAccount = "";


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
addUserButton.on('click', function () {
    waitTransactionStatus();
    console.log(`addUser ${addUser.val()}`);
    $.post('/IoT/addUser', {
        //address: B_OAuthAddress,
        account: nowAccount,
        addUserAccount:addUser.val(),
    }, function (result) {
        log({
            address: nowAccount,
            result : result,
        });
    doneTransactionStatus();
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

$(function() {
    $("#IOTSyncButton").mouseover(function () {
        $("#IOTSyncButton").attr('style', 'background-color: #ff9036' );
    });
    $("#IOTSyncButton").mouseout(function () {
        $("#IOTSyncButton").attr('style', 'background-color: #c72c41' );
    });
});

$(function() {
    $("#whoamiButton").mouseover(function () {
        $("#whoamiButton").attr('style', 'background-color: #ff9036' );
    });
    $("#whoamiButton").mouseout(function () {
        $("#whoamiButton").attr('style', 'background-color: #c72c41' );
    });
});

$(function() {
    $("#addUserButton").mouseover(function () {
        $("#addUserButton").attr('style', 'background-color: #ff9036' );
    });
    $("#addUserButton").mouseout(function () {
        $("#addUserButton").attr('style', 'background-color: #c72c41' );
    });
});
