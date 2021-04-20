## 闭包
A closure is the combination of a function and the lexical environment within which that function was declared.

一种封闭作用域：封闭的作用域内包含一些内部变量、函数等；通过函数去执行、

函数嵌套中内部函数被外部函数调用便形成了一个闭包。

** like this **
~~~js
function makeFunc() {
  var name = 'Mozilla';
  function displayName() {
    alert(name);
  }
  return displayName;
}

var myFunc = makeFunc();
myFunc();
~~~
or 

~~~js
function makeAdder(x) {
  return function(y) {
    return x + y;
  };
}

//生成两个不同的闭包 
var add5 = makeAdder(5);
var add10 = makeAdder(10);

console.log(add5(2));  // 7
console.log(add10(2)); // 12
~~~



### demos

~~~js
/**
* 一个业务模块包
*/
function func(params) {
    //业务模块内共享的变量
   const NUM=1000;
   /**
   * 业务模块的子逻辑（根据需要可以定义更多的内部函数）
   */
   function _func(){
       let _str='str';
       //dosomthing
   }
}
~~~
~~~js
//demo1
var name = "The Window";
var object = {
　　　　name : "My Object",
　　　　getNameFunc : function(){
　　　　　　return function(){
　　　　　　　　return this.name;
　　　　　　};
　　　　}
　　};
　　alert(object.getNameFunc()());//The Window
~~~
~~~js
//demo2
var a = [];
for (var i = 0; i < 10; i++) {
  a[i] = function () {
    console.log(i);
  };
}
a[6](); // 10
~~~
~~~js
//demo3
var a = [];
for (let i = 0; i < 10; i++) {
  a[i] = function () {
    console.log(i);
  };
}
a[6](); // 6
~~~


## 参考
- https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Closures
