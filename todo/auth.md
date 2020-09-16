# auth 鉴权
> 解决的问题：http请求无状态。


## session-cookie

### cookie
- 服务端生成，通过http请求的 response header 返回告知浏览器保存到本地（可以理解为用户唯一key）。
- 下次请求时 request header 中自动上送 cookie。这样服务端可以获取cookie,然后比对是否存在(存在) & 获取对应cookie的信息。

### session
- 服务端维护，可以配合redis数据库使用。`session.key = { key: value }`

### 使用场景
- 用户登录 & 验证码：
```js
// 登录成功后
auth_service.setUserInfo(ctx.session, {username:'xxx',phone:'xxx'})

// 需要用户权限的接口处理：先检查session中是否有用户信息
router.post('user/info', auth_service.checkUserInfo, async (ctx) => {
  let {id} = ctx.session.userInfo;
  // other
})

// 需要验证码权限的接口处理：先检查session中是否有验证码 & 是否一致
router.post('user/login', auth_service.checkCaptcha, async (ctx) => {
  let {account, password, type} = ctx.request.body;
  // other
})
```

```js
// auth.ts
import res_format from '../util/res_format';
import log_service from "./log";

const logger = log_service('service/auth/');


export default class sessionCookie {
  public static setUserInfo(session, value: any, maxAge = 1000 * 60 * 60 * 24): void {
    // 更新 session
    session.userInfo = value;
    // 更改验证码有效期 （统一设置的有效期过长！）
    if (maxAge) {
      session.maxAge = maxAge;
    }
  }

  public static async checkUserInfo(ctx, next) {
    if (!ctx.session.userInfo) {
      return ctx.body = res_format.response_user_out({
        msg: '请先登录，再进行后续操作！'
      })
    } else {
      return await next()
    }
  }

  public static setCaptcha(session, value: any, maxAge?: number): void {
    // 更新 session
    session.captcha = value;
    // 更改验证码有效期 （统一设置的有效期过长！）
    if (maxAge) {
      session.maxAge = maxAge;
    }
  }

  public static async checkCaptcha(ctx, next) {
    let {captcha} = ctx.request.body;
    logger.info('sessionCaptcha', ctx.request.body, ctx.session);
    if (!ctx.session.captcha || ctx.session.captcha.toLowerCase() !== captcha.toLowerCase()) {
      return ctx.body = res_format.response_user_out({
        msg: '验证码已过期or错误，请重新请求！'
      })
    } else {
      ctx.session.captcha = '';
      return await next()
    }
  }
}
```

### 问题
- 跨域请求cookie设置问题
- 安全问题
```js
```





## 参考
- https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Cookies
