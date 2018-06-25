'use strict'
import $ from "jquery";

const dev = 'http://192.168.3.171:8080/mes-webapi/v1';  //测试
const product = "http://cmesapi.epipe.cn/mes-webapi/v1";  //正式
const baseURL = window.location.href.indexOf("app.epipe.cn")>0 ? product : dev;
// const baseURL = product;
function getCookie(name) {
  var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
  if (arr = document.cookie.match(reg))
    return unescape(arr[2]);
  else
    return null;
}
function getInitToken(){
  return getCookie("auth_token")?getCookie("auth_token"):"de573ef5-57d0-4635-a441-390a486b9fe7";
}
function getNewToken(){
  let new_token = "";
  $.ajax({
    type: "GET",
    url: baseURL+"/user/appToken",
    data:{
      token: getInitToken()
    },
    async: false,
    success: function(data){
      if(data.h.code === 200){
        new_token = data.b.authToken;
      }
    },
    error: function (err) {
      console.log("失败了",err);
    }
  });
  return new_token;
}

export default {
  name: "MES",
  get(url, params) {
    return $.ajax({
      type: "GET",
      url: baseURL+url,
      headers:{
        'auth_token': getNewToken()
      },
      data:params,
      success: function(res){
        return res;
      },
      error: function (err) {
        return err;
      }
    });
  }
}
