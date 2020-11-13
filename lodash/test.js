const _shortOut = require('./lodash-4.17.19/npm-package/_shortOut');
const _overRest = require('./lodash-4.17.19/npm-package/_overRest');
const _getNative = require('./lodash-4.17.19/npm-package/_getNative');
const _baseSetToString = require('./lodash-4.17.19/npm-package/_baseSetToString');


((mod) => {
    console.log(`============test ${mod}===================`);
    return;

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
    return;

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


((mod) => {
    console.log(`============test ${mod}===================`);
    return;

    console.log(_getNative(Math, 'random'))

    console.log(_getNative(Math, 'toString'))

    console.log(_getNative({key: 1}, 'key'))


})('_getNative');

((mod) => {
    console.log(`============test ${mod}===================`);
    // return;

    function func(...args) {
        return args
    }

    console.log('func.toString => ', func.toString())

    _baseSetToString(func, '这是定制的toString()')

    console.log('func.toString => ', func.toString())


})('_baseSetToString');

