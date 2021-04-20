/**
 * Created by xiaogang on 2017/5/15.
 */
"use strict";
define('loop_a', ['require', './loop_b'], function (require, loop_b) {
    console.log("loop a");
    console.log(loop_b);
    // require(loop_b);
    return {
        name: "loop a",
        dependencies: ["loop b"]
    };
});