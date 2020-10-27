# ajax
> ajax 实践小结

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

## 简单的封装
```js
// 业务调用
ajax({
    uri:'',
    params:{}
}).then(data=>{
    //直接处理 正常业务逻辑
},err=>{
    // do something
})

// 统一封装
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
            // 抹平不同的 状态码
            if(code===100 || code==='100'){
                // 返回 统一的 数据结构
                return {code,data,msg}
            } else {
                return Promise.reject({code,data,msg})
            }    
        },err=>{
           return Promise.reject(err)
        })
}

// 统一封装 & callback
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
            // 抹平不同的 状态码
            if(code===100 || code==='100'){
                // 返回 统一的 数据结构
                return params.callback?params.callback({code,data,msg},100,msg):{code,data,msg}
            } else {
                return params.callback?params.callback({code,data,msg},0,msg):Promise.reject({code,data,msg})
            }    
        },err=>{
           return Promise.reject(err)
        })
}
```
