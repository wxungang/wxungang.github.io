/**
 * Created by xiaogang on 2017/6/8.
 */
"use strict";


function workerConstract(params) {
    //参数预处理
    let errorCallback = (params && params.errorCallback)||function (data) {
            console.log(data);
        };
    //通用回调函数处理
    let defaultCb = params.Cb || function (data, code, msg) {
            console.log("--------------defaultCb-----------------------");
            console.log(data);
        };

    let _url = (params && params.url) || params;

    //数据
    let _this = this;
    let callbacks = {};
    let worker = new Worker(_url);


    worker.onmessage = function (e) {
        let params = e.data;
        let task = (params && params.task) || params;
        //回调 处理task 结果
        if (callbacks[task].callback) {
            callbacks[task].callback.call(_this, params.data, params.code, params.msg);
        } else {
            defaultCb(params);
        }
    }

    worker.onerror = function (e) {
        errorCallback(e)
    }

    //
    this.task = function (params) {
        this.addTask(params);
        worker.postMessage({
            func: params.task,
            data: params.data
        });
    }

    this.postMessage = function (vMsg) {
        //I just think there is no need to use call() method
        //how about just worker.postMessage(vMsg);
        //the same situation with terminate
        //well,just a little faster,no search up the prototye chain


        //Worker.prototype.postMessage.call(worker, vMsg);
    };
    this.terminate = function () {
        Worker.prototype.terminate.call(worker);
    };

    this.addTask = function (params, key) {
        key = key || params.task;
        callbacks[key] = Object.assign(callbacks[key] || {}, params);
    };
    this.removeTask = function (params) {
        let key = (params && params.task) || params;
        delete callbacks[key];
    };
}