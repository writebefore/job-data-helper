/*
 * @Author: LHN
 * @Date: 2020-10-23 21:19:39
 * @LastEditors: LHN
 * @LastEditTime: 2021-03-07 18:10:41
 * @description: In User Settings Edit
 * @FilePath: \job-data-helper\job-data-serve\spider\getData\getJobDetail.js
 */
const https = require("https");
const UserAgent = require("user-agents");
const hostname = "m.lagou.com";
const userAgent = new UserAgent({ deviceCategory: 'mobile' });
const getJobDetailRegexp = /<div class="content">([\s\S]+?)<\/div>/;
const getJobDetail = (positionId) => {
  console.log('positionId',positionId);
  console.log('ua', userAgent.toString());
  return new Promise((resolve, reject) => {
    const option = {
      hostname,
      path: `/jobs/${positionId}.html`,
      headers: {
        Connection: "keep-alive",
        "Cache-Control": "max-age=0",
        "User-Agent": userAgent.toString(),
        Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
        "Accept-Language": "zh-CN,zh;q=0.9",
        referer: `https://${hostname}/jobs/${positionId}.html`,
        "cache-control": "max-age=0"
      },
    };

    https.get(option, (res) => {
        let html = "";
        res.on("data",(d) => {
            html += d;
        });

        res.on("end",() =>{
            let jobDetail = getJobDetailRegexp.exec(html);
            console.log('statusCode:' + res.statusCode);
            if(jobDetail == null) {
              reject(null);
              return;
            };
            resolve(jobDetail[1])
        });
    }).on("error", (e) => {
        console.error(e);
        reject(e);
    })
  });
};
module.exports = getJobDetail
