# Inspector Extension Overview

## 概述

Inspector extension 负责呈现开发者工具的调试器。这个调试器来自 Chrome DevTools FrontEnd 项目（参见： https://github.com/ChromeDevTools/devtools-frontend ）。

Inspector extension 为 **UI Extension**，入口文件为 `./src/index.js`。其全部 UI 均存在于一个 webview 中。我们 clone 了一份 *devtools-frontend* 的代码，选定了与 Chromium 58 对应的版本，并生成目标 frontend 文件。在 inspector extension 的 webview 中，以 *file* 协议直接访问目标 frontend 文件的 path。

Inspector extension 支持 Chrome DevTools extension，由于我们使用了自定义的调试器并通过 *file* 协议打开，取代了 Electron 默认的 *chrome-devtools* 协议的调试器，所以引入了 defifer 来完成 Chrome DevTools extension 的加载及 Chrome API 支持。目前共有 4 个 Chrome DevTools extension 在调试器中运行，它们是：

- Storages 面板
- Sensors 面板
- App data 面板
- Swan Audits 面板

## package.json 及 目录结构说明

```
{
	"name": "inspector",
	"version": "1.0.0",
	"description": "",
	"type": "ui",
	"main": "./src",
	"default_locale": "zh"
}
```


目录结构说明如下：

- src
	- index.js，入口文件
	- preload.js，inspector webview preload 脚本

## 重点模块说明

### ./src/index.js

*index.js* 为入口文件，包括：

- 获取调试器（Chrome DevTools Front-end）的 *URL*，目前为 file 协议。
- 获取被调试 webview 的 *websocketDebuggerUrl*。并最终合成 inspector extension webview 所需的 *src* 属性值。形如：`file:///path/to/inspector.html?ws=127.0.0.1:${port}/master/websocket/debugger/url`。
- 创建及 attach webview。
- 监听 master 的页面生命周期。
- 传递 slave 的 San 消息。

### ./src/preload.js

*preload.js* 中的脚本会在 inspector webview 所指的页面加载前执行。 包括：

- 初始化 Swan 面板，以及跟随 slave 切换组件树结构及数据信息。
- 代理 logger 及重写剪贴板行为。

## 通信说明

### 监听

事件名：***simulator.page-lifecycle*** 

参数 data（Object）：

| 参数 | 类型 | 说明 |
| :-----| :----: | ----: |
| status | string | 代表生命周期状态，*'show'* 或者 *'hide'* |
| url | string | 代表 *websocketDebuggerUrl* |

---

事件名：***simulator.san-message***

参数 data（Object）：

| 参数 | 类型 | 说明 |
| :-----| :----: | ----: |
| url | string | 代表 *websocketDebuggerUrl*

---

事件名：***navigator*** （内部）

通知 devtools-frontend 页面切换。

参数 data（Object）：

| 参数 | 类型 | 说明 |
| :-----| :----: | ----: |
| type | string | 代表生命周期状态，*'show'* 或者 *'hide'* |
| webSocketDebuggerUrl | string | 代表 *websocketDebuggerUrl*

---

事件名：***san-hook*** （内部）

通知 devtools-frontend 当前页面组件树结构及数据信息发生变化。

参数 data（Object）：

| 参数 | 类型 | 说明 |
| :-----| :----: | ----: |
| data | Object | 组件树结构，包含了组件的 data 等所有组件实例信息。 |
| webSocketDebuggerUrl | string | 代表 *websocketDebuggerUrl*|

---

事件名：***loggerToConsole*** 

参数 data（Object）：

| 参数 | 类型 | 说明 |
| :-----| :----: | ----: |
| level | string | log 级别 *'warn'* 或者 *'error'*。 |
| value | string | stringify 后的 log 信息 |


## API

Inspector extension 暂无 API。
