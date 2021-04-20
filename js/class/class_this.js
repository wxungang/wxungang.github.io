/**
 * Created by xiaogang on 2017/6/22.
 */
"use strict";
class Logger {
    constructor() {
        //在构造函数中修改 函数的this
        this.printName = this.printName.bind(this);
    }
    print(text) {
        console.log(text);
    }
    printName(name = 'there') {
        this.print(`Hello ${name}`);
    }


}

const logger = new Logger();
console.log(logger.print);
logger.print("print func")
const {printName} = logger;
printName(); // TypeError: Cannot read property 'print' of undefined