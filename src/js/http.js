/**
 * Created by ZWH on 2017/9/4.
 */
import axios from "axios";
/*配置axios的默认*/
axios.defaults.withCredentials = true;
axios.defaults.timeout = 5000;

const dev = 'http://192.168.3.166:8280/member/v1'; //测试
const product = "http://app.epipe.cn:18080/member/v1"; //正式
// axios.defaults.baseURL = window.location.href.indexOf("app.epipe.cn")>0 ? product : dev;
axios.defaults.baseURL = product;

function getCookie(name) {
  var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
  if (arr = document.cookie.match(reg))
    return unescape(arr[2]);
  else
    return null;
};


localStorage.setItem('abc','11111')


if (getCookie("auth_token")) {
  window.localStorage.setItem("auth_token",getCookie("auth_token"));
}

window["epipe_getcookie_callback"] = (value) => {
  window.localStorage.setItem("auth_tokens",value)
}

axios.interceptors.request.use(
  config => {
    if(getCookie("auth_token")){
      if(!config.headers.auth_token){
        config.headers.auth_token = getCookie("auth_token");
      }
      window.localStorage.setItem("auth_token",getCookie("auth_token"));
    }else{
      if(!config.headers.auth_token){
        config.headers.auth_token = window.localStorage.auth_token;
        //  config.headers.auth_token = "83107e8c-d101-447d-97ed-478233751c94";
      }
    }
    return config;
  },
  err => {
    return Promise.reject(err);
  });

// http响应拦截器
axios.interceptors.response.use(data => {// 如果code是10  就是token过期了
  if (data.data.h.code == 10) {
    window.location.href = "epipe://?&mark=login_out"
  }
  return data
}, error => {
  return Promise.reject(error)
})

export default axios
