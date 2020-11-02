# npm

## node 多版本维护
> nvm

## npm 源维护
> npm i nrm -g

## npm 下全局安装了哪些包
> `npm list -g --depth 0` 不输出依赖包关系 或者 `npm list -g --depth` 会输出包的详细依赖关系。


## 多命令
> 并行 `"start": "npm run start_1 & npm run start_2 & wait"` 
> 串行 `"start": "npm run start_1 && npm run start_2 && wait"`
