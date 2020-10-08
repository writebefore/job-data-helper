/*
 * @Author: LHN
 * @Date: 2020-10-08 20:01:20
 * @LastEditors: LHN
 * @LastEditTime: 2020-10-08 20:03:01
 * @description: In User Settings Edit
 * @FilePath: \job-data-helper\job-data-view\src\axios\interface\register.js
 */
import service from '../service'
const userRegister = data => {
    return service({
        url: '/user/register',
        method: 'post',
        data,
    })
}

export default userRegister;