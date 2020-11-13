const _shortOut = require('./lodash-4.17.19/npm-package/_shortOut');
const _overRest = require('./lodash-4.17.19/npm-package/_overRest');


((mod) => {
    console.log(`============test ${mod}===================`);

    function func(a, b, c) {
        console.log(a, b, c)
        return [...arguments];
    }

    let newFunc = _overRest(func, undefined, restArgs => restArgs)
    let newFunc1 = _overRest(func, undefined, restArgs => restArgs.join('|'))

    console.log(newFunc(1, 2, 3, 4, 5))
    console.log(newFunc1(1, 2, 3, 4, 5))

})('_overRest');


((mod) => {
    console.log(`============test ${mod}===================`);

    function func(...arg) {
        return arg
    }

    let newFunc = _shortOut(func)
    let count = 0;
    while (++count < 500) {
        console.log(count, newFunc(1, 2, 3, 4, 5))
    }

    while (++count < 1000) {
        setTimeout(() => {
            console.log(count, newFunc(1, 2, 3, 4, 5))
        }, 13)

    }


})('_shortOut');
