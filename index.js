var channel = require('./channel');

var nextHandlerKey = 0;
var handlers = {};

function request(argA, argB) {
    var data = {};
    var callback = argA;

    if (typeof argA === 'string' || typeof argA === 'number') {
        callback = argB;
        data.value = String(argA);
    }

    if (typeof callback === 'function') {
        data.handlerKey = nextHandlerKey++;

        handlers[data.handlerKey] = function (data) {
            callback(data.result);
        };
    }

    channel.postMessageToMain({
        type: 'REQUEST',
        data: data
    });
}

function onRequest(data) {
    var result = null;

    if (data.value != null) {
        document.title = data.value;
    } else {
        result = document.title;
    }

    if (data.handlerKey == null) {
        return;
    }

    return channel.postMessageToWorker({
        type: 'RESPONSE',
        data: {
            handlerKey: data.handlerKey,
            result: result
        }
    });
}

function onResponse(data) {
    var handler = handlers[data.handlerKey];

    if (handler != null) {
        handler(data.result);
    }

    delete handlers[data.handlerKey];
}

channel.on('REQUEST', onRequest);
channel.on('RESPONSE', onResponse);

module.exports = request;
