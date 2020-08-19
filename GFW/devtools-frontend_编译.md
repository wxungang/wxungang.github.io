# ChromeDevTools/devtools-frontend 自行修改编译

## GET DEPOT TOOLS[官网参考链接流程]

### LINUX / MAC

Clone the depot_tools repository:

```bash
$ git clone https://chromium.googlesource.com/chromium/tools/depot_tools.git
```

> ```fetch devtools-frontend``` 报错：Failed to connect to chromium.googlesource.com port 443: Operation timed out

解决办法
```bash 
// 正常开启全局梯子外，还需要配置 git 全局代理 。具体端口需要参考自己电脑的工具
git config --global http.proxy http://127.0.0.1:7890

git config --global https.proxy https://127.0.0.1:7890

// 后续也可以自行取消配置
git config --global --unset http.proxy

git config --global --unset https.proxy

```

Add depot_tools to the front of your PATH (you will probably want to put this in your ~/.bashrc or ~/.zshrc). Assuming you cloned depot_tools to /path/to/depot_tools:
```bash 
$ export PATH=/path/to/depot_tools:$PATH
```

备注：mac 新版系统 默认终端 zshrc 。我这边配置 ```~/.bash_profile``` 无效
```bash 
# depot_tools
export PATH="/Users/xxx/Documents/depot_tools:$PATH"
```

> ```gn gen out/Default``` & ```autoninja -C out/Default``` 报错

解决办法 ~/.zshrc 中新增配置
```bash 
# 该设置仅对当前终端窗口生效，关闭窗口，下次需要在设置一次 proxy_on [需要开启全局模式]
function proxy_off(){
        unset http_proxy
        unset https_proxy
        unset ftp_proxy
        unset rsync_proxy
        echo -e "已关闭代理"
}
 
function proxy_on() {
        export no_proxy="localhost,127.0.0.1,localaddress,localdomain.com"
        export http_proxy="http://127.0.0.1:7890"
        export https_proxy=$http_proxy
        export ftp_proxy=$http_proxy
        export rsync_proxy=$http_proxy
        export HTTP_PROXY=$http_proxy
        export HTTPS_PROXY=$http_proxy
        export FTP_PROXY=$http_proxy
        export RSYNC_PROXY=$http_proxy
        echo -e "已开启代理"
}
```

对应的build 命令前：```proxy_on```
```bash 
cd devtools-frontend
proxy_on
gn gen out/Default
autoninja -C out/Default
```


### window[参考官网链接] 
> 没有尝试

## Checking out source
To check out the source for DevTools frontend only, follow these steps:
```bash 
mkdir devtools
cd devtools
fetch devtools-frontend
```

## Build
To build, follow these steps:
```bash 
cd devtools-frontend
gn gen out/Default
autoninja -C out/Default
```


## 参考
- https://commondatastorage.googleapis.com/chrome-infra-docs/flat/depot_tools/docs/html/depot_tools_tutorial.html#_setting_up
- https://github.com/ChromeDevTools/devtools-frontend/blob/master/docs/workflows.md
- https://github.com/ChromeDevTools/devtools-frontend
