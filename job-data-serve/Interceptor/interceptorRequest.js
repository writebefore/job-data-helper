/*
 * @Author: LHN
 * @Date: 2020-10-06 10:37:16
 * @LastEditors: LHN
 * @LastEditTime: 2020-10-19 20:17:00
 * @description: In User Settings Edit
 * @FilePath: \job-data-helper\job-data-serve\Interceptor\interceptorRequest.js
 */
const jwtTool = require("../utils/jwtTool");
const Response = require("../entity/index");
const config = require("../config");

module.exports = () => {
  return async (ctx, next) => {
    const req = ctx.request;
    const reqURL = req.method === "GET" ? req.url.split('?')[0] : req.url; 
    if (!config.requestWhiteList.includes(reqURL)) {
      if (!req.headers.authorization) {
        ctx.status = 401;
        ctx.response.body = new Response(-1, "invalid token", {});
      } else {
        jwtTool
          .verifyToken(req.headers.authorization)
          .then(async (res) => {
            await next();
          })
          .catch(async (err) => {
            console.log(err);
            ctx.status = 401;
            ctx.response.body = new Response(0, "error token", {});
          });
      }
    } else {
      await next();
    }
  };
};
