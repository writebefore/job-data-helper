/*
 * @Author: LHN
 * @Date: 2020-10-29 20:47:53
 * @LastEditors: LHN
 * @LastEditTime: 2020-10-29 21:17:35
 * @description: In User Settings Edit
 * @FilePath: \job-data-helper\job-data-serve\models\assess.js
 */
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const AssessSchema = new Schema(
  {
    positionId: {
      type: String,
    },
    userId: {
      type: String,
    },
    createTime: {
      type: Number,
      default: Date.now(),
    },
    score:{
      type: Number,
      default: 5,
    },
    userName: {
      type: String,
    },
    avatar:{
      type: String,
      default:"",
    }
  },
  { collection: "assess", versionKey: false }
);

module.exports = mongoose.model("assess", AssessSchema);
