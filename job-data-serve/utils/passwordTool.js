/*
 * @Author: LHN
 * @Date: 2020-10-04 17:02:01
 * @LastEditors: LHN
 * @LastEditTime: 2020-10-04 18:07:01
 * @description: 密码的加密处理
 * @FilePath: \job-data-helper\job-data-serve\utils\passwordTool.js
 */
const bcrypt = require('bcrypt');

const encrypt = async (password, saltTimes) => {
    return await bcrypt.hash(password, saltTimes);
}

const compare = async (password, hash) => {
    return await bcrypt.compare(password, hash);
}

module.exports = {
    encrypt,
    compare,
}