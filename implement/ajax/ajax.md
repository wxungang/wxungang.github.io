# ajax
> ajax 日常小结

## 业务直接使用 ajax
- 如果直接用原生的也会统一封装一个函数。不会直接业务中重复 `xhr = new XMLHttpRequest()` 处理！
- 这里已 axios 库为例

```js
// 业务调用
axios({
    uri:'',
    params:{}
}).then(data=>{
    // 需要处理业务返回错误的情况
},err=>{
    // do something
})
```

## 抹平不同 业务系统

```js
// 业务调用
ajax({
    uri:'page/get',
    data:{
        
    },
    callback:function(data,code,msg) {
        console.log(data,code,msg);
    }
}).then(data=>{
    //直接处理 正常业务逻辑
},err=>{
    // do something
})

// promise
function ajax(params){ 
    // 参数预处理    
    let _type = params.type || params.method || 'get';
    return axios(Object.assign({
             method: _type,
             url: params.url || params.uri
         }, 
        // 统一 get/ post 数据属性 
        _type === 'get' ? {params: params.data} : {data: params.data}))
        .then(res=>{
            // 抹平不同后台系统的 数据属性差异
            let code = res.code || res.status;
            let data = res.result || res.data;
            let msg = res.msg || res.message;
            // 抹平不同 业务系统的成功状态码
            if(code===100 || code==='100'){
                // 返回 统一的 数据结构
                return res
            } else {
                return Promise.reject(res)
            }    
        },err=>{
           return Promise.reject(err)
        })
}

// promise & callback
function ajax_callback(params){ 
    // 参数预处理    
    let _type = params.type || params.method || 'get';
 
    return axios(Object.assign({
             method: _type,
             url: params.url || params.uri
         }, 
        // 统一 get/ post 数据属性 
        _type === 'get' ? {params: params.data} : {data: params.data}))
        .then(res=>{
            // 抹平不同后台系统的 数据属性差异
            let code = res.code || res.status;
            let data = res.result || res.data;
            let msg = res.msg || res.message;
            // 抹平不同 业务系统的成功状态码
            if(code===100 || code==='100'){
                // 返回 统一的 数据结构
                params.callback && params.callback(res,100,msg)
                return res
            } else {
                params.callback && params.callback(res)
                return Promise.reject(res)
            }    
        },err=>{
            params.callback && params.callback(err)
           return Promise.reject(err)
        })
}
```

## 函数化/配置化
- vuex/redux 中经常会将异步的ajax调用抽离到action中
- 通过 props 获取函数调用 / 更新后的数据

```js
//actions
export const PAGE_GET = 'PAGE_GET';

export const page_get = (data = {}) => {
  return {
    type: PAGE_GET,
    params: data
  }

}
// 页面对应对应函数 更新数据，对应url & type 都配置化了。
export const page_get_Thunk = (data = {}) => (dispatch, getState) => {
  ajax({
    url: Urls.page_get,
    type:'get',
    data
  }).then(res=>{
    // 更新数据
    dispatch(page_get(res))
  })
}
```

- 非 vuex/redux 中

```js
// 页面对应对应函数 更新数据，对应url & type 都配置化了。
export const page_get = (params = {}) => {
  return ajax(Object.assign({
            url: Urls.page_get,
            type: 'get',
            data: {}}, params))
}

```

## workbox 缓存 & 兼容性处理(扩展post/非web环境)

```js
/**
 * 默认
 * _cache:true (缓存) 接口不同场景下可以业务层设置 params.cache:false 不走缓存
 * _sw: true （优先 serviceWorker 缓存）
 */
function storage(params){
    params = Object.assign({_cache: true, _sw: true}, params);
  
    if (navigator.serviceWorker && (params.type === 'get' || !params.type) && params._sw) {
         if (params._cache) {
             //如果cache为true, 则更新到 data中，便于sw 正则匹配
             params.data = params.data || {};
             params.data._cache = true;
         }
    
         return ajax(params)
    }

   if (!params._cache) {
     return ajax(params)
   }
 
   for (let key in strategies) {
     let _arr = strategies[key].RegExp;
     if (new RegExp(`(${_arr.join('|')})`).test(params.url)) {
       let _strategy = strategies[key];
       //后续 接口结构更新时，需要更新 _cVersion
       params._cVersion = params._cVersion || key;
       return mods[_strategy.handler](params, _strategy.options);
     }
   }
   //原项目的ajax 封装函数！
   return ajax(params);
}

```

- 模拟 workbox 策略函数实现

