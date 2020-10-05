/*
 * @Author: LHN
 * @Date: 2020-10-04 17:15:48
 * @LastEditors: LHN
 * @LastEditTime: 2020-10-04 18:59:41
 * @description: 响应数据格式
 * @FilePath: \job-data-helper\job-data-serve\entity\index.js
 */

class Response{
    constructor(code, msg, data){
        this.code = code;
        this.msg = msg;
        this.data = data;
    }
}

module.exports = Response;