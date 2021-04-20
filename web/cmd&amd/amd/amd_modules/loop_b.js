/**
 * Created by xiaogang on 2017/5/15.
 */
"use strict";
define('loop_b', ['require', './loop_a'], function (require, loop_a) {
    console.log("loop b");
    //由于loop_a 依赖 loop_b，所以在cycle 依赖中，loop_a 拿不到。
    console.log(loop_a);
    return function () {
        loop_a = require('./loop_a');
        return loop_a;
    }
});