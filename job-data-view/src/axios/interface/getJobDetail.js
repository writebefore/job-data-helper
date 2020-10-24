/*
 * @Author: LHN
 * @Date: 2020-10-24 16:57:20
 * @LastEditors: LHN
 * @LastEditTime: 2020-10-24 16:59:04
 * @description: In User Settings Edit
 * @FilePath: \job-data-helper\job-data-view\src\axios\interface\getJobDetail.js
 */
import service from '../service'

const getJobDetail = data => {
    return service({
        url:"/job/getJobDetail",
        method: 'post',
        data,
    })
}

export default getJobDetail