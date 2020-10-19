/*
 * @Author: LHN
 * @Date: 2020-10-12 19:25:52
 * @LastEditors: LHN
 * @LastEditTime: 2020-10-19 16:44:28
 * @description: In User Settings Edit
 * @FilePath: \job-data-helper\job-data-serve\spider\getData\getCityList.js
 */
const https = require("https");
const hostname = "www.lagou.com";
const getCityRegexp = /value="https:\/\/www.lagou\.com\/jobs\/list_\?&city=(?<city>.+)#/g; //正则匹配城市名称

/**
 * 发送接口请求获取城市列表
 */
const getCityList = () => {
  return new Promise((resolve, reject) => {
    const option = {
      hostname,
      path: "/jobs/allCity.html",
      headers: {
        Connection: "keep-alive",
        "Cache-Control": "max-age=0",
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/85.0.4183.102 Safari/537.36",
        Accept:
          "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,",
        "Accept-Language": "zh-CN,zh;q=0.9",
      },
    };

    https
      .get(option, (res) => {
        let html = "";
        res.on("data", (d) => {
          html += d;
        });

        res.on("end", () => {
          let cityArr = [];
          let city;
          while ((city = getCityRegexp.exec(html)) != null) {
            cityArr.push(city[1]);
          }
          resolve(cityArr);  // 数组中第一个元素为'全国'
        });
      })
      .on("error", (e) => {
        console.error(e);
        reject(e);
      });
  });
};
module.exports = getCityList