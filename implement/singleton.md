# 单例 & 多例
> 单例和多例混合封装使用

## 实现
- 多例
```js
// moduleA.js
export default class module {
  constructor() {

  }
}
// moduleB.js

new module();
```

- 单例
```js
// moduleA.js
let instance = null;
class module {
 constructor() {

  }
}
export default function getInstance() {
  if(!instance){
    instance = new module();
  }

  return instance;
}
// moduleB.js
getInstance()

```

- 混合
```js
// moduleA.js
let instance = null;
export default class module {
 constructor() {

  }
 
  static getInstance() {
   if(!instance){
     instance = new module();
   }
 
   return instance;
 }
}

// moduleB.js

module.getInstance()

new module();
```

