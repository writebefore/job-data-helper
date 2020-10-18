/*
 * @Author: LHN
 * @Date: 2020-10-14 22:33:28
 * @LastEditors: LHN
 * @LastEditTime: 2020-10-18 23:32:21
 * @description: In User Settings Edit
 * @FilePath: \job-data-helper\job-data-serve\services\servicesApi\addJobService.js
 */
const Job = require("../../models/job");
const moment = require("moment");
const Response = require('../../entity/index')
const addJobService = async function (
  positionId,
  searchKey,
  positionName,
  companyFullName,
  companyShortName,
  companyLogo,
  companySize,
  industryField,
  financeStage,
  skillLabels,
  companyLabelList,
  location,
  city,
  salary,
  salaryMonth,
  workYear,
  jobNature,
  education,
  positionAdvantage
) {
  const newJob = await Job.create({
    positionId,
    searchKey,
    positionName,
    companyFullName,
    companyShortName,
    companyLogo,
    companySize,
    industryField,
    financeStage,
    skillLabels,
    companyLabelList,
    location,
    city,
    salary,
    salaryMonth,
    workYear,
    jobNature,
    education,
    positionAdvantage,
    createDate:moment(Date.now()).format('YYYY-MM-DD'),
  });
  if(newJob){
    return new Response(1, '添加成功',newJob);
  }
  return new Response(-1, '添加失败',{});
};

module.exports = addJobService;
