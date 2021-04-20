/**
 * Created by xiaogang on 2017/6/9.
 */
"use strict";

onmessage = function (e) {
    console.log(e.data);
    //do something


    //数据回传
    postMessage({
        data:e.data,
        key:'worker task'
    });
}