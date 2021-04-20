/**
 * Created by xiaogang on 2017/5/16.
 */
"use strict";

// amd 中 使用依赖就近原则时，也会依赖前置并执行
define(function (require, exports, module) {
    var pairs = require('./amd_simple_pairs');
    console.log(pairs);
    if (pairs.flag) {
        //依赖会前置并执行
        var func = require('./amd_function');
        console.log(func);
    }

    exports.lazy = {
        simple: pairs,
        func: func
    }
});