/*
 * @Author: LHN
 * @Date: 2020-10-12 19:33:35
 * @LastEditors: LHN
 * @LastEditTime: 2020-10-12 20:14:21
 * @description: In User Settings Edit
 * @FilePath: \job-data-helper\job-data-serve\data\cityData.js
 */
const fs = require("fs");
const path = require("path");
const getCityList = require("../spider/getData/getCityList");

/**
 * 获取并保存城市列表
 */
const saveCities = () => {
  const writeCityJson = (data) => {
    fs.writeFile(
      path.join(__dirname + "/city.json"),
      JSON.stringify(data),
      (err) => {
        if (err) throw err;
        console.log("城市列表保存成功");
      }
    );
  };
    getCityList()
    .then((res) => {
      writeCityJson(res);
    })
    .catch((err) => {
      console.log("文件保存失败");
    });
};
saveCities()
const cityData = {
  saveCities,
};

module.exports = cityData;