/*
 * @Author: LHN
 * @Date: 2020-10-18 14:00:43
 * @LastEditors: LHN
 * @LastEditTime: 2020-10-18 14:43:56
 * @description: In User Settings Edit
 * @FilePath: \job-data-helper\job-data-serve\services\servicesApi\findOneJobTypeService.js
 */
const JobType = require('../../models/jobType');

const findOneJobTypeService = async function(jobKey){
    return await JobType.findOne({
        jobKey,
    })
}

module.exports = findOneJobTypeService;