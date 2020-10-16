/*
 * @Author: LHN
 * @Date: 2020-10-04 16:50:36
 * @LastEditors: LHN
 * @LastEditTime: 2020-10-14 23:14:32
 * @description: In User Settings Edit
 * @FilePath: \job-data-helper\job-data-serve\services\index.js
 */
const registerService = require('./servicesApi/registerService')
const loginService = require('./servicesApi/loginService');
const findOneUserService = require('./servicesApi/findOneUserService');
const findOneJobService = require('./servicesApi/findOneJobService');
const addJobService = require('./servicesApi/addJobService');
const Services = {
    registerService,
    loginService,
    findOneUserService,
    findOneJobService,
    addJobService,
}

module.exports = Services;