/*
 * @Author: LHN
 * @Date: 2020-10-04 16:50:36
 * @LastEditors: LHN
 * @LastEditTime: 2020-10-21 19:10:17
 * @description: In User Settings Edit
 * @FilePath: \job-data-helper\job-data-serve\services\index.js
 */
const registerService = require('./servicesApi/registerService')
const loginService = require('./servicesApi/loginService');
const findOneUserService = require('./servicesApi/findOneUserService');
const findOneJobService = require('./servicesApi/findOneJobService');
const addJobService = require('./servicesApi/addJobService');
const findOneJobTypeService = require('./servicesApi/findOneJobTypeService');
const addJobTypeService = require('./servicesApi/addJobTypeService');
const findJobDataService = require('./servicesApi/findJobDataService');
const getMoreJobDataService = require('./servicesApi/getMoreJobDataService');
const groupJobDataByService = require('./servicesApi/groupJobDataByService');
const Services = {
    registerService,
    loginService,
    findOneUserService,
    findOneJobService,
    addJobService,
    findOneJobTypeService,
    addJobTypeService,
    findJobDataService,
    getMoreJobDataService,
    groupJobDataByService,
}

module.exports = Services;