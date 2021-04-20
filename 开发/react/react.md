## react 
> react 中的一些 汇总！
### state 
- this.setState() 是异步的！
```

this.setState({
  key:newValue
},function(){
    
});

this.setState({
   obj:Object.assign(this.state.obj,{key:newValue})
},function(){
    
});

this.setState((prevState, props) => {
  return {counter: prevState.counter + props.step};
},function(){
    
});

```

- 非引用传递
```
let arr=this.state.arr
arr.push(item) //不会导致state.arr 改变！
```

- 计算属性可以实时更新
```jsx
 const {billInfo} = this.props;
 //then 
 cptBillInfo=()=>{
    return this.state.flag?newObj1:newObj2;
 }
 
 render(){
    // cptBillInfo will update if this.state.flag changed async!
    let cptBillInfo = cptBillInfo();
    return <div>{cptBillInfo.key}</div>
 }
 
```

### props
- key : 不要使用数组的index。


### store
- important : 千万不要改变action 传过来的参数。
```
//copy then change it
let _params = Object.assign({}, action.params);
//error way  Object.assign(target,src1,src2,...);
let _params = Object.assign(action.params); 

不拷贝一份操作会导致所有的action联动反应。
```
- Object.assign(state, action.params); 不会改变state
```
Object.assign(state, action.params); 不会改变state
//

```

## 更新一次问题
- constructor  componentWillMount  componentDidMount 等只会执行一次。所以注意状态更新的问题
```jsx harmony
constructor(props) {
    //只会在 初始化时执行一次。 所以 props 更新的时候要格外关注！
    super(props);
    this.state = {
      isInner: !!(props.queryInfo.isInner == 1)
    }
  }

``` 

## others
- <div>{ function}</div>
```jsx
//三目运算符
<div>{ flag?1:0}</div>

//function
<div>{lists.map(item=>item)}</div>

//error : 这种没有有效的返回值
<div>{ state.a + state.b}</div>

```


