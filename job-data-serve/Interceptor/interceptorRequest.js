/*
 * @Author: LHN
 * @Date: 2020-10-06 10:37:16
 * @LastEditors: LHN
 * @LastEditTime: 2020-10-06 11:11:46
 * @description: In User Settings Edit
 * @FilePath: \job-data-helper\job-data-serve\Interceptor\interceptorRequest.js
 */
const jwtTool = require("../utils/jwtTool");
const Response = require("../entity/index");
const config = require("../config");

module.exports = () => {
  return async (ctx, next) => {
    const req = ctx.request;
    if (!config.requestWhiteList.includes(req.url)) {
      if (!req.headers.authorization) {
        ctx.status = 401;
        ctx.response.body = new Response(-1, "invalid token", {});
      } else {
        jwtTool
          .verifyToken(req.headers.authorization)
          .then(async (res) => {
            console.log(res);
            await next();
          })
          .catch(async (err) => {
            ctx.status = 401;
            ctx.response.body = new Response(0, "error token", {});
          });
      }
    } else {
      await next();
    }
  };
};
