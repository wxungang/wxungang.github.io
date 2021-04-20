/**
 * Created by xiaogang on 2017/8/13.
 */
"use strict";

var util = util || {};

/**
 *
 * @param ts
 * @returns {*|XML|string}
 */
util.fmtFullYMDHMS = (ts, joiner) => {
  const date = new Date();
  console.log(date);
  let dateArr = [];
  dateArr.push(date.getFullYear());
  dateArr.push((date.getMonth() + 1));
  dateArr.push(date.getDate());
  dateArr.push(date.getHours());
  dateArr.push(date.getMinutes());
  dateArr.push(date.getSeconds());

  console.log(dateArr);
  return dateArr.map(x => x > 10 ? x : '0' + x).join(joiner || '');

};

Date.prototype.Format = function (fmt) {
  var o = {
    "y+": this.getFullYear(),                 //年
    "M+": this.getMonth() + 1,                 //月份
    "d+": this.getDate(),                    //日
    "h+": this.getHours(),                   //小时
    "m+": this.getMinutes(),                 //分
    "s+": this.getSeconds(),                 //秒
    "q+": Math.floor((this.getMonth() + 3) / 3), //季度
    "D+": this.getDay(),                      //星期 几
    "S+": this.getMilliseconds()             //毫秒
  };

  console.log(o);

  for (var k in o) {
    if (new RegExp("(" + k + ")").test(fmt)) {
      if (k == "y+") {
        fmt = fmt.replace(RegExp.$1, ("" + o[k]).substr(4 - RegExp.$1.length));
      }
      else if (k == "S+") {
        var lens = RegExp.$1.length;
        lens = lens == 1 ? 3 : lens;
        fmt = fmt.replace(RegExp.$1, ("00" + o[k]).substr(("" + o[k]).length - 1, lens));
      }
      else {
        fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
      }
    }
  }
  return fmt;
};