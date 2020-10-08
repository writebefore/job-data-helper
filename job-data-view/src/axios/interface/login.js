/*
 * @Author: LHN
 * @Date: 2020-10-08 17:42:08
 * @LastEditors: LHN
 * @LastEditTime: 2020-10-08 18:15:34
 * @description: In User Settings Edit
 * @FilePath: \job-data-helper\job-data-view\src\axios\interface\login.js
 */
import service from '../service'
const userLogin = data => {
    return service({
        url: '/user/login',
        method: 'post',
        data,
    })
}
export default userLogin