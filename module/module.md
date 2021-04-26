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

## amd
- 

