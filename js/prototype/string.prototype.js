/**
 * Created by xiaogang on 2017/1/25.
 */
"use strict";

/**
 *endWith:ES6语法中已经实现了改函数
 * @pa ram str
 * @returns {boolean}
 */
String.prototype.endWith = function (str) {
    let _regExp = new RegExp(str + '$');
    return _regExp.test(this);
};

