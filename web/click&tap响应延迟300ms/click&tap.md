## click&tap
移动端大家比较推荐的写法都是采用zepto的tap事件代替click,理由一般是click事件有传说中的300ms延迟。

### 测试结果
**移动端启用 \<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">**

测试发现click事件 和 tap事件 响应差不多 [ios上 tap 稍微 快一些]。

click 和 tap 触发延迟只有100ms左右 [在实际移动设备中 延迟只有50ms]

**不启用 \<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">**

测试发现click事件 比tap事慢200ms 左右 [在实际移动设备中 Android延迟250ms，ios 400ms]。

tap 和 touchend 触发延迟相对touchstart有100ms左右。[在实际移动设备中 延迟 50ms ]。

### demo
~~~js
//zepto 是1.2的
<script type="text/javascript" src="../../common/zepto.js"></script>
//touch.js 是github上拉取的最新的
<script type="text/javascript" src="../../common/touch.js"></script>
<script type="text/javascript">
    // click 事件延迟问题
    document.getElementById('h3').addEventListener('click', function (e) {
        console.log("=========click1======")
        console.log(new Date().getTime());
    });

    $("#h3").on('tap', function (e) {
        console.log("=========zepto tap1======")
        console.log(new Date().getTime());
    });

    document.getElementById('h3').addEventListener('click', function (e) {
        console.log("=========click2======")
        console.log(new Date().getTime());
    });

    $("#h3").on('tap', function (e) {
        console.log("=========zepto tap2======")
        console.log(new Date().getTime());
    });

    document.getElementById('h3').addEventListener('touchend', function (e) {
        console.log("=========touchend======")
        console.log(new Date().getTime());
    });

    document.getElementById('h3').addEventListener('touchstart', function (e) {
        console.log("=========touchstart======")
        console.log(new Date().getTime());
    });
   
</script>

~~~

### output
~~~text
//output [启用移动端禁用缩放功能]
pc端
// mouseup(click) 相对于 mousedown 延迟约100ms.
相关数据
=========mousedown======
1494385008828
=========mouseup======
1494385008920
=========click1======
1494385008920
=========click2======
1494385008921

android (pc 模拟器)
//touchend(mousedown,mouseup,click,tap) 相对于 touchstart 延迟 100ms
相关数据
=========touchstart======
1494385429756
=========touchend======
1494385429850
=========mousedown======
1494385429853
=========mouseup======
1494385429854
=========click1======
1494385429855
=========click2======
1494385429856
=========zepto tap1======
1494385429857
=========zepto tap2======
1494385429857

android 
//touchend 相对于 touchstart 延迟约50ms .【android基本一致】
//mousedown > mouseup > click 相隔 5ms。tap 相对于click 5ms 【不同浏览器触发顺序不一样，但时间间隔相差 5ms】
相关数据
=========touchstart======
1494385631828
=========touchend======
1494385631879
=========mousedown======
1494385631886
=========mouseup======
1494385631890
=========click1======
1494385631892
=========click2======
1494385631893
=========zepto tap1======
1494385631900
=========zepto tap2======
1494385631901

ios [pc 模拟器]
//touchend(mousedown,mouseup,click,tap) 相对于 touchstart 延迟 100ms
相关数据
=========touchstart======
1494386351424
=========touchend======
1494386351527
=========mousedown======
1494386351529
=========mouseup======
1494386351531
=========click1======
1494386351531
=========click2======
1494386351532
=========zepto tap1======
1494386351533
=========zepto tap2======
1494386351534

ios 
//touchend 相对于 touchstart 延迟约50ms .
//mousedown > mouseup  相隔 20ms。tap 相对于touchend 延迟 30ms 
相关数据
=========touchstart======
1494419016529
=========touchend======
1494419016556
=========zepto tap1======
1494419016583
=========zepto tap2======
1494419016591
=========mousedown======
1494419016599
=========mouseup======
1494419016619
=========click1======
1494419016620
=========click2======
1494419016622


//output [不启用移动端禁用缩放功能]
pc端
// mouseup(click) 相对于 mousedown 延迟约100ms.
相关数据
=========mousedown======
1494386516318
=========mouseup======
1494386516415
=========click1======
1494386516416
=========click2======
1494386516416

Android 【pc模拟】
//tap(touchend) 相对于 touchstart 延迟 100ms
// click(mousedown mouseup) 相对于 tap(touchend) 延迟 200ms
相关数据
=========touchstart======
1494386693562
=========touchend======
1494386693656
=========zepto tap1======
1494386693658
=========zepto tap2======
1494386693659
=========mousedown======
1494386693859
=========mouseup======
1494386693860
=========click1======
1494386693861
=========click2======
1494386693861

android
//tap(touchend) 相对于 touchstart 延迟约 50ms
// click(mousedown mouseup) 相对于 tap(touchend) 延迟约 250ms
相关数据
=========touchstart======
1494387103718
=========touchend======
1494387103766
=========zepto tap1======
1494387103771
=========zepto tap2======
1494387103772
=========mousedown======
1494387104020
=========mouseup======
1494387104027
=========click1======
1494387104028
=========click2======
1494387104029

ios [pc 模拟器]
//tap(touchend) 相对于 touchstart 延迟 100ms 
// click(mousedown mouseup) 相对于 tap(touchend) 延迟 200ms
相关数据
=========touchstart======
1494417814608
=========touchend======
1494417814702
=========zepto tap1======
1494417814704
=========zepto tap2======
1494417814705
=========mousedown======
1494417814905
=========mouseup======
1494417814906
=========click1======
1494417814907
=========click2======
1494417814907

ios
//tap(touchend) 相对于 touchstart 延迟 50ms 左右
// click(mousedown mouseup) 相对于 tap(touchend) 延迟 400ms
相关数据
=========touchstart======
1494418431434
=========touchend======
1494418431465
=========zepto tap1======
1494418431468
=========zepto tap2======
1494418431468
=========mousedown======
1494418431823
=========mouseup======
1494418431855
=========click1======
1494418431856
=========click2======
1494418431857
~~~

### 相关问题
移动端采用zepto的tap事件时会有点透的现象。

原因一般是：在tap事件中关闭或者隐藏了父级（一般情况下是遮罩层）的dom,而子dom恰好也存在点击事件，这样由于事件流机制（捕获冒泡）导致子级dom也触发了点击事件。

分析：都在冒泡阶段（事件触发默认冒泡阶段）的话，父级肯定比子集后触发，应该不会产生点透现象。

有些博客文章说父级使用tap,子集使用click。看demo中的触发时间也只有在不启用缩放时会发生这种情况。

主要是会有那个傻逼在一个业务逻辑中同时使用click和tap呢？

所以基本上感觉主要是同时使用捕获阶段触发事件。但是这样也有一个问题，zepto的事件机制是基于事件冒泡，touch.js中事件都是绑定在document上的。