/*
 * @Author: LHN
 * @Date: 2020-10-04 15:14:04
 * @LastEditors: LHN
 * @LastEditTime: 2020-10-04 20:32:33
 * @description: In User Settings Edit
 * @FilePath: \job-data-helper\job-data-serve\routes\user.js
 */
const router = require("koa-router")();
const userController = require('../controllers/userController')

router.prefix("/user");

router.get("/test", function(ctx, next) {
    ctx.body = "this is a test api"
});

router.post("/register", userController.register);
router.post("/login", userController.login);
module.exports = router

