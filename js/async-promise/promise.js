/**
 * Created by xiaogang on 2017/3/26.
 */
"use strict";
var util = window.util || {};
//传统做法
util.ajax = function (params) {
    var _params = {
        type: params.type || "post",//默认post请求
        url: params.url,
        dataType: params.dataType || "json",//默认json返回
        contentType: "application/json",
        data: JSON.stringify(params.data || {}),
        success: function (data) {
            if (data && data.code == 10000) {
                params.successCallback(data);
            } else {
                params.errorCallback(data || {
                        "success": false,
                        "code": 0,
                        "message": "没有返回值",
                        "result": {}
                    });
            }
        },
        error: function (xhr, errorType, error) {

            params.errorCallback({
                xhr: xhr,
                errorType: errorType,
                error: error
            });
        }

    };
    $.ajax(_params);
};

//promise
util.ajax_promise = function (params) {
    return new Promise((resolve, reject) => {
        //setTimeout 代替ajax 方法测试.
        setTimeout(function () {
            if (params) {
                resolve(params);
            } else {
                reject("error")
            }
        }, 300);
        //ajax 的 封装
        // $.ajax({
        //     success:function (data) {
        //         resolve(data);
        //     },
        //     error:function (xhr, errorType, error) {
        //         reject(xhr, errorType, error)
        //     }
        // });
    })
};

util.aysnc_func = function (params) {

    return new Promise((resolve, reject) => {
        //setTimeout 代替ajax 方法测试.
        setTimeout(function () {
            if (params.data) {
                params.callback(params.data, 1)
                resolve(params.data);
            } else {
                params.callback(params.data, 0)
                reject("error")
            }
        }, 300);
    })
};

