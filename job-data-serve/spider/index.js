/*
 * @Author: LHN
 * @Date: 2020-10-12 19:29:35
 * @LastEditors: LHN
 * @LastEditTime: 2020-10-24 16:24:01
 * @description: In User Settings Edit
 * @FilePath: \job-data-helper\job-data-serve\spider\index.js
 */
const getCityList = require("./getData/getCityList");
const getJobData = require("./getData/getJobData");
const getJobDetail = require("./getData/getJobDetail");
module.exports = {
  getCityList,
  getJobData,
  getJobDetail,
};
