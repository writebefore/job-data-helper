/*
 * @Author: LHN
 * @Date: 2020-10-04 16:51:06
 * @LastEditors: LHN
 * @LastEditTime: 2020-10-05 19:17:53
 * @description: In User Settings Edit
 * @FilePath: \job-data-helper\job-data-serve\services\servicesApi\loginService.js
 */
const Password = require("../../models/password");
const passwordTool = require("../../utils/passwordTool");
const jwtTool = require("../../utils/jwtTool");

const Response = require("../../entity/index");
const findOneUserService = require("./findOneUserService");

const loginService = async function (userName, password) {
  const user = await findOneUserService(userName);
  if (!user) {
    return new Response(-1, "用户名不存在", {});
  }
  const { hash } = await Password.findOne({
    userId: user.userId,
  });
  const match = await passwordTool.compare(password, hash);
  let token = ""; // 登录成功后的令牌 
  if(match) token = await jwtTool.createToken(user._doc);
  return match ? new Response(1, '登陆成功',Object.assign({...user._doc,token})) : new Response(0, '用户名或密码错误',{});
};

module.exports = loginService;
