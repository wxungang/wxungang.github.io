## adb
- cat: 读取文件到控制台。
- grep: 搜索包含对应字符串的文件数据。 
    - 可以加参数控制   

### demos
```js
const webviewInfo = ({tcpPort = 4000, prefix = 'webview', filter = d => d} = {}) => {

    if (prefix === '*') {
        prefix = '.+';
    }
    let re = new RegExp('@(' + prefix + '_devtools_remote(?:_\\d+)?)', 'gi');

    return getDeviceId().then(deviceId => {
        // 
        return adbKit.shell(deviceId, 'cat /proc/net/unix | grep _devtools_remote')
            .then(adb.util.readAll)
            .then(output => {
                let remotePorts = new Set();
                output.toString().replace(re, (_, port) => {
                    remotePorts.add(port);
                });
                if (remotePorts.size) {
                    return [...remotePorts];
                } else {
                    throw new Error('没有启动 webview');
                }
            })
            .then(ports => getForwardPortInfo({deviceId, ports, tcpPort, filter}))
    });

};
```

### 参考
- https://www.runoob.com/linux/linux-command-manual.html