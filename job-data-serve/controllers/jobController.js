/*
 * @Author: LHN
 * @Date: 2020-10-18 15:06:37
 * @LastEditors: LHN
 * @LastEditTime: 2020-10-24 16:36:30
 * @description: In User Settings Edit
 * @FilePath: \job-data-helper\job-data-serve\controllers\jobController.js
 */
const Response = require("../entity/index");
const Services = require("../services/index");
const config = require("../config");
const Knuth = require("../utils/Knuth");
const Spider = require("../spider/index");
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
  const { jobDataIds } = ctx.request.body;
  ctx.status = 200;
  const res = await Services.getMoreJobDataService([...jobDataIds]);
  ctx.body = new Response(1, "加载更多数据成功", res);
};

const getJobDataGroupBy = async function (ctx, next) {
  const { searchKey, groupBy, city = "全国" } = ctx.request.body;
  ctx.status = 200;
  try {
    const res = await Services.groupJobDataByService(searchKey, groupBy, city);
    ctx.body = new Response(1, "获取数据分组成功", res);
  } catch (err) {
    ctx.body = new Response(0, "获取数据分组失败", err);
  }
};

const getJobDetail = async function (ctx, next) {
  const { userId, positionId } = ctx.request.body;
  ctx.status = 200;
  try {
    const jobDetail = await Spider.getJobDetail(positionId);
    ctx.body = new Response(1, "获取职位详细信息成功", {jobDetail})
  } catch (err) {
    ctx.body = new Response(0, "获取职位详细信息失败", err);
  }
};
module.exports = {
  getJobData,
  getMoreJobData,
  getJobDataGroupBy,
  getJobDetail,
};
