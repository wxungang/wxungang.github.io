#!/bin/bash

##########################################
#  shell 脚本
##########################################

# 定义变量
echo '定义变量'
var_string='string'
var_string_bad=string
var_number=1

branchName=`git symbolic-ref HEAD 2>/dev/null | cut -d"/" -f 3`

# $var_string_bad 下划线的变量 无法通过 $var_name 获取。
echo "输出变量:${var_string}_${var_string_bad}_${var_number}_$branchName"

