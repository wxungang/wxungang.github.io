/**
 * Created by xiaogang on 2017/10/27.
 */
"use strict";
(() => {
    console.log(`=====bind 的使用======`);

    function func(name) {
        this.name = name;
        console.log(this.prop);
        console.log(this.name);
    }

    var obj = {
        prop: 'obj'
    }

    var obj2 = {
        prop: 'obj2'
    }

    var f = func.bind(obj, 'bind').bind(obj2);
    f();

})();