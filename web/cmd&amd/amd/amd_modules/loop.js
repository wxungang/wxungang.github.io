/**
 * Created by xiaogang on 2017/5/15.
 */
"use strict";
define('loop', ['./loop_a', './loop_b'], function (loop_a, loop_b) {
    console.log("loop");
    return {
        a: loop_a,
        func: loop_b
    };
});