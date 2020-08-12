# git clone 外网项目失败

一、现象

连接着vpn，网页上可以直接打开网站，但是使用terminal 执行git clone https://chromium.googlesource.com/xxxx时，

报错：Failed to connect to chromium.googlesource.com port 443: Operation timed out

二、原因

这是因为terminal没有走代理的流量，

三、方法

使用git config --global http.proxy "localhost:port"，设置代理。

port是端口号，根据不同的vpn不一样，我这里使用的是lartern，端口是50321。

四、操作

执行 git config --global http.proxy "localhost:50321"

五、设置&取消

git config --global https.proxy http://127.0.0.1:1080

git config --global https.proxy https://127.0.0.1:1080

git config --global --unset http.proxy

git config --global --unset https.proxy


npm config delete proxy
