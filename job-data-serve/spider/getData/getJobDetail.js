/*
 * @Author: LHN
 * @Date: 2020-10-23 21:19:39
 * @LastEditors: LHN
 * @LastEditTime: 2020-10-24 18:15:37
 * @description: In User Settings Edit
 * @FilePath: \job-data-helper\job-data-serve\spider\getData\getJobDetail.js
 */
const https = require("https");
const hostname = "www.lagou.com";
const getJobDetailRegexp = /<div class="job-detail">([\s\S]+?)<\/div>/;
const getJobDetail = (positionId) => {
  console.log(positionId);
  return new Promise((resolve, reject) => {
    const option = {
      hostname,
      path: `/jobs/${positionId}.html`,
      headers: {
        Connection: "keep-alive",
        "Cache-Control": "max-age=0",
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/85.0.4183.102 Safari/537.36",
        Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,",
        "Accept-Language": "zh-CN,zh;q=0.9",
      },
    };

    https.get(option, (res) => {
        let html = "";
        res.on("data",(d) => {
            html += d;
        });

        res.on("end",() =>{
            let jobDetail = getJobDetailRegexp.exec(html);
            if(jobDetail == null) reject("null");
            resolve(jobDetail[1])
        });
    }).on("error", (e) => {
        console.error(e);
        reject(e);
    })
  });
};
getJobDetail("7491450");
module.exports = getJobDetail
