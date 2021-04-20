/**
 * Created by xiaogang on 2017/6/9.
 */
"use strict";

//将字符串 转换成 Blob 对象
var blob = new Blob(["Hello World!"], {
    type: 'text/plain'
});
console.log(typeof blob);
console.info(blob);
console.info(blob.slice(1, 3, 'text/plain'));