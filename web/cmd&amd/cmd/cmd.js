/**
 * Created by xiaogang on 2017/5/16.
 */
"use strict";
//相对于 paths 中的路径配置
//    seajs.use(['modules/cmd_simple_pairs'], function (cmd) {
//        console.log(cmd);
//    });

//相对于html 文件引用【不会重复引用】
//    seajs.use(['./cmd_modules/cmd_simple_pairs'], function (cmd) {
//        console.log(cmd);
//    });

//    seajs.use(['modules/cmd_function'], function (cmd) {
//        console.log(cmd);
//    });
console.log(new Date().getTime());
seajs.use(['modules/cmd_dependency'], function (cmd) {
    console.log(new Date().getTime());
    console.log(cmd);
});