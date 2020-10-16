/*
 * @Author: LHN
 * @Date: 2020-10-03 19:29:34
 * @LastEditors: LHN
 * @LastEditTime: 2020-10-14 23:27:10
 * @description: 配置文件
 * @FilePath: \job-data-helper\job-data-serve\config.js
 */
module.exports = {
    port: 3000, // 服务端口号
    dbURL:'mongodb://127.0.0.1:27017/job-data-helper', // 数据库地址
    dbConnectOptions:{ // mongoDB 连接时的参数
        useNewUrlParser: true,
        useUnifiedTopology: true,
        keepAlive: true,
        connectTimeoutMS: 1000, // 超时时间
    },
    saltTimes: 3, // 密码加盐次数
    requestWhiteList:['/user/login','/user/register','/user/test'], // token 验证白名单
}