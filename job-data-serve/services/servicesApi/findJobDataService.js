/*
 * @Author: LHN
 * @Date: 2020-10-18 14:52:29
 * @LastEditors: LHN
 * @LastEditTime: 2020-10-19 20:24:44
 * @description: In User Settings Edit
 * @FilePath: \job-data-helper\job-data-serve\services\servicesApi\findJobDataService.js
 */
const Job = require("../../models/job");
const config = require("../../config");
const findJobDataService = async function (searchKey, city = "") {
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
