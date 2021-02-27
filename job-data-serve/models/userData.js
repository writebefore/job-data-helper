/*
 * @Author: LHN
 * @Date: 2020-10-29 19:53:25
 * @LastEditors: LHN
 * @LastEditTime: 2020-10-29 20:22:48
 * @description: In User Settings Edit
 * @FilePath: \job-data-helper\job-data-serve\models\userData.js
 */
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const UserDataSchema = new Schema(
  {
    userId: {
      type: String,
    },
    collectionList: {
      type: Array,
    },
    historyList: {
      type: Array,
    },
    assessList: {
      type: Array,
    },
  },
  { collection: "userData", versionKey: false }
);

module.exports = mongoose.model("userData",UserDataSchema);