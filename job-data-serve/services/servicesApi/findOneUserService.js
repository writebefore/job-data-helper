/*
 * @Author: LHN
 * @Date: 2020-10-04 19:07:49
 * @LastEditors: LHN
 * @LastEditTime: 2020-10-04 19:26:48
 * @description: In User Settings Edit
 * @FilePath: \job-data-helper\job-data-serve\services\servicesApi\findOneUserService.js
 */
const User = require("../../models/user");

const findOneUserService = async function (userName) {
  return await User.findOne({
    userName,
  });
};

module.exports = findOneUserService;