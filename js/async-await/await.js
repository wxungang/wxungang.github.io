/**
 * Created by xiaogang on 2017/3/26.
 */
"use strict";
var util = window.util || {};
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


util.ajax_async = async function (params) {
    return new Promise((resolve, reject) => {
        $.ajax({
            type: params.type || "get",//默认post请求
            url: params.url,
            dataType: params.dataType || "json",//默认json返回
            contentType: "application/json",
            success: function (data) {
                if (data && data.code == 10000) {
                    setTimeout(function () {
                        //背地请求太快，设置一个延时
                        resolve(data);
                    }, 3000);
                } else {
                    reject(data || {
                            "success": false,
                            "code": 0,
                            "message": "没有返回值",
                            "result": {}
                        });
                }
            },
            error: function (xhr, errorType, error) {
                reject({
                    xhr: xhr,
                    errorType: errorType,
                    error: error
                });
            }
        });
    })

};