## http
  
超文本传输协议（HTTP，HyperText Transfer Protocol)是互联网上应用最为广泛的一种网络协议。

### 基本概念

HTTP是一个客户端和服务器端请求和应答的标准（TCP）。客户端是终端用户，服务器端是网站。
通过使用Web浏览器、网络爬虫或者其它的工具，客户端发起一个到服务器上指定端口（默认端口为80）的HTTP请求。
（我们称这个客户端）叫用户代理（user agent）。应答的服务器上存储着（一些）资源，比如HTML文件和图像。
（我们称）这个应答服务器为源服务器（origin server）。在用户代理和源服务器中间可能存在多个中间层，比如代理，网关，或者隧道（tunnels）。
尽管TCP/IP协议是互联网上最流行的应用，HTTP协议并没有规定必须使用它和（基于）它支持的层。
事实上，HTTP可以在任何其他互联网协议上，或者在其他网络上实现。HTTP只假定（其下层协议提供）可靠的传输，任何能够提供这种保证的协议都可以被其使用。

### 状态码

所有HTTP响应的第一行都是状态行，依次是当前HTTP版本号，3位数字组成的状态代码，以及描述状态的短语，彼此由空格分隔。

状态代码的第一个数字代表当前响应的类型：

1xx 消息——请求已被服务器接收，继续处理

2xx 成功——请求已成功被服务器接收、理解、并接受

3xx 重定向——需要后续操作才能完成这一请求

4xx 请求错误——请求含有词法错误或者无法被执行

5xx 服务器错误——服务器在处理某个正确请求时发生错误

[更多详细的参考](https://en.wikipedia.org/wiki/List_of_HTTP_status_codes)


### 参考
[http://www.ruanyifeng.com/blog/2016/08/http.html](http://www.ruanyifeng.com/blog/2016/08/http.html)

[https://www.zhihu.com/question/34401250?from=profile_question_card](https://www.zhihu.com/question/34401250?from=profile_question_card)

