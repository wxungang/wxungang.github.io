console.log(require, '===', module);

const mod = 'commonjs mod';


// exports 和 module.exports 等效。 因为按照规范模块全局环境下都有 require & module 变量。
exports.mod = mod;
exports.func = (...args) => {
  return args;
};

