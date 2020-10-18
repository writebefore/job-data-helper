/*
 * @Author: LHN
 * @Date: 2020-10-18 15:04:49
 * @LastEditors: LHN
 * @LastEditTime: 2020-10-18 16:45:18
 * @description: In User Settings Edit
 * @FilePath: \job-data-helper\job-data-serve\routes\job.js
 */
const router = require("koa-router")();
const jobController = require("../controllers/jobController");
// const Services = require('../services/index');

router.prefix("/job");

router.get("/getJobData",jobController.getJobData);
router.get("/test",jobController.getMoreJobData)

module.exports = router;