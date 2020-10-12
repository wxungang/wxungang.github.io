# loop
> 事件轮询

## 场景
> 需要依赖前置业务完成的情况下，才能执行当前业务时。一般采取 **轮询** 或者 **广播通知** 的方式

## 实现
- 定时器封装
```js
/**
* callback: 需要执行的业务
* timeout: number ms 轮询频率
*/
function loop(callback,timeout=100){
    
}
```

- 巧用 promise 自带的轮询机制
> 条件：需要把前置依赖模块的 promise 暴露出来，方便调用 `await moduleDone`
```js
// moduleA.js
let promiseResoled = null;
const moduleDone = new Promise(resolve => promiseResoled = resolve)
// do something

promiseResoled();

//moduleB.js
async function func(){
  await moduleDone;
}
``` 
