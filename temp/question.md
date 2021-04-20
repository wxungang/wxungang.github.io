## questions

通过题目的方式可以加深理解同时可以涵盖更多没有涉及的知识点。

### 问题1：Scope作用范围
~~~js
(function() {
   var a = b = 5;
})();

console.log(b);//5
//什么会被打印在控制台上？
~~~

上面的代码会打印 5。

这个问题的诀窍是，这里有两个变量声明，但 a 使用关键字var声明的。代表它是一个函数的局部变量。与此相反，b 变成了全局变量。

这个问题的另一个诀窍是，它没有使用严格模式 ('use strict';) 。如果启用了严格模式，代码就会引发ReferenceError的错误：B没有定义（b is not defined）。请记住，严格模式，则需要明确指定，才能实现全局变量声明。比如，你应该写：
~~~js
(function() {
   'use strict';
   var a = window.b = 5;
})();

console.log(b);
~~~

### 问题2：创建“原生”（native）方法

给字符串对象定义一个repeatify功能。当传入一个整数n时，它会返回重复n次字符串的结果。例如：

console.log('hello'.repeatify(3));

应打印 hellohellohello。

~~~js
String.prototype.repeatify = String.prototype.repeatify || function(times) {
   var str = '';
   for (var i = 0; i < times; i++) {
      str += this;
   }
   return str;
};
~~~

现在的问题测试开发者有关JavaScript继承和prototype的知识点。这也验证了开发者是否知道该如何扩展内置对象（尽管这不应该做的）。

这里的另一个要点是，你要知道如何不覆盖可能已经定义的功能。通过测试一下该功能定义之前并不存在：
~~~js
String.prototype.repeatify = String.prototype.repeatify || function(times) {/* code here */};
//当你被要求做好JavaScript函数兼容时这种技术特别有用。
~~~

### 问题3：声明提升（Hoisting）

~~~js
//执行这段代码，输出什么结果。
function test() {
   console.log(a);
   console.log(foo());
   var a = 1;
   function foo() {
      return 2;
   }
}

test();
~~~
这段代码的结果是 undefined 和 2。

原因是，变量和函数的声明都被提前了（移到了函数的顶部），但变量不分配任何值。因此，在打印变量的时候，它在函数中存在（它被声明了），但它仍然是 undefined 。表示换句话说，上面的代码等同于以下内容：
~~~js
function test() {
   var a;
   function foo() {
      return 2;
   }

   console.log(a);
   console.log(foo());

   a = 1;
}
test();
~~~

### 问题4：this在JavaScript中如何工作的
~~~js
//下面的代码会输出什么结果？给出你的答案。
var fullname = 'John Doe';
var obj = {
   fullname: 'Colin Ihrig',
   prop: {
      fullname: 'Aurelio De Rosa',
      getFullname: function() {
         return this.fullname;
      }
   }
};

console.log(obj.prop.getFullname());//Aurelio De Rosa
var test = obj.prop.getFullname;
console.log(test());//John Doe
~~~

答案是Aurelio De Rosa和John Doe。
原因是，在一个函数中，this的行为，取决于JavaScript函数的调用方式和定义方式，而不仅仅是看它如何被定义的。

在第一个 console.log()调用中，getFullname() 被调用作为obj.prop对象的函数。
所以，上下文指的是后者，函数返回该对象的fullname。与此相反，当getFullname()被分配到test变量时，上下文指的是全局对象（window）。
这是因为test是被隐式设置为全局对象的属性。出于这个原因，该函数返回window的fullname，即定义在第一行的那个值。

### 阐述下 JavaScript 中的变量提升

所谓提升，顾名思义即是 JavaScript 会将所有的声明提升到当前作用域的顶部。这也就意味着我们可以在某个变量声明前就使用该变量，不过虽然 JavaScript 会将声明提升到顶部，但是并不会执行真的初始化过程。

### 阐述下 use strict; 的作用

use strict; 顾名思义也就是 JavaScript 会在所谓严格模式下执行，其一个主要的优势在于能够强制开发者避免使用未声明的变量。对于老版本的浏览器或者执行引擎则会自动忽略该指令。
~~~js
// Example of strict mode
"use strict";
 
catchThemAll();
function catchThemAll() {
  x = 3.14; // Error will be thrown
  return x * x;
}
~~~

### 解释下什么是 Event Bubbling 以及如何避免

Event Bubbling 即指某个事件不仅会触发当前元素，还会以嵌套顺序传递到父元素中。直观而言就是对于某个子元素的点击事件同样会被父元素的点击事件处理器捕获。避免 Event Bubbling 的方式可以使用event.stopPropagation() 或者 IE 9 以下使用event.cancelBubble。

### == 与 === 的区别是什么

=== 也就是所谓的严格比较，关键的区别在于=== 会同时比较类型与值，而不是仅比较值。
~~~JS
// Example of comparators
0 == false; // true
0 === false; // false
 
2 == '2'; // true
2 === '2'; // false
~~~

### 解释下 null 与 undefined 的区别

JavaScript 中，null 是一个可以被分配的值，设置为 null 的变量意味着其无值。而 undefined 则代表着某个变量虽然声明了但是尚未进行过任何赋值。

### 解释下 Prototypal Inheritance 与 Classical Inheritance 的区别

在类继承中，类是不可变的，不同的语言中对于多继承的支持也不一样，有些语言中还支持接口、final、abstract 的概念。而原型继承则更为灵活，原型本身是可以可变的，并且对象可能继承自多个原型。