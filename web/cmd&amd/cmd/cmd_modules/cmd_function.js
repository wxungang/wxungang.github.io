/**
 * Created by xiaogang on 2017/5/12.
 */
"use strict";


define(function (require, exports, module) {
    console.log("Simple function");
    //do something what you want
    return {
        name: 'Simple function',
        other: {
            dependencies: 'none'
        },
        func: function (args) {
            return args;
        }
    }
});