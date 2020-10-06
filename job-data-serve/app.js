/*
 * @Author: LHN
 * @Date: 2020-10-03 19:15:22
 * @LastEditors: LHN
 * @LastEditTime: 2020-10-06 11:02:31
 * @description: 服务入口文件
 * @FilePath: \job-data-helper\job-data-serve\app.js
 */
const Koa = require("koa");
const app = new Koa();
const cors = require("@koa/cors"); // 处理跨域
const json = require("koa-json");
const bodyparser = require("koa-bodyparser"); // 解析参数
const mongoose = require("mongoose"); // mongoDB驱动
const log4Util = require("./utils/log4Util");
const interceptorRequest = require("./Interceptor/interceptorRequest")
const user = require("./routes/user");

// 配置文件
const config = require("./config");

// 连接mongoDB
console.log("mongoDB数据库连接中...");
mongoose.connect(config.dbURL, config.dbConnectOptions).then(
  () => {
    console.log("mongoDB ready to use.");
  },
  (err) => {
    console.log("mongoDB connect fail.");
    console.log(err);
  }
);

// 中间件
app.use(
  bodyparser({
    enableTypes: ["json", "form", "text"],
  })
);
app.use(json());
app.use(cors());


// 日志 logger
app.use(log4Util());


// 请求拦截器
app.use(interceptorRequest());

// routes
app.use(user.routes(), user.allowedMethods());

// 服务启动
app.listen(config.port);
console.log(`listening on port ${config.port}`);
