/*
 * @Author: LHN
 * @Date: 2020-10-05 18:52:22
 * @LastEditors: LHN
 * @LastEditTime: 2020-10-08 20:14:18
 * @description: In User Settings Edit
 * @FilePath: \job-data-helper\job-data-serve\utils\log4Util.js
 */
const log4js = require("log4js");

const logConfig = require("../log4jsConfig");

log4js.configure(logConfig);

const logUtil = {};
// 调用预先定义的日志名称
var resLogger = log4js.getLogger("resLogger");
var reqLogger = log4js.getLogger("http");
var errorLogger = log4js.getLogger("errorLogger");
var consoleLogger = log4js.getLogger();

// 封装错误日志
logUtil.logError = function (ctx, error, resTime) {
  if (ctx && error) {
    errorLogger.error(formatError(ctx, error, resTime));
  }
};

// 封装请求日志
logUtil.reqLog = function (ctx, resTime) {
  if (ctx) {
    reqLogger.info(formatReqLog(ctx.request, resTime));
  }
};
// 封装响应日志
logUtil.logResponse = function (ctx, resTime) {
  if (ctx) {
    resLogger.info(formatRes(ctx, resTime));
  }
};

logUtil.logInfo = function (info) {
  if (info) {
    consoleLogger.info(formatInfo(info));
  }
};

var formatInfo = function (info) {
  var logText = "";
  // 响应日志开始
  logText += "\n" + "***************info log start ***************" + "\n";

  // 响应内容
  logText += "info detail: " + "\n" + JSON.stringify(info) + "\n";

  // 响应日志结束
  logText += "*************** info log end ***************" + "\n";

  return logText;
};

// 格式化响应日志
var formatRes = function (ctx, resTime) {
  var logText = "";
  // 响应日志开始
  logText += "\n" + "*************** response log start ***************" + "\n";

  // 添加请求日志
  logText += formatReqLog(ctx.request, resTime);

  // 响应状态码
  logText += "response status: " + ctx.status + "\n";

  // 响应内容
  logText += "response body: " + "\n" + JSON.stringify(ctx.body) + "\n";

  // 响应日志结束
  logText += "*************** response log end ***************" + "\n";

  return logText;
};

// 格式化错误日志
var formatError = function (ctx, err, resTime) {
  var logText = "";

  // 错误信息开始
  logText += "\n" + "*************** error log start ***************" + "\n";

  // 添加请求日志
  logText += formatReqLog(ctx.request, resTime);

  // 错误名称
  logText += "err name: " + err.name + "\n";
  // 错误信息
  logText += "err message: " + err.message + "\n";
  // 错误详情
  logText += "err stack: " + err.stack + "\n";

  // 错误信息结束
  logText += "*************** error log end ***************" + "\n";

  return logText;
};

// 格式化请求日志
var formatReqLog = function (req, resTime) {
  var logText = "";

  var method = req.method;
  // 访问方法
  logText += "\n" + "request method: " + method + "\n";

  // 请求原始地址
  logText += "request originalUrl:  " + req.originalUrl + "\n";

  // 客户端ip
  logText += "request client ip:  " + req.ip + "\n";
  // 开始时间
  //   var startTime;
  // 请求参数
  if (method === "GET") {
    logText += "request query:  " + JSON.stringify(req.query) + "\n";
    // startTime = req.query.requestStartTime;
  } else {
    const reqBody = {...req.body};
    if(req.body.password) reqBody.password = 'XXXXXXXX';
    logText += "request body: " + "\n" + JSON.stringify(reqBody) + "\n";
    // startTime = req.body.requestStartTime;
  }
  // 服务器响应时间
  logText += "response time: " + resTime + "ms" + "\n";

  return logText;
};

module.exports = () => {
  return async (ctx, next) => {
    ctx.logger = logUtil;
    ctx.logger.reqLog(ctx, 0);
    const start = new Date();
    let ms = new Date() - start;
    await next();
    try {
      if (ctx.status === 404) {
        ctx.throw(404);
      }
      ms = new Date() - start;
      // 记录响应日志
      ctx.logger.logResponse(ctx, ms);
    } catch (error) {
      ms = new Date() - start;
      // 记录异常日志
      ctx.logger.logError(ctx, error, ms);
    }
  };
};
