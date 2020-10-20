/*
 * @Author: LHN
 * @Date: 2020-10-06 10:37:16
 * @LastEditors: LHN
 * @LastEditTime: 2020-10-20 16:00:00
 * @description: In User Settings Edit
 * @FilePath: \job-data-helper\job-data-serve\Interceptor\interceptorRequest.js
 */
const jwtTool = require("../utils/jwtTool");
const Response = require("../entity/index");
const config = require("../config");

module.exports = () => {
  return async (ctx, next) => {
    const req = ctx.request;
    const reqURL = req.method === "GET" ? req.url.split("?")[0] : req.url;
    if (!config.requestWhiteList.includes(reqURL)) {
      if (!req.headers.authorization) {
        ctx.status = 401;
        ctx.response.body = new Response(-1, "invalid token", {});
      } else {
        try {
          const userInfo = await jwtTool.verifyToken(req.headers.authorization);
          console.log(userInfo);
          await next();
        } catch (err) {
          console.log(err);
        }
      }
    } else {
      await next();
    }
  };
};
