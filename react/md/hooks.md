# hooks
## 版本要求
- React 16.8.0 
- RN 0.59.0
##  使用的场景、范围
- 只能在函数最外层调用 Hook。不要在循环、条件判断或者子函数中调用。
- 只能在 React 的函数组件中调用 Hook。不要在其他 JavaScript 函数中调用。（还有一个地方可以调用 Hook —— 就是自定义的 Hook 中，我们稍后会学习到。）

## useState
- 对应 class 组件的 `this.state={} & setState({},()=>{})`

### 区别
- 初始化
```js
// class
class App extends Component(){
    constructor(){
        this.state = {
            obj: {
                a: 1,
                b: 2 
            }
        }
    }

    render(){
        return null
    }
}
// hooks
function hooks(props){
    const [hookObj, setHookObj] = useState({ a: 1, b: 2 });

    return null
}
```
- 更新


|         |class     |hooks|
|:----:   |:----     |----:|
|初始化    | constructor 构造函数中 `this.state={}` | 函数初始化时 `const [hookObj, setHookObj] = useState({ a: 1, b: 2 })` |
|更新      | setState({},()=>{}) | 函数初始化时执行一次 |
