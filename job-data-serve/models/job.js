/*
 * @Author: LHN
 * @Date: 2020-10-14 22:05:27
 * @LastEditors: LHN
 * @LastEditTime: 2020-10-14 23:10:13
 * @description: In User Settings Edit
 * @FilePath: \job-data-helper\job-data-serve\models\job.js
 */
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const JobSchema = Schema(
  {
    positionId: {
      type: String,
    },
    searchKey: {
      // 爬取时所用关键字
      type: String,
    },
    positionName: {
      type: String,
    },
    companyFullName: {
      type: String,
    },
    companyShortName: {
      type: String,
    },
    companyLogo: {
      type: String,
    },
    companySize: {
      type: String,
    },
    industryField: {
      type: String,
    },
    financeStage: {
      type: String,
    },
    companyLabelList: {
      type: Array,
    },
    city: {
      type: String,
    },
    salary: {
      type: String,
    },
    salaryMonth: {
      type: String,
    },
    workYear: {
      type: String,
    },
    jobNature: {
      type: String,
    },
    education: {
      type: String,
    },
    positionAdvantage: {
      type: String,
    },
    createDate: {
      type: String,
    },
  },
  { collection: "job", versionKey: false }
);

module.exports = mongoose.model("job", JobSchema);
