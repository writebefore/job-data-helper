/*
 * @Author: LHN
 * @Date: 2020-10-13 19:01:37
 * @LastEditors: LHN
 * @LastEditTime: 2020-10-13 23:21:03
 * @description: 获取用户所在城市
 * @FilePath: \job-data-helper\job-data-view\src\utils\mapServer\mapApi\getLocalCity.js
 */
// import axios from 'axios';
import jsonp from "jsonp";
import config from "../config.js";
import qs from "qs";
import {Toast} from 'vant';
import Vue from 'vue';
Vue.use(Toast);
const getUserLocalCity = () => {
  return new Promise((resolve, reject) => {
    Toast.loading({
      message: '定位中...',
      forbidClick: true,
      duration:0,
    })
    jsonp(
      config.getLocationUrl,
      {
        param: qs.stringify({
          key: config.key,
          output: "jsonp",
          callback: "",
        }),
      },
      (err, res) => {
        if (err) {
          Toast.clear();
          Toast.fail('定位失败')
          reject(err);
        }
        Toast.clear();
        resolve(res);
      }
    );
  });
};
export default getUserLocalCity;
