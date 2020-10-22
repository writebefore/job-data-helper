/*
 * @Author: LHN
 * @Date: 2020-10-21 18:05:39
 * @LastEditors: LHN
 * @LastEditTime: 2020-10-21 19:07:36
 * @description: In User Settings Edit
 * @FilePath: \job-data-helper\job-data-serve\services\servicesApi\groupJobDataByDateService.js
 */
const Job = require("../../models/job");

const groupJobDataByDateService = async function (searchKey, groupBy , city = "全国") {
  return new Promise((resolve, reject) => {
    let optArr = [
      {
        $match: {
          searchKey,
          city,
        },
      },
      {
        $group: {
          _id: "$createDate",
          count: { $sum: 1 },
        },
      },
      {
        $sort: { _id: 1 },
      },
    ];
    if (city === "全国") {
      optArr = [
        {
          $match: {
            searchKey,
          },
        },
        {
          $group: {
            _id: `$${groupBy}`,
            count: { $sum: 1 },
          },
        },
        {
          $sort: { _id: 1 },
        },
      ];
    }
    Job.aggregate(optArr).exec(function (err, res) {
      if (err) {
        console.log(err);
        reject(err);
        return;
      }
      resolve(res);
    });
  });
};

module.exports = groupJobDataByDateService;
