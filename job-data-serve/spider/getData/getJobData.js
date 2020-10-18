/*
 * @Author: LHN
 * @Date: 2020-10-14 18:51:20
 * @LastEditors: LHN
 * @LastEditTime: 2020-10-18 23:33:55
 * @description: In User Settings Edit
 * @FilePath: \job-data-helper\job-data-serve\spider\getData\getJobData.js
 */
const https = require("https");
const qs = require("qs");
const Services = require("../../services/index");
const getPageNumRegexp = /totalNum">(?<pageNum>[0-9]+)<\/span>/;
let Cookie = "";
let allPageNum = 0;

const delay = 5000; // 每个页面的爬取间隔
// 获取查询的页面数量
const getPageNum = function (jobName, city, pageNum) {
  let first_request_url = encodeURI(
    `https://www.lagou.com/jobs/list_${jobName}?city=${city}&cl=false&fromSearch=true&labelWords=&suginput=`
  );
  console.log("请求url为: " + first_request_url);
  return new Promise((resolve, reject) => {
    https
      .get(first_request_url, (res) => {
        console.log("Cookie: " + res.headers["set-cookie"]);
        Cookie = res.headers["set-cookie"];
        let html = "";
        res.on("data", (d) => {
          html += d;
        });
        res.on("end", () => {
          allPageNum = getPageNumRegexp.exec(html);
          if (!allPageNum) {
            reject(pageNum);
          } else {
            allPageNum = allPageNum.groups.pageNum;
            console.log(`总页数:${allPageNum}`);
            resolve({ allPageNum, Cookie });
          }
        });
      })
      .on("error", (e) => {
        console.log(e);
        reject(e);
      });
  });
};

const getJobDataList = function (jobName, city, pageNum = 1) {
  return new Promise((resolve, reject) => {
    console.log(
      `总共页面: ${allPageNum}, 当前页面: ${pageNum}, 当前城市: ${city}, 当前项目: ${jobName}`
    );
    const option = {
      host: "www.lagou.com",
      path: encodeURI(
        `/jobs/positionAjax.json?city=${city}&needAddtionalResult=false`
      ),
      // url:`https://www.lagou.com/jobs/positionAjax.json?city=${city}&needAddtionalResult=false`,
      headers: {
        Connection: "keep-alive",
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/85.0.4183.102 Safari/537.36",
        Accept: "application/json, text/javascript, */*; q=0.01",
        "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
        Cookie,
        Referer: encodeURI(
          `https://www.lagou.com/jobs/list_${jobName}?city=${city}&cl=false&fromSearch=true&labelWords=&suginput=`
        ),
      },
      method: "post",
    };
    const data = {
      pn: pageNum,
      kd: jobName,
    };
    let jobData = ""; // 请求返回的数据
    const req = https.request(option, (res) => {
      res.setEncoding("utf-8");
      res.on("data", (d) => {
        jobData += d;
      });

      res.on("end", () => {
        jobData = JSON.parse(jobData);
        console.log(jobData);
        try {
          if (jobData.msg === "您操作太频繁,请稍后再访问") {
            Cookie = "";
            reject(pageNum);
          } else {
            jobData = jobData.content.positionResult.result;
            console.log(
              `页面总数据: ${jobData.length !== undefined ? jobData.length : 0}`
            );
            jobData.forEach(async (item, index) => {
              const job = await Services.findOneJobService(item.positionId);
              if (job) {
                console.log("数据已存在");
                if (index === jobData.length - 1) {
                  resolve(pageNum + 1);
                }
              } else {
                const {
                  positionId,
                  positionName,
                  companyFullName,
                  companyShortName,
                  companyLogo,
                  companySize,
                  industryField,
                  financeStage,
                  skillLables: skillLabels, // 爬下来的数据原名称为skillLables
                  companyLabelList,
                  latitude,
                  longitude,
                  city: jobCity,
                  salary,
                  salaryMonth,
                  workYear,
                  jobNature,
                  education,
                  positionAdvantage,
                } = item;
                console.log(item);
                const res = await Services.addJobService(
                  positionId,
                  jobName,
                  positionName,
                  companyFullName,
                  companyShortName,
                  companyLogo,
                  companySize,
                  industryField,
                  financeStage,
                  skillLabels,
                  companyLabelList,
                  { latitude, longitude },
                  jobCity,
                  salary,
                  salaryMonth,
                  workYear,
                  jobNature,
                  education,
                  positionAdvantage
                );
                console.log(res);
                if (index === jobData.length - 1) {
                  resolve(pageNum + 1);
                }
              }
            });
          }
        } catch (err) {
          console.log(err);
          reject(err);
        }
      });
      req.on("error", function (e) {
        console.log("problem with request: " + e);
        reject(err);
      });
    });
    req.write(qs.stringify(data));
    req.end();
  });
};

const getJobData = function (jobName, city, pageNum = 1) {
  return new Promise(async (resolve, reject) => {
    const tmpFun = async function (jobName, city, pageNum) {
      try {
        if (Cookie === "") {
          const getPageNumRes = await getPageNum(jobName, city, pageNum);
          console.log(getPageNumRes);
        }
        const getJobDataListRes = await getJobDataList(jobName, city, pageNum);
        if (getJobDataListRes <= allPageNum) {
          tmpFun(jobName, city, getJobDataListRes);
        } else {
          Cookie = "";
          pageNum = 0;
          resolve(`${jobName},${city}获取数据完成`);
        }
      } catch (e) {
        if (typeof e === "number") {
          Cookie = "";
          setTimeout(() => {
            tmpFun(jobName, city, e);
          }, delay);
        } else {
          reject(e);
        }
      }
    };
    tmpFun(jobName, city, pageNum);
  });
};

module.exports = getJobData;
