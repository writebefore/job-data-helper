/*
 * @Author: LHN
 * @Date: 2020-10-14 22:45:05
 * @LastEditors: LHN
 * @LastEditTime: 2020-10-14 23:14:40
 * @description: In User Settings Edit
 * @FilePath: \job-data-helper\job-data-serve\services\servicesApi\findOneJobService.js
 */
const Job = require('../../models/job');

const findOneJobService = async function(positionId){
    return await Job.findOne({
        positionId,
    })
}

module.exports = findOneJobService;