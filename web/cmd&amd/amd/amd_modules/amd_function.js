/**
 * Created by xiaogang on 2017/5/12.
 */
"use strict";

// If the module does not have dependencies, but needs to use a function to do some setup work, then define itself, pass a function to define():

define(function () {
    console.log("Simple function");
    //do something what you want
    return {
        name: 'Simple function',
        other: {
            dependencies: 'none'
        },
        func: function (args) {
            return args;
        }
    }
});