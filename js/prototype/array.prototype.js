/**
 * Created by xiaogang on 2017/1/25.
 */
"use strict";

/**
 *endWith:ES6语法中已经实现了改函数
 * @pa ram str
 * @returns {boolean}
 */
Array.prototype.include = function (key) {
    return this.indexOf(key) != -1;
};