```js
/**
 *  获取 存储的 key 
 * @private
 */
function _storageKey(params) {
    /**
     * key:生成规则！[使用 _ 连接 。便于正则匹配 去删除 旧版本缓存数据]
     * cachePre : 提供一个统一前缀 ; 删除过期缓存时 避免删除其他业务缓存
     * _cVersion : 后续 接口结构更新时，同时更新 strategies.key 这样避免命中旧缓存
     * _unique:业务层没法通过入参data区分缓存 或者 经纬度类高精度参数无法命中等而不想使用data区分时的场景，自定义 key!
     * url 默认兼容处理：params.url || params.uri
     * type 默认兼容处理：params.type || params.method
     * data 默认兼容处理：params.data || params.params
     *
     */
    return `${cachePre}_${params._cVersion}_${params.url}_${params.type}_${params._unique ? params._unique : JSON.stringify(params.data || {})}`;
}

mods= {
/**
 * 缓存优先策略
 * 根据params获取缓存数据 & 根据options 获取有效期内的结果！ 没有或者失效时 更新
 * @param params :ajax 请求参数
 * @param options : strategies.options
 */
cacheFirst: function (params, options) {
    return new Promise((resolve, reject) => {
        getStorage(params, options, (_results) => {
            if (_results) {
                params.callback(_results.ajaxData, 100);
                resolve(_results.ajaxData);
            } else {
                let _callback = params.callback;
                if (_callback) {
                    params.callback = function (data, code) {
                        if (code === 100) {
                            //更新缓存 setStorage(params, data, options)
                            setStorage(params, data, options);
                        }
                        _callback(data, code);
                    }
                }
                //原项目的ajax 封装函数！
                ajax(params).then(data => {
                    if (!_callback) {
                        //更新缓存 setStorage(params, data, options)
                        setStorage(params, data, options);
                    }
                    resolve(data);
                }, err => reject(err));
            }
        });
    })
}

}
```

- 缓存配置

```js
const strategies = {
    // 接口结构改变时更新 v时间
    v2020_10_28_cacheFirst_min_5: {
        // 配置需要缓存的接口
        RegExp: ['cache/strategies'],
        // 缓存的策略
        handler: 'cacheFirst',
        // 控制参数
        options: {
            expiration: 60 * 5
        }
    }
};
```

- workbox 打包配置

```js
module.exports={
  // Other webpack config...
  plugins: [
    // Other plugins...
    new GenerateSW({
      swDest: 'service-worker.js',
      importWorkboxFrom: 'local',
      skipWaiting: true,
      clientsClaim: true,
      runtimeCaching: [
        {
          urlPattern: new RegExp(`(${strategies.v2020_10_28_cacheFirst_min_5.RegExp.join('|')}).*?_cache=true`),
          handler: 'cacheFirst',//cacheOnly 缓存被删除 时没法运行！
          options: {
            // Configure custom cache expiration.
            cacheName: 'cacheFirstWithMin_5',
            expiration: {
              maxEntries: 20,//不同参数
              maxAgeSeconds: 60 * 5,
              purgeOnQuotaError: true //当缓存达到最大容量时可设置purgeOnQuotaError: true,自动清除缓存； workbox v3.3.0
            },
            // Configure which responses are considered cacheable.
            cacheableResponse: {
              statuses: [0, 200],
            }
          }
        }
      ]
    })
  ]
}
```

## 通用依赖处理
- 业务层可以 不用重复处理这些通用的请求参数依赖
- 如果涉及amd异步加载依赖，需要维护 ajax 队列。类似于业务层先调用了还没有初始化好的依赖模块，等待依赖初始化完成，再去执行队列中的函数

```js

exports.requireAjax = function (params = {}) {
  //没有 依赖。返回true
  if (!params._requireKey) {
    return ajax(params);
  }
  
  return Promise.all(params._requireKey.map(item=>this[item.key](item))).then(dataArr=>{
    // 处理 通用数据 dataArr 到 params.data
    params.data = Object.assign({},params.data,...dataArr);
    return ajax(params);
  },err=>{
      // 涉及异步加载依赖模块时。等待依赖初始化完成，再去执行队列中的函数。 触发 resolve, reject 返回到业务层
      return new Promise((resolve, reject)=>{
         let _params = Object.assign({resolve, reject}, params); 
         promiseAjaxQueue.push(_params); 
      })
  })
}


exports.userInfo = function (params = {}) {
    return new Promise((resolve,reject)=>{
      // true 强依赖 | false: 尝试获取
      if(params.type){
         resolve({user:{}})
      }else{
         resolve({user:{}})
      }
    })
 
}
```

- 兼容 promise & callback & promiseAjaxQueue

```js
// promise & callback & promiseAjaxQueue
function ajax_callback(params){ 
    // 参数预处理    
    let _type = params.type || params.method || 'get';
 
    return axios(Object.assign({
             method: _type,
             url: params.url || params.uri
         }, 
        // 统一 get/ post 数据属性 
        _type === 'get' ? {params: params.data} : {data: params.data}))
        .then(res=>{
            // 抹平不同后台系统的 数据属性差异
            let code = res.code || res.status;
            let data = res.result || res.data;
            let msg = res.msg || res.message;
            // 抹平不同 业务系统的成功状态码
            if(code===100 || code==='100'){
                 params.callback && params.callback(res,100,msg)
                 if (params.resolve) {
                    //处理 ajax 队列的请求
                    params.resolve(res);
                 } else {
                    return res
                 }
            } else {
                 params.callback && params.callback(res)
                if(params.reject){
                     params.reject(res)
                }else{
                    return Promise.reject(res)
                }   
               
            }    
        },err=>{
            params.callback && params.callback(err)
           if(params.reject){
                params.reject(err)
           }else{
               return Promise.reject(err)
           } 
        })
}
```
