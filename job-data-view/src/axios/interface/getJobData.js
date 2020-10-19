/*
 * @Author: LHN
 * @Date: 2020-10-19 18:58:24
 * @LastEditors: LHN
 * @LastEditTime: 2020-10-19 19:01:14
 * @description: In User Settings Edit
 * @FilePath: \job-data-helper\job-data-view\src\axios\interface\getJobData.js
 */
import service from '../service'
const getJobData = data => {
    return service({
        url: '/job/getJobData',
        method: 'get',
        data,
    })
}

export default getJobData;
