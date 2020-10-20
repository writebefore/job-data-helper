/*
 * @Author: LHN
 * @Date: 2020-10-04 15:14:04
 * @LastEditors: LHN
 * @LastEditTime: 2020-10-20 17:48:27
 * @description: In User Settings Edit
 * @FilePath: \job-data-helper\job-data-serve\routes\user.js
 */
const router = require("koa-router")();
const userController = require("../controllers/userController");
const Spider = require("../spider/index");
const cityList = require("../data/city.json");
const Service = require("../services/index");
router.prefix("/user");

router.get("/test", async function (ctx, next) {
  const jobType = await Service.addJobTypeService("前端");
  console.log(jobType);
  const getAllCity = async function (item, cityList, index = 0) {
    console.log("城市索引", index);
    if (index >= cityList.length) return;
    try {
      let res = await Spider.getJobData(item, cityList[index]);
      if (res) getAllCity(item, cityList, index + 1);
    } catch (e) {
      console.log(e);
    }
  };
  await getAllCity("前端", cityList,80);
  ctx.body = "test";
});

router.post("/register", userController.register);
router.post("/login", userController.login);

module.exports = router;
