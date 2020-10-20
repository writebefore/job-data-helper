/*
 * @Author: LHN
 * @Date: 2020-10-20 11:40:49
 * @LastEditors: LHN
 * @LastEditTime: 2020-10-20 11:42:24
 * @description: In User Settings Edit
 * @FilePath: \job-data-helper\job-data-view\src\axios\interface\getMoreJobData.js
 */
import service from '../service'

const getMoreJobData = data => {
    return service({
        url: '/job/getMoreJobData',
        method: 'post',
        data,
    })
}

export default getMoreJobData;