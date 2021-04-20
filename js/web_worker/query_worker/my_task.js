/**
 * Created by xiaogang on 2017/6/8.
 */
"use strict";


//private functions
function isUndifined(data) {
    return typeof data === 'undefined'
}

function evalFunc(arr, operator) {
    return eval(arr.join(operator));
}
/**
 *  错误 回调的格式化
 * @param data
 * @param msg
 * @param code
 * @returns {{data: *, code: (*|number), msg: (*|string)}}
 */
function errorCb(data, msg, code) {
    return {
        data: isUndifined(data.data) ? data : data.data,
        code: code || data.code || 0,
        msg: msg || data.msg || "error"
    }
}
/**
 * 成功回调的格式化
 * @param data Object|string
 * @param msg string
 * @returns {{data: *, code: number, msg: (*|string)}}
 */
function successCb(data, msg) {
    return {
        data: isUndifined(data.data) ? data : data.data,
        code: 100,
        msg: msg || data.msg || "success"
    }
}

var exportFunc = {
    /**
     *
     * @param params=[]
     * @returns {Number}
     */
    add(params) {
        // console.log(this);
        // console.log(arguments);
        let sum = 0;
        if (params instanceof Array) {
            try {
                sum += eval(params.join('+'));
            } catch (e) {
                return errorCb({
                    data: 0,
                    code: 99,
                    msg: '数组元素类型错误，无法进行运算'
                })
            }
        }
        else {
            return errorCb({
                data: 0,
                code: 98,
                msg: '入参必须是数组格式'
            })
        }

        return successCb(sum);
    },
    sub(params) {
        let sum = 0;
        if (params instanceof Array) {
            try {
                sum += eval(params.join('-'));
            } catch (e) {
                return errorCb({
                    data: 0,
                    code: 99,
                    msg: '数组元素类型错误，无法进行运算'
                })
            }
        } else {
            return errorCb({
                data: 0,
                code: 98,
                msg: '入参必须是数组格式'
            })
        }

        return successCb(sum);
    },
    mutil(params){
        let sum = 0;
        if (params instanceof Array) {
            sum += eval(params.join('*'));
        }
        else {
            return errorCb({
                data: 0,
                code: 98,
                msg: '入参必须是数组格式'
            })
        }

        return successCb(sum);
    },
    divi(params){
        let sum = 0;
        if (params instanceof Array) {
            sum += eval(params.join('/'));
        }
        else {
            return errorCb({
                data: 0,
                code: 98,
                msg: '入参必须是数组格式'
            })
        }

        return successCb(sum);
    },
    defaultCb(params){
        return errorCb(params, 'no task that you call!');
    },
    errCb(e){
        return {
            data: e.stack,
            code: 0,
            msg: e.message
        };
    }
}

/**
 * 入参 格式
 * @param e
 * data:
 * {
 *      func:'funcName',
 *      data:{ }
 * }
 * {
 *      data:{ }
 * }
 *  回调 数据格式
 * postMessage:
 * {
 *      task:模块标识
 *      data:处理好的的返回数据
 *      code:处理结果标识码
 *      msg:处理结果的文字提示信息
 * }
 */
onmessage = function (e) {
    let params = e.data;
    let func = params && params.func;

    //返回处理结果
    try {
        postMessage(Object.assign({
                task: func
            },
            (exportFunc[func] ? exportFunc[func] : exportFunc["defaultCb"]).call(self, params.data)
        ));
    } catch (e) {
        //console.log(e);
        console.log("----------------error postMessage------------------");
        postMessage(Object.assign({
            task: func
        }, exportFunc["errCb"].call(self, e)));
    }

}

onerror = function (e) {
    console.log(e);
    //throw new TypeError(e);
}