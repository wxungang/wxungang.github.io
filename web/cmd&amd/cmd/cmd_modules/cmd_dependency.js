/**
 * Created by xiaogang on 2017/5/15.
 */


"use strict";

//依赖就近，需要加载依赖项时加载并执行。
define(function (require, exports, module) {
    var pairs = require('./cmd_simple_pairs');
    console.log(new Date().getTime());
    console.log(pairs);
    if (pairs.flag) {
        var func = require('./cmd_function');
        console.log(func);
        var zepto = require('./../../base/require.js');
    }
    console.log(new Date().getTime());
    console.log(2);

    // 一个对象[推荐写法]
    module.exports = {simple: pairs};
    //等同于
    //return {simple: pairs};

    //也可以导出多个对象
    // exports.a = {
    //     simple: pairs
    // };
    // exports.b = {
    //     simple: pairs
    // };
});
