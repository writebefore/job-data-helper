/*
 * @Author: LHN
 * @Date: 2020-10-21 19:50:04
 * @LastEditors: LHN
 * @LastEditTime: 2020-10-21 19:59:09
 * @description: In User Settings Edit
 * @FilePath: \job-data-helper\job-data-view\src\axios\interface\getJobDataGroupBy.js
 */
import service from '../service'

const getJobDataGroupBy = data => {
    return service({
        url: '/job/getJobDataGroupBy',
        method: 'post',
        data,
    })
}

export default getJobDataGroupBy