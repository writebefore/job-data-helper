/*
 * @Author: LHN
 * @Date: 2020-10-04 23:22:30
 * @LastEditors: LHN
 * @LastEditTime: 2020-10-06 11:06:24
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

const verifyToken = function(token){
    return new Promise((resolve, reject) => {
		jwt.verify(token, secret, (error, result) => {
            if(error){
                console.log(err);
                reject(error)
            } else {
                resolve(result)
            }
		})
    })
}

module.exports = {
    createToken,
    verifyToken,
}