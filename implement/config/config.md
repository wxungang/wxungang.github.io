## 项目通用规范配置

### 格式化
> 处理不同编辑器 或者 不同用户的格式化风格问题。

.editorconfig 
- 编辑器基本都支持覆盖默认的格式化设置
```
# editorconfig.org
root = true

[*]
indent_style = tab
indent_size = 4
end_of_line = lf
charset = utf-8
trim_trailing_whitespace = true
insert_final_newline = true
# 控制一行最大字符长度
max_line_length = 250

[package.json]
indent_style = tab
indent_size = 2

[*.md]
trim_trailing_whitespace = false

```
.prettierrc.js
- 可配置性更强。可以配置编辑器，也可以配合git的hooks，自动处理。
```
// prettier.config.js or .prettierrc.js
module.exports = {
	// 末尾加逗号
	trailingComma: 'none',
	tabWidth: 4,
	semi: true,
	// 单引号
	singleQuote: true,
	printWidth: 250,
};

```

### 校验
> 增强代码规范，避免可能的bug。也可以起到统一代码风格问题

.eslintrc.js
- 可以配合编辑器实时提示
- 也可以配合打包，强制不合规范的中断执行。
```
module.exports = {
	"root": true,
	"parser": "babel-eslint",//not for vue
	"parserOptions": {
		// "parser": "babel-eslint",//for vue put in here!
		"ecmaVersion": 6,
		"sourceType": "module",
		"impliedStrict ": true,
		"ecmaFeatures": {
			"jsx": true
		}
	},
	"env": {
		"browser": true,
		"es6": true
	},
	"globals": {
		"exports": false,
		"module": true,
		"process": false,
		"require": true,
		"global": true,
		"__dirname": true,
		"define":true,
		"$":true
	},
	"extends": [
		// 'eslint:recommended',
		// "plugin:flowtype/recommended",
	],
	"plugins": [
		"flowtype",
	],
	"settings": {
		"flowtype": {
			"onlyFilesWithFlowAnnotation": true,//只检查 声明 flow 语法的文件
		},
	},
	"rules": {
		//base rules
		// "semi": [0, "always"],//语句强制分号结尾
		// "no-extra-semi": 2,//多余的分号
		// "camelcase": 0,
		// "no-alert": 2,//
		// "no-console": 0,
		// "no-labels": 2,//
		// "no-multi-str": 2,//多行字符串
		// "no-sequences": 2,//逗号运算符 var c=a,b;
		// //Best Practices
		// "no-with": 2,
		// "no-caller": 2,
		// "no-eval": 2,
		// "no-eq-null": 2,
		// "no-unused-vars": 2,//未使用的变量
		// "no-undef": 2,//no undefined
		// "eqeqeq": 2,//===
		// "block-scoped-var": 2,//块级内禁止使用var
		// "vars-on-top": 1,//
		// "curly": [2, "all"],//if(){ }
		// //ES6
		// "no-var": 2,//使用let const
		// //Stylistic Issues
		// "one-var": 0,
		// "no-inline-comments": 0,//行内注释
		//flow rules
		// "flowtype/define-flow-type": 2,
		// "flowtype/no-weak-types": 2,
		// "flowtype/require-parameter-type": 2, //强制 参数类型
		// "flowtype/no-types-missing-file-annotation": 2,//强制声明是否采用flow 语法
		// "flowtype/semi": [
		//     2,
		//     "always"
		// ],
		// "flowtype/use-flow-type": 2,
		//vue/rules to override the default
		// "vue/no-confusing-v-for-v-if": 1,//v-if 在v-for 内层使用
		// "vue/require-v-for-key": 1,//v-for 需要绑定 key
		// "vue/valid-v-for": 1
		//react rules
		// "react/jsx-uses-vars": 2,
		// "react/prop-types": 2
	}
}
```

### git hooks校验

.commitlintrc.js 
- 配合husky模块执行hooks校验脚本。
```
module.exports = {
	extends: ['@commitlint/config-conventional'],
	rules: {
		'body-leading-blank': [1, 'always'],
		'body-max-line-length': [2, 'always', 100],
		'footer-leading-blank': [1, 'always'],
		'footer-max-line-length': [2, 'always', 100],
		'header-max-length': [2, 'always', 100],
		'scope-case': [1, 'always', 'lower-case'],
		'subject-case': [1, 'never', ['sentence-case', 'start-case', 'pascal-case', 'upper-case']],
		// 具体内容不能为空
		'subject-empty': [2, 'never'],

		'subject-full-stop': [1, 'never', '.'],
		// 类型小写
		'type-case': [2, 'always', 'lower-case'],
		// 不能为空
		'type-empty': [2, 'never'],
		/*
		 * type(scope?): subject  #scope is optional
		 *
		 * build: 打包相关
		 * chore: 构建过程或辅助工具的变动 (eslint\ignore\pretty等)
		 * ci: 集成、自动化部署相关 (eg:Travis，Jenkins，GitLab CI，Circle 等)
		 * docs: 文档相关
		 * feat: 新增功能 (feature)
		 * fix: 已有功能 bug 修复
		 * perf: 性能、优化相关 (performance)
		 * refactor: 项目重构 (不增加新功能、不改 bug 等)
		 * revert: 代码回退
		 * style: 样式相关
		 * test: 测试相关
		 *
		 */
		'type-enum': [2, 'always', ['build', 'chore', 'ci', 'docs', 'feat', 'fix', 'perf', 'refactor', 'revert', 'style', 'test']],
	},
}
```
protectBranch.js
```
const fs = require('fs')
const gitBranchFile = './.git/HEAD'
const protectBranchs = ['master', 'dev', 'mock-201912-2.0.1', 'mock-202011-3.0']
const regExp = new RegExp(`refs/heads/(${protectBranchs.join('|')})\\b`)
let gitBranchInfo = fs.readFileSync(gitBranchFile, 'utf8')
// console.log(gitBranchInfo)
// console.log(regExp)
let isProtectBranch = regExp.test(gitBranchInfo)
// console.log(isProtectBranch)
console.log('提交不规范，回退泪纵横')
console.log('受保护的分支：', protectBranchs, '！请先新建分支，然后通过 pull requests 提交您的代码 & 备注您的代码解决的相关问题！')
// 1:终止
process.exit(isProtectBranch)
```