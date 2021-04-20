/**
 * Created by xiaogang on 2017/5/12.
 */
"use strict";

//If the module has dependencies, the first argument should be an array of dependency names,
// and the second argument should be a definition function.
// The function will be called to define the module once all dependencies have loaded.
// The function should return an object that defines the module.
// The dependencies will be passed to the definition function as function arguments, listed in&of the same order as the order in&of the dependency array:

//依赖前置，优先加载依赖项并执行。然后执行本模块代码
define(['./amd_function', './amd_modules/amd_simple_pairs.js'], function (func, simple) {
    console.log('amd_dependency');
    console.log(simple.name);
    return func.func;
});
