/*
 * @Author: LHN
 * @Date: 2020-10-18 15:06:37
 * @LastEditors: LHN
 * @LastEditTime: 2020-10-18 15:59:29
 * @description: In User Settings Edit
 * @FilePath: \job-data-helper\job-data-serve\controllers\jobController.js
 */
const Response = require("../entity/index");
const Services = require("../services/index");
const config = require("../config");

const getJobData = async function (ctx, next) {
  const allJobData = await Services.findJobDataService("前端", "南昌");
  const jobData = [];
  const jobListId = allJobData.map((item, index) => {
    if (index < config.getJobDataLimit) {
      jobData.push(item);
    }
    return item.positionId;
  });

  ctx.body = new Response(1, "首次获取职位信息成功", {
    jobListId,
    jobData,
    everyGetLimit: config.getJobDataLimit,
  });
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
  ctx.body = new Response(1, '加载更多数据成功',res);
};

module.exports = {
  getJobData,
  getMoreJobData,
};
