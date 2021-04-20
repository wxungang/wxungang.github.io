module.exports = {
    "root": true,
    // "parser": "babel-eslint",//not for vue
    "parserOptions": {
        "parser": "babel-eslint",//for vue
        "ecmaVersion": 8,
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
        "overwritten": true,
        "UP": true,
        "$script": false,
        "require": false,
        "_ISPROD_": false,
        "_ISLOG_": false,
        "_VERSION_": false,
        "process": false
    },
    "extends": [
        //"plugin:flowtype/recommended",
        'eslint:recommended',
        // 'plugin:vue/recommended',
        'plugin:react/recommended'
    ],
    "plugins": [
        //"flowtype",
        // "vue",
        "react"
    ],
    "settings": {
        "flowtype": {
            "onlyFilesWithFlowAnnotation": true,//只检查 声明 flow语法的文件
        }
    },
    "rules": {
        "semi": [1, "always"],//语句强制分号结尾
        "no-extra-semi": 1,//多余的分号
        "camelcase": 1,
        "no-alert": 2,//
        "no-console": 1,
        "no-labels": 2,//
        "no-multi-str": 2,//多行字符串
        "no-sequences": 2,//逗号运算符 var c=a,b;
        //Best Practices
        "no-with": 2,
        "no-caller": 2,
        "no-eval": 2,
        "no-eq-null": 2,
        "no-unused-vars": 1,//未使用的变量
        "no-undef": 2,//no undefined
        "eqeqeq": 1,//===
        "block-scoped-var": 2,//块级内禁止使用var
        "vars-on-top": 1,//
        "curly": [2, "all"],//if(){ }
        //ES6
        "no-var": 1,//使用let const
        //Stylistic Issues
        "one-var": 0,
        "no-inline-comments": 1,//行内注释
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
        // //vue/rules to override the default
        // "vue/no-confusing-v-for-v-if": 1,//v-if 在v-for 内层使用
        // "vue/require-v-for-key": 1,//v-for 需要绑定 key
        // "vue/valid-v-for": 1
    }
}
