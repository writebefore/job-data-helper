/*
 * @Author: LHN
 * @Date: 2020-10-12 19:29:35
 * @LastEditors: LHN
 * @LastEditTime: 2020-10-14 23:25:00
 * @description: In User Settings Edit
 * @FilePath: \job-data-helper\job-data-serve\spider\index.js
 */
const getCityList = require('./getData/getCityList')
const getJobData = require('./getData/getJobData')
module.exports = {
    getCityList,
    getJobData,
}