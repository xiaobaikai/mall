/**
 * Created by ZWH on 2017/9/4.
 */
import axios from "axios";
/*配置axios的默认*/
axios.defaults.withCredentials = true;
axios.defaults.timeout = 5000;

const dev = 'http://192.168.3.166:8280/member/v1'; //测试
// const dev = 'http://192.168.3.29:8280/member/v1';//彭文浩本地
const product = "http://app.epipe.cn:18080/member/v1"; //正式
//axios.defaults.baseURL = window.location.href.indexOf("app.epipe.cn")>0 ? product : dev;
 axios.defaults.baseURL = product;


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
        //  config.headers.auth_token = "900ec557-3422-445d-8291-a3edc3fba5a1";
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
