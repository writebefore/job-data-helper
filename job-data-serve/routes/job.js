/*
 * @Author: LHN
 * @Date: 2020-10-18 15:04:49
 * @LastEditors: LHN
 * @LastEditTime: 2020-10-20 11:46:50
 * @description: In User Settings Edit
 * @FilePath: \job-data-helper\job-data-serve\routes\job.js
 */
const router = require("koa-router")();
const jobController = require("../controllers/jobController");
// const Services = require('../services/index');

router.prefix("/job");

router.get("/getJobData",jobController.getJobData);
router.post("/getMoreJobData",jobController.getMoreJobData);

router.get("/test",jobController.getJobData);

module.exports = router;
