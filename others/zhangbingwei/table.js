/**
 * Created by xiaogang on 2017/10/11.
 */
"use strict";

/**
 *
 * @param data
 */
function table(data, target) {
    var html = '';
    html += `<caption>${data.title}</caption>`;
    for (let item in data.head) {
        html += `<th>${data.head[item]}</th>`
    }
    for (let row in data.data) {
        let _tr = '';
        for (let key in data.data[row]) {
            _tr += `<td>${data.data[row][key]}</td>`
        }
        html += `<tr>${_tr}</tr>`;
    }

    console.log(html);
    document.getElementById(target).innerHTML = html;
}


var yourTable = {
    title: '动态数据！',
    head: ['用户名', '性别', '其他'],
    data: [
        ['张丙卫', '男', 'IT'],
        ['郑大姐', '女', '金融女博士'],
        ['动态数据', '中', '可以通过ajax 覆盖 数据']
    ]
}

table(yourTable, 'table');