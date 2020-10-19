/*
 * @Author: LHN
 * @Date: 2020-10-18 15:06:37
 * @LastEditors: LHN
 * @LastEditTime: 2020-10-19 20:24:07
 * @description: In User Settings Edit
 * @FilePath: \job-data-helper\job-data-serve\controllers\jobController.js
 */
const Response = require("../entity/index");
const Services = require("../services/index");
const config = require("../config");
const Knuth = require("../utils/Knuth");
const getJobData = async function (ctx, next) {
  try {
    const { city, searchKey } = ctx.request.query;
    console.log(`查找信息为${city},${searchKey}`); 
    let allJobData = await Services.findJobDataService(searchKey, city);
    allJobData = Knuth(allJobData); // 洗牌算法打乱结果
    const jobData = [];
    const jobListId = allJobData.map((item, index) => {
      if (index < config.getJobDataLimit) {
        jobData.push(item);
      }
      return item.positionId;
    });
    ctx.status = 200;
    ctx.body = new Response(1, "首次获取职位信息成功", {
      jobListId,
      jobData,
      everyGetLimit: config.getJobDataLimit,
    });
  } catch (err) {
    console.log(err);
    ctx.status = 500;
    ctx.body = new Response(-1, "首次获取职位信息失败", {});
  }
};

const getMoreJobData = async function (ctx, next) {
  const res = await Services.getMoreJobDataService([
    "7186964",
    "7262224",
    "7337792",
    "7660926",
    "7247860",
    "7030248",
    "7049335",
    "7762901",
    "5060349",
    "5600071",
  ]);
  ctx.body = new Response(1, "加载更多数据成功", res);
};

module.exports = {
  getJobData,
  getMoreJobData,
};
