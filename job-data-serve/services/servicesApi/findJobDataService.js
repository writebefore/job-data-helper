/*
 * @Author: LHN
 * @Date: 2020-10-18 14:52:29
 * @LastEditors: LHN
 * @LastEditTime: 2020-10-23 13:28:58
 * @description: In User Settings Edit
 * @FilePath: \job-data-helper\job-data-serve\services\servicesApi\findJobDataService.js
 */
const Job = require("../../models/job");
const config = require("../../config");
const findJobDataService = async function (searchKey, city = "全国", limit=true) {
  if(city === "全国") city = "";
  return city === ""
    ? await Job.find({
        searchKey,
      }).limit(config.getAllJobDataLimit)
    : await Job.find({
        searchKey,
        city,
      }).limit(config.getAllJobDataLimit);
};

module.exports = findJobDataService;
