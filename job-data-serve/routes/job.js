/*
 * @Author: LHN
 * @Date: 2020-10-18 15:04:49
 * @LastEditors: LHN
 * @LastEditTime: 2020-10-21 19:36:57
 * @description: In User Settings Edit
 * @FilePath: \job-data-helper\job-data-serve\routes\job.js
 */
const router = require("koa-router")();
const jobController = require("../controllers/jobController");
// const Services = require('../services/index');

router.prefix("/job");

router.get("/getJobData",jobController.getJobData);
router.post("/getMoreJobData",jobController.getMoreJobData);
router.post("/getJobDataGroupBy", jobController.getJobDataGroupBy);

router.get("/test",jobController.getJobData);

module.exports = router;
