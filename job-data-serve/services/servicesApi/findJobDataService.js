/*
 * @Author: LHN
 * @Date: 2020-10-18 14:52:29
 * @LastEditors: LHN
 * @LastEditTime: 2020-10-18 15:35:47
 * @description: In User Settings Edit
 * @FilePath: \job-data-helper\job-data-serve\services\servicesApi\findJobDataService.js
 */
const Job = require('../../models/job')

const findJobDataService = async function(searchKey, city){
    return await Job.find({
        searchKey,
        city,
    })
}

module.exports = findJobDataService;