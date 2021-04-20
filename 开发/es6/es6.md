# ES6



### 常用
- Object.assign(target,src1,src2,...);
```
//copy then change it
let _params = Object.assign({}, action.params);
//error way  Object.assign(target,src1,src2,...);
let _params = Object.assign(action.params); 
```