/*
 * @Author: LHN
 * @Date: 2020-10-04 16:54:31
 * @LastEditors: LHN
 * @LastEditTime: 2020-10-05 00:05:58
 * @description: In User Settings Edit
 * @FilePath: \job-data-helper\job-data-serve\services\servicesApi\registerService.js
 */
const User = require("../../models/user");
const Password = require("../../models/password");
const { v1: uuid_v1 } = require("uuid");
const passwordTool = require("../../utils/passwordTool");
const jwtTool = require("../../utils/jwtTool");
const config = require("../../config");

const Response = require('../../entity/index')

const registerService = async function (userName, password) {
    const userId = uuid_v1();
    const newUser = await User.create({
        userId,
        userName,
    })
    if(newUser) {
        const hash = await passwordTool.encrypt(password, config.saltTimes);
        const newPassword = await Password.create({
            userId,
            hash
        })
        let token = ""; // 注册成功后直接登录的令牌 
        if(newPassword) token = await jwtTool.createToken(newUser._doc);
        return newPassword ? new Response(1, '注册成功', Object.assign({...newUser._doc,token})) : new Response(0, '注册失败', {});
    }
    return new Response(-1, '用户注册失败', {});
};

module.exports = registerService;
