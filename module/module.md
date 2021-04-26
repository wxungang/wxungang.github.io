# module

- 最开始没有模块的概念。js 主要是用来执行一些简单的脚本。

## 全局对象

- 后续前端业务的发展，需要分文件编写维护时常用的处理方式是定义一个全局变量 `window.mod = window.mod || {}` 用来挂载不同的模块。

## commonjs 

- 09 年 nodeJs 将 javascript 带入到服务端领域。参照的就是 commonJs 模块规范。
- 规范规定模块全局环境下都有 `require & module` 变量。`require` 导入模块, `module` 包含模块的基本信息。`module.exports`负责导出模块信息

```
// module.js
const mod_a = require('./moduleA');

// exports 和 module.exports 等效。 因为按照规范模块全局环境下都有 require & module 变量。
exports.prop = 'prop';
exports.func = () => {};
```

## amd (Asynchronous Module Definition)
- 服务端 cmd 模块因为是同步加载本地模块。但是浏览器环境需要请求资源，同步模式就会造成业务请求过程中卡死！
- 所以 amd 模块规范定义 `require & define` 来负责引入模块 & 定义模块！

```
// define(id?, dependencies?, factory);
define('myModule', ['dep1', 'dep2'], function (dep1, dep2) {

    //Define the module value by returning a value.
    return function () {};
});

```

```
// use 
require(['a', 'b'], function (a, b) {
    //modules a and b are now available for use.
});

```

## UMD (Universal Module Definition)
- 先判断是否支持 Node.js 模块格式（exports 是否存在），存在则使用 Node.js 模块格式。
- 再判断是否支持 AMD（define 是否存在），存在则使用 AMD 方式加载模块。
- 前两个都不存在，则将模块公开到全局（window 或 global）。

```
// if the module has no dependencies, the above pattern can be simplified to
(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define([depth], factory);
    } else if (typeof exports === 'object') {
        // Node. Does not work with strict CommonJS, but
        // only CommonJS-like environments that support module.exports,
        // like Node.
        module.exports = factory(require(depth));
    } else {
        // Browser globals (root is window)
        root.returnExports = factory(root[depth]);
  }
}(this, function (depth) {

    // Just return a value to define the module export.
    // This example returns an object, but the module
    // can return a function as the exported value.
    return {};
}));
```