/*
 * @Author: LHN
 * @Date: 2020-10-08 16:39:38
 * @LastEditors: LHN
 * @LastEditTime: 2020-10-19 13:47:44
 * @description: In User Settings Edit
 * @FilePath: \job-data-helper\job-data-view\src\axios\config.js
 */
export default {
    method: 'POST',
    baseURL: 'http://127.0.0.1:3000/', // 后台发送请求的地址
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
    },
    data:{},
    timeout: 5000,
    responseType: 'json'
}