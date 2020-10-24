/*
 * @Author: LHN
 * @Date: 2020-10-08 17:44:25
 * @LastEditors: LHN
 * @LastEditTime: 2020-10-24 16:59:36
 * @description: In User Settings Edit
 * @FilePath: \job-data-helper\job-data-view\src\axios\index.js
 */
import userLogin from './interface/login'
import userRegister from './interface/register'
import getJobData from './interface/getJobData'
import getMoreJobData from './interface/getMoreJobData'
import getJobDataGroupBy from './interface/getJobDataGroupBy'
import getJobDetail from './interface/getJobDetail'
export default {
    userLogin,
    userRegister,
    getJobData,
    getMoreJobData,
    getJobDataGroupBy,
    getJobDetail,
}