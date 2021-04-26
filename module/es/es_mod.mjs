//  按照规范模块全局环境下都有 require & export 变量。
export const mod = 'es mod';
export const func = (...args) => {
    return args;
};

export default 'es module';
