/*
 * @Author: LHN
 * @Date: 2020-10-04 16:50:36
 * @LastEditors: LHN
 * @LastEditTime: 2020-10-04 19:17:50
 * @description: In User Settings Edit
 * @FilePath: \job-data-helper\job-data-serve\services\index.js
 */

const registerService = require('./servicesApi/registerService')
const loginService = require('./servicesApi/loginService');
const findOneUserService = require('./servicesApi/findOneUserService');


const Services = {
    registerService,
    loginService,
    findOneUserService,
}

module.exports = Services;