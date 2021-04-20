/**
 * Created by xiaogang on 2017/5/12.
 */
"use strict";

// Simple Name/Value Pairs
//
// If the module does not have any dependencies, and it is just a collection of name/value pairs, then just pass an object literal to define():
define({
    name: 'Simple Name/Value Pairs',
    other: {
        dependencies: 'none'
    },
    flag: false,
    func: function (args) {
        return args;
    }
});