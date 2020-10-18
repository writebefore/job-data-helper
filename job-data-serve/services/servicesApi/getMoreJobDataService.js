/*
 * @Author: LHN
 * @Date: 2020-10-18 15:50:34
 * @LastEditors: LHN
 * @LastEditTime: 2020-10-18 16:06:35
 * @description: In User Settings Edit
 * @FilePath: \job-data-helper\job-data-serve\services\servicesApi\getMoreJobDataService.js
 */

const findOneJobService = require('./findOneJobService');


const getMoreJobDataService = async function(jobListId){
    const tasks = [];
    jobListId.forEach(item => {
        const promise = new Promise((resolve, reject) => {
            findOneJobService(item).then(res => {resolve(res)}).catch(err => {reject(err)});
        })
        tasks.push(promise);
    })
    return Promise.all(tasks);
}

module.exports = getMoreJobDataService;