/*
 * @Author: LHN
 * @Date: 2020-10-14 18:51:20
 * @LastEditors: LHN
 * @LastEditTime: 2020-10-15 23:07:47
 * @description: In User Settings Edit
 * @FilePath: \job-data-helper\job-data-serve\spider\getData\getJobData.js
 */
const https = require("https");
const qs = require("qs");
const Services = require("../../services/index");
const getPageNumRegexp = /totalNum">(?<pageNum>[0-9]+)<\/span>/;
let Cookie = "";
let allPageNum = 0;

const delay = 0; // 每个页面的爬取间隔
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
    console.log(`总共页面: ${allPageNum}, 当前页面: ${pageNum}`);
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
            console.log("页面总数据:" + jobData.length);
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
                  companyLabelList,
                  city: jobCity,
                  salary,
                  salaryMonth,
                  workYear,
                  jobNature,
                  education,
                  positionAdvantage,
                } = item;
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
                  companyLabelList,
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
        console.log("problem with request: " + e.message);
        reject(err);
      });
    });
    req.write(qs.stringify(data));
    req.end();
  });
};

const getJobData = function (jobName, city, pageNum = 1) {
  return new Promise((resolve, reject) => {
    if (Cookie === "") {
      getPageNum(jobName, city, pageNum)
        .then((res) => {
          console.log(res);
          getJobDataList(jobName, city, pageNum)
            .then((res) => {
              if (res <= allPageNum) {
                getJobData(jobName, city, res);
              } else {
                Cookie = "";
                allPageNum = 0;
                resolve(`${jobName},${city}获取数据完成`);
              }
            })
            .catch((err) => {
              if (typeof err === "number") {
                setTimeout(() => {
                  getJobData(jobName, city, err);
                }, delay);
              } else {
                reject(err);
              }
            });
        })
        .catch((err) => {
          if (typeof err === "number") {
            setTimeout(() => {
              getJobData(jobName, city, err);
            }, delay);
          } else {
            reject(err);
          }
        });
    } else {
      getJobDataList(jobName, city, pageNum)
        .then((res) => {
          if (res <= allPageNum) {
            setTimeout(() => {
              getJobData(jobName, city, res);
            }, delay);
          } else {
            Cookie = "";
            allPageNum = 0;
            resolve(`${jobName},${city}获取数据完成`);
          }
        })
        .catch((err) => {
          if (typeof err === "number") {
            setTimeout(() => {
              getJobData(jobName, city, err);
            }, delay);
          } else {
            reject(err);
          }
        });
    }
  })
};

module.exports = getJobData;
