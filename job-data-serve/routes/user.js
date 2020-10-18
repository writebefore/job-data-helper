/*
 * @Author: LHN
 * @Date: 2020-10-04 15:14:04
 * @LastEditors: LHN
 * @LastEditTime: 2020-10-18 23:36:44
 * @description: In User Settings Edit
 * @FilePath: \job-data-helper\job-data-serve\routes\user.js
 */
const router = require("koa-router")();
const userController = require("../controllers/userController");
const Spider = require("../spider/index");
const cityList = require("../data/city.json");
const Service = require('../services/index');
router.prefix("/user");

router.get("/test",async function (ctx, next) {
  // const tasks = [];
  // const limit = 10;

  // for(let item of cityList.slice(20,30)){
  //     let promise = new Promise((resolve, reject) => {
  //         Spider.getJobData('前端',item).then(res => {
  //             resolve(res);
  //         }).catch(err => {
  //             reject(err)
  //         })
  //     })
  //     tasks.push(promise)
  // }
  // const result = Promise.all(tasks);
  const jobType = await Service.addJobTypeService('前端');
  console.log(jobType);
  const getAllCity = async function (item, cityList, index=0) {
      console.log('城市索引',index);
    try {
      let res = await Spider.getJobData(item, cityList[index]);
      if (res) getAllCity(item, cityList, index + 1);
    } catch (e) {
      console.log(e);
    }
  };
  await getAllCity('前端', cityList);
  ctx.body = 'test';
});

router.post("/register", userController.register);
router.post("/login", userController.login);

module.exports = router;
