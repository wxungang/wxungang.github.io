# lodash
> 日常接触到的部分 lodash 功能记录

## overRest
```js
// 不改变函数执行，只是通过 transform 改变原函数 最后一个参数的格式。将剩余参数的数组格式通过transform处理： arg[length-1] = transform(restArgsArr) 。

// func(arg1,arg2,arg_n) => newFunc(arg1,arg2,arg_n-1,[arg_n,...rest_arg])

// func() or func(arg1) => newFunc([arg1,arg2,...,arg_n-1,arg_n])

/**
 * A specialized version of `baseRest` which transforms the rest array.
 *
 * @private
 * @param {Function} func The function to apply a rest parameter to.
 * @param {number} [start=func.length-1] The start position of the rest parameter.
 * @param {Function} transform The rest array transform.
 * @returns {Function} Returns the new function.
 */
function overRest(func, start, transform) {
  start = nativeMax(start === undefined ? (func.length - 1) : start, 0);
  return function() {
    var args = arguments,
        index = -1,
        length = nativeMax(args.length - start, 0),
        array = Array(length);

    while (++index < length) {
      array[index] = args[start + index];
    }
    index = -1;
    var otherArgs = Array(start + 1);
    while (++index < start) {
      otherArgs[index] = args[index];
    }

    otherArgs[start] = transform(array);
    return apply(func, this, otherArgs);
  };
}
```
