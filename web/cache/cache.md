# cache created by xiaogang on 2017/12/8


## from cache (webkit 内核 比如 google 浏览器 会进一步区分 memory cache 和 disk cache)

> 第一次打开页面都是正常的ajax请求 （200）

> 第二次 关闭浏览器在打开 304 的静态文件 在 from disk (浏览器关闭时 内存数据已经销毁) 

> 如果 直接刷新 已经打开的页面 则  memory cache 和 disk cache 都有！

> 前提是304 文件没有改变（静态文件）。同时在Nginx 配置过缓存。否则 浏览器不会默认缓存相关文件（服务器端没有授权）。

> memory cache 和 disk cache 的区分 具体浏览器不一致。但是memory cache（内存） 比 disk cache （本地硬盘） 要快很多 

## gzip 

> gzip:on (配置) 通知浏览器 文件是通过压缩方式 传输的！