# constructor
所有对象都会从它的原型上继承一个 constructor 属性

实例属性（函数引用）：指向创建了该实例的对象原型的函数引用。

对于原始值（如1，true 或 "test"），该属性为只读。

## constructor 检测
依赖一个对象的 constructor 属性并不安全。

## demo
~~~js
function Type() { };

var	types = [
	new Array,
	[],
	new Boolean,
	true,        // remains unchanged
	new Date,
	new Error,
	new Function,
	function(){},
	Math,	
	new Number,
	1,           // remains unchanged
	new Object,
	{},
	new RegExp,
	/(?:)/,
	new String,
	"test"       // remains unchanged
];

for(var i = 0; i < types.length; i++) {
	types[i].constructor = Type;
	types[i] = [ types[i].constructor, types[i] instanceof Type, types[i].toString() ];
};

console.log( types.join("\n") );

//output
function Type() { },false,
function Type() { },false,
function Type() { },false,false
function Boolean() { [native code] },false,true
function Type() { },false,Fri Jun 23 2017 10:32:19 GMT+0800 (中国标准时间)
function Type() { },false,Error
function Type() { },false,function anonymous() {

}
function Type() { },false,function (){}
function Type() { },false,[object Math]
function Type() { },false,0
function Number() { [native code] },false,1
function Type() { },false,[object Object]
function Type() { },false,[object Object]
function Type() { },false,/(?:)/
function Type() { },false,/(?:)/
function Type() { },false,
function String() { [native code] },false,test

~~~