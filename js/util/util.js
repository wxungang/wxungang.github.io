/**
 * Created by xiaogang on 2017/2/7.
 */
"use strict";
var util = util || {};

/**
 *
 * @param p
 * @returns {{}}
 */
util.extend = function (p) {
    var c = {};
    for (var i in p) {
        c[i] = p[i];
    }
    //c.uber = p;
    return c;
};

/**
 *
 * @param p:父类
 * @param c：子类
 * @returns {*|{}}
 */
util.deepCopy = function (p, c) {
    var c = c || {};
    for (var i in p) {
        if (typeof p[i] === 'object') {
            c[i] = (p[i].constructor === Array) ? [] : {};
            deepCopy(p[i], c[i]);
        } else {
            c[i] = p[i];
        }
    }
    return c;
};