/*
 * @Author: LHN
 * @Date: 2020-10-13 20:18:27
 * @LastEditors: LHN
 * @LastEditTime: 2020-10-13 20:37:13
 * @description: In User Settings Edit
 * @FilePath: \job-data-helper\job-data-serve\txMapApi\request.js
 */
const https = require("https");
const config = require('../config');
const qs = require('qs')

https.get('https://apis.map.qq.com/ws/location/v1/ip?'+qs.stringify({key:config.txMapKey}),(res) => {
    console.log('STATUS: ' + res.statusCode); 
    console.log('HEADERS: ' + JSON.stringify(res.headers)); 
    res.setEncoding('utf8'); 
    res.on('data', function (chunk) { 
        console.log('BODY: ' + chunk); 
    }); 
})