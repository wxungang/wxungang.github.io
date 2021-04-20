/**
 * Created by xiaogang on 2017/6/7.
 */
"use strict";


onmessage = function (e) {
    console.log(e);
    //do something


    //数据回传
    postMessage({
        data:e.data,
        key:'worker task'
    });
}
