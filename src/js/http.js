/**
 * Created by JJH on 2017/9/27.
 */
import axios from "axios";
/*配置axios的默认*/
axios.defaults.withCredentials = true;
axios.defaults.timeout = 5000;

const dev = 'http://192.168.3.166:8280/member/v1'; //测试
// const dev = 'http://192.168.3.185:8280/member/v3'; // 闵文杰
// const dev = 'http://192.168.3.29:8280/member/v1'; //自动化测试
// const dev = 'http://192.168.3.241:8882/member/v1'; //自动化测试
const product = 'https://apps.epipe.cn/member/v1';//正式环境
// const product = "http://21874u8g05.iask.in:19054/member/v1"; //正式
axios.defaults.baseURL = window.location.href.indexOf("apps.epipe.cn")>0 ? product : dev;
//  axios.defaults.baseURL = product;

function getCookie(name) {
  var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
  if (arr = document.cookie.match(reg)){
    let str = unescape(arr[2]);
    return str;
  }else{
    return null;
  }
};

axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;'

if (getCookie("auth_token")) {
  window.localStorage.setItem("auth_token",getCookie("auth_token"));
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
