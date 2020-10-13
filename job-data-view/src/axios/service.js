/*
 * @Author: LHN
 * @Date: 2020-10-08 16:57:44
 * @LastEditors: LHN
 * @LastEditTime: 2020-10-11 15:57:00
 * @description: In User Settings Edit
 * @FilePath: \job-data-helper\job-data-view\src\axios\service.js
 */
import axios from "axios";
import qs from "qs";
import config from "./config";
import { Toast } from "vant";
import Vue from "vue";
Vue.use(Toast);

const service = axios.create({
  baseURL: config.baseURL,
  headers: config.headers,
  timeout: config.timeout, // 请求超时时间
  responseType: config.responseType,
});
const whiteList = ['/user/login', '/user/register'];
/****** request拦截器==>对请求参数做处理 ******/
service.interceptors.request.use(
  (config) => {
    if(!whiteList.includes(config.url)){
      config.headers["authorization"] = sessionStorage.getItem('authorization');
    }

    if (
      config.method.toLocaleUpperCase() === "POST" ||
      config.method.toLocaleUpperCase() === "PUT" ||
      config.method.toLocaleUpperCase() === "PATCH" ||
      config.method.toLocaleUpperCase() === "DELETE"
    ) {
      config.headers["Content-Type"] = "application/x-www-form-urlencoded";
      console.log(config);
      config.data = qs.stringify(config.data);
      return config;
    } else {
      config.params = { ...config.params };
    }
  },
  (err) => {
    //请求错误处理
    console.log("请求超时");
    Toast.fail("请求超时");
    return Promise.reject(err);
  }
);

/****** response拦截器==>对响应做处理 ******/
service.interceptors.response.use(
  (response) => {
    let res = response.data;
    if (res.code <= 0) {
      Toast.fail({
        message: res.msg,
        duration: 800,
      });
      return Promise.reject(res);
    } else {
      return res;
    }
  },
  (err) => {
    if (err && err.response) {
      switch (err.response.status) {
        case 400:
          err.message = "请求错误";
          break;

        case 401:
          err.message = "未授权，请登录";
          break;

        case 403:
          err.message = "拒绝访问";
          break;

        case 404:
          err.message = `请求地址出错: ${err.response.config.url}`;
          break;

        case 408:
          err.message = "请求超时";
          break;

        case 500:
          err.message = "服务器内部错误";
          break;

        case 501:
          err.message = "服务未实现";
          break;

        case 502:
          err.message = "网关错误";
          break;

        case 503:
          err.message = "服务不可用";
          break;

        case 504:
          err.message = "网关超时";
          break;

        case 505:
          err.message = "HTTP版本不受支持";
          break;

        default:
      }
    }
    return Promise.reject(err); // 返回接口返回的错误信息
  }
);

export default service;
