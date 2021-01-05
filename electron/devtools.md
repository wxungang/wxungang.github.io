# devtools



## 
各种主流与非主流方案

|bat|方案|源码|
|:----|:----|----|
| 微信 |不对 Chrome 调试器源代码进行修改，使用默认的 chrome-devtools 协议，所有定制化需求都通过 Chrome DevTools 扩展的形式引入（微信方案） ||
|百度老方案|修改 Chrome 调试器源代码，使用 http 协议 。定制化需求通过 hard code 方式写入调试器源代码。（修改 Electron 资源文件，使用 hard code 后的调试器前端代码替换原生的。）||
|百度新方案|修改 Chrome 调试器源代码，使用 http 协议 。引入 Defifer 提供一套 Chrome 扩展的运行时环境。所用定制化需求，按调试面板拆分单独开发 Chrome DevTools 扩展。（修改 Electron 源代码，增加对 –custom-devtools-frontend 开关的支持。）|app/build-x.y.z/app.asar/dist/extensions/inspector/*|





## 参考
- [百度rebuild-devtools-extension-runtime](https://slides.com/luyuan/rebuild-devtools-extension-runtime/fullscreen)


