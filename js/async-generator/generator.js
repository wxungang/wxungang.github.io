/**
 * Created by xiaogang on 2017/3/26.
 */
"use strict";
// =================================异步封装=========================================
function* main() {
    var result = yield request("http://some.url");
    console.log(result);
}
// 异步 ajax
function request(url) {
    setTimeout(function () {
        if (url) {
            it.next(url);
        } else {
            it.next("error");
        }
    }, 1000);
}

var it = main();
it.next();

// =================================Thunk 函数=========================================
function callback(data) {
    console.log(data);
}
// 正常版本的readFile（多参数版本）
function anyscReadFile(fileName, callback) {
    setTimeout(function () {
        callback(fileName);
    }, 1104);
};

// Thunk版本的readFile（单参数版本）
var Thunk = function (fileName) {
    return function (callback) {
        return anyscReadFile(fileName, callback);
    };
};

var readFileThunk = Thunk("fileName");
readFileThunk(callback);


// ES5版本
var Thunk = function (fn) {
    return function () {
        var args = Array.prototype.slice.call(arguments);
        return function (callback) {
            args.push(callback);
            return fn.apply(this, args);
        }
    };
};
var readFileThunk = Thunk(anyscReadFile);
readFileThunk("file ES5")(callback);
// ES6版本
var Thunk = function (fn) {
    return function (...args) {
        return function (callback) {
            return fn.call(this, ...args, callback);
        }
    };
};

Thunk(anyscReadFile)("file ES6")(callback);


// =================================co 模块 ：自动执行 Generator函数=========================================
