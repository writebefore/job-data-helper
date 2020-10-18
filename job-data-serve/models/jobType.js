/*
 * @Author: LHN
 * @Date: 2020-10-18 13:50:26
 * @LastEditors: LHN
 * @LastEditTime: 2020-10-18 14:41:35
 * @description: In User Settings Edit
 * @FilePath: \job-data-helper\job-data-serve\models\jobType.js
 */
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const JobTypeSchema = Schema(
    {
        jobKey: {
            type: String,
        },
        createDate:{
            type: String
        }
    },
    {collection:'jobType', versionKey: false}
);

module.exports = mongoose.model("jobType", JobTypeSchema);