/*
 * @Author: LHN
 * @Date: 2020-10-04 23:22:30
 * @LastEditors: LHN
 * @LastEditTime: 2020-10-04 23:35:57
 * @description: In User Settings Edit
 * @FilePath: \job-data-helper\job-data-serve\utils\jwtTool.js
 */
const jwt = require("jsonwebtoken");
const secret = "123456789ABCDEF"; // 撒盐

const createToken = async function(info) {
    const token = await jwt.sign(info, secret, {
        expiresIn:60 * 60 * 15, // 有效时间
    })
    return token;
}

const verifyToken = async function(token){
    return await jwt.verify(token, secret, function(err, decoded) {
        return err || decoded;
    })
}

module.exports = {
    createToken,
    verifyToken,
}