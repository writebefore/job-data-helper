/*
 * @Author: LHN
 * @Date: 2020-10-04 15:14:04
 * @LastEditors: LHN
 * @LastEditTime: 2020-10-15 22:51:33
 * @description: In User Settings Edit
 * @FilePath: \job-data-helper\job-data-serve\routes\user.js
 */
const router = require("koa-router")();
const userController = require('../controllers/userController')
const Spider = require('../spider/index')
const cityList = require('../data/city.json')
router.prefix("/user");

router.get("/test",async function(ctx, next) {
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
    let res = await Spider.getJobData('前端','南昌')
    ctx.body = res;
});

router.post("/register", userController.register);
router.post("/login", userController.login);

module.exports = router

