# js杂谈
js已经不是世纪之初那样实现一些简单的页面交互那么简单了。

模块化、工程化已是大势所趋。相关的一些文章介绍就不在这里累赘了，自行google去。

## 编写建议
### 变量定义
- 除了全能的var，还要开始习惯let、const。
- const：常量全大写，下滑杆分隔。
- let:局部变量，闭包或者函数内部变量习惯下划杠开头。eg:let _variable='';

### this
- this是js的一个关键字，随着函数使用场合不同，this的值会发生变化。
- 但是有一个总原则，那就是this指的是调用函数的那个对象。
- this一般情况下：是全局对象Global。 作为方法调用，那么this就是指这个对象
  
### 事件是？IE与火狐的事件机制有什么区别？ 如何阻止冒泡？

- 我们在网页中的某个操作（有的操作对应多个事件）。例如：当我们点击一个按钮就会产生一个事件。是可以被 JavaScript 侦测到的行为。
- 事件处理机制：IE是事件冒泡、火狐是 事件捕获；
- ev.stopPropagation();
  
### 闭包
- 函数内的函数：实现变量的维护，防止变量污染。
- 个人使用闭包更多的是在于对页面逻辑的按功能模块分解，便于代码的维护。
- 闭包也会导致内存常驻，使用的时候也要注意及时销毁。
- [more](closure/closure.md) 

### instanceof 和 typeof
 
### js延迟加载的方式有哪些？
- defer和async、动态创建DOM方式、按需异步载入js（配合seaJs和requireJs）

### documen.write和 innerHTML的区别
- document.write只能重绘整个页面
- innerHTML可以重绘页面的一部分

###.call() 、 .apply() 、bind() 的区别？
- 核心：都是用于绑定this指针
- call、apply和bind的区别：call、apply立即执行，bind:需要调用自行


例子中用 add 来替换 sub，add.call(sub,3,1) == add(3,1) ，所以运行结果为：alert(4);

注意：js 中的函数其实是对象，函数名是对 Function 对象的引用。

  function add(a,b)
  {
      alert(a+b);
  }

  function sub(a,b)
  {
      alert(a-b);
  }

  add.call(sub,3,1);  
          
### 拷贝
~~~js
function deepCopy(p, c) {
　　　var c = c || {};
       for (var i in p) {
           if (typeof p[i] === 'object') {
               c[i] = (p[i].constructor === Array) ? [] : {};
               deepCopy(p[i], c[i]);
           } else {
               //浅拷贝
               c[i] = p[i];
           }
       }
       return c;
}
~~~
       
### 继承

### 扩展
- 个人不建议直接在原生对象上进行函数或者属性的扩展。
- [more demos](./prototype/string.prototype.js)

~~~js
/**
 *endWith:ES6语法中已经实现了改函数
 * @param str
 * @returns {boolean}
 */
String.prototype.endWith = function (str) {
    let _regExp = new RegExp(str + '$');
    return _regExp.test(this);
};
~~~

### demo ：参考 [page.js](./page.md)

## 附录
- [ES6](http://es6.ruanyifeng.com/#README)