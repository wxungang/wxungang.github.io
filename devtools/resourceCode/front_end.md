# devtools 源码分析
- 纯前端实现的调试工具

## 入口
> 对应 **inspector.html** 或者 **devtools_app.html**
 
```html
   <script type="module" src="root.js"></script>
   <script defer src="inspector.js"></script>
```

## 模块分析

### root
> 业务代码执行前 初始化前置模块
```js
import './Runtime.js';
import './platform/platform.js';
import './dom_extension/dom_extension.js';
import './common/common-legacy.js';
import './host/host.js';
import './protocol/protocol.js';
import './sdk/sdk.js';
import './ui/ui-legacy.js';

import './services/services.js';
import './workspace/workspace.js';
import './bindings/bindings.js';
import './components/components.js';
import './persistence/persistence.js';
import './browser_sdk/browser_sdk.js';
import './extensions/extensions.js';
import './console_counters/console_counters.js';
import './text_utils/text_utils.js';
```

### runtime


### platform
> 常用工具函数、类扩展

- 类型扩展

```js
// 数据描述符 或者 存取描述符 。默认不能被二次设置，修改
Object.defineProperty(Array.prototype, 'pushAll', {
    value:function(array){
        array.forEach(arr=>this.push(arr))
    }
})
// 具体每一个实例都可以使用 eg:instance.func
String.prototype.findAll=function(){}
Date.prototype.isValid=function(){}
// 只能模块类下使用。类似于 static 函数  eg: class.func
String.regexSpecialCharacters=function(){}
Number.constrain=function(){}
```

- 全局扩展

```js
self.loadXHR = function(){}
self.runOnWindowLoad = function(){}
```




