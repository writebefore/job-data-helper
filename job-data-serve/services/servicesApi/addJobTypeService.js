/*
 * @Author: LHN
 * @Date: 2020-10-18 14:05:28
 * @LastEditors: LHN
 * @LastEditTime: 2020-10-29 20:44:27
 * @description: In User Settings Edit
 * @FilePath: \job-data-helper\job-data-serve\services\servicesApi\addJobTypeService.js
 */
const JobType = require("../../models/jobType");
const moment = require("moment");
const Response = require("../../entity/index");
const findOneJobTypeService = require("./findOneJobTypeService");
const addJobTypeService = async function (jobKey) {
  const findJobType = await findOneJobTypeService(jobKey);
  if (findJobType) return new Response(0, "职位类型已存在", findJobType);
  const newJobType = await JobType.create({
    jobKey,
    createDate: moment(Date.now()).format("YYYY-MM-DD"),
  });
  if (newJobType) {
    return new Response(1, "添加职位类型成功", newJobType);
  }
  return new Response(-1, "添加职位类型失败", {});
};

module.exports = addJobTypeService;
