/**
 * Created by lenovo on 2017/6/12.
 */
const Util = {
  getNewTime: function (date, mark) {  //时间格式转换
    let datesave = new Date(date);
    if (mark == '年月日') {
      return datesave.getFullYear() + '年' + (datesave.getMonth() + 1) + '月' + datesave.getDate() + '日'
    } else if (mark == '年月') {
      return datesave.getFullYear() + '年' + (datesave.getMonth() + 1) + '月'
    } else if (mark == '月日') {
      return (datesave.getMonth() + 1) + '月' + datesave.getDate() + '日'
    } else if (mark == "当月第一天") {
      return datesave.getFullYear() + '-' + (datesave.getMonth() + 1) + '-1'
    } else {
      return datesave.getFullYear() + '-' + (datesave.getMonth() + 1) + '-' + datesave.getDate()
    }
  },
  HTMLDecode: function (input) {  //解析标签
    let converter = document.createElement("DIV");
    converter.innerHTML = input;
    let output = converter.innerText;
    converter = null;
    return output;
  },
  Title_format: function (str) {  //去除标题里面的乱码
    var arrEntities={'lt':'<','gt':'>','nbsp':' ','amp':'&','quot':'"','ldquo':'"','rdquo':'"','mdash':'_','middot':'·','hellip':'......','rsquo':"'",'lsquo':"'"};
    str = str.replace(/&(lt|gt|nbsp|amp|quot|ldquo|rdquo|mdash|middot|hellip|rsquo|lsquo);/ig,function(all,t){ return arrEntities[t]});
    str = str.replace(/%/g, "%25").replace("+", "%2B").replace(" ", "%20").replace("/", "%2F").replace("?", "%3F").replace("#", "%23").replace(/&/g, "%26").replace("=", "%3D")
    return str
 
  },
  GetPreMonth: function (mydate) {  //前一个月
    let arr = mydate.split('-');
    let year = arr[0]; //获取当前日期的年份
    let month = arr[1]; //获取当前日期的月份
    let day = arr[2]; //获取当前日期的日
    let days = new Date(year, month, 0);
    days = days.getDate(); //获取当前日期中月的天数
    let year2 = year;
    let month2 = parseInt(month) - 1;
    if (month2 == 0) {
      year2 = parseInt(year2) - 1;
      month2 = 12;
    }
    let day2 = day;
    let days2 = new Date(year2, month2, 0);
    days2 = days2.getDate();
    if (day2 > days2) {
      day2 = days2;
    }
    if (month2 < 10) {
      month2 = '0' + month2;
    }
    let t2 = year2 + '/' + month2 + '/' + day2;
    return t2;
  },
  GetNextMonth: function (mydate) {  //后一个月
    let arr = mydate.split('-');
    let year = arr[0]; //获取当前日期的年份
    let month = arr[1]; //获取当前日期的月份
    let day = arr[2]; //获取当前日期的日
    let days = new Date(year, month, 0);
    days = days.getDate(); //获取当前日期中的月的天数
    let year2 = year;
    let month2 = parseInt(month) + 1;
    if (month2 == 13) {
      year2 = parseInt(year2) + 1;
      month2 = 1;
    }
    let day2 = day;
    let days2 = new Date(year2, month2, 0);
    days2 = days2.getDate();
    if (day2 > days2) {
      day2 = days2;
    }
    if (month2 < 10) {
      month2 = '0' + month2;
    }

    let t2 = year2 + '/' + month2 + '/' + day2;
    return t2;
  },
  getUrlValue:function(str){
      let len = str.length;
      str = location.href.slice(location.href.indexOf(str)+len)
      return str = str.slice(0,( str.indexOf('&')))

  }
}
module.exports = Util
