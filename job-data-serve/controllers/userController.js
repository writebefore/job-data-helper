/*
 * @Author: LHN
 * @Date: 2020-10-04 16:48:12
 * @LastEditors: LHN
 * @LastEditTime: 2020-10-04 20:34:24
 * @description: In User Settings Edit
 * @FilePath: \job-data-helper\job-data-serve\controllers\userController.js
 */
const Response = require('../entity/index');
const Services = require('../services/index');

// 用户注册
const register =async function(ctx, next){
    const req = ctx.request.body;
    console.log(ctx.request);
    if(!(req.userName || req.password || req.userName.trim() || req.password.trim())){
        ctx.body = new Response(-1, '账号密码不能为空',{})
        return;
    } 
    const user = await Services.findOneUserService(req.userName);
    ctx.status = 200;
    if(user){
        ctx.body = new Response(0, "用户名已存在",{});
        return;
    }
    ctx.body = await Services.registerService(req.userName,req.password)
}

// 用户登录
const login = async function(ctx, next){
    const req = ctx.request.body;
    if(!(req.userName || req.password || req.userName.trim() || req.password.trim())){
        ctx.body = new Response(-1, '账号密码不能为空',{})
        return;
    } 
    ctx.status = 200;
    ctx.body = await Services.loginService(req.userName, req.password);
}

module.exports = {
    register,
    login,
}