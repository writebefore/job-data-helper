/*
 * @Author: LHN
 * @Date: 2020-10-04 16:08:59
 * @LastEditors: LHN
 * @LastEditTime: 2020-10-04 18:56:07
 * @description: In User Settings Edit
 * @FilePath: \job-data-helper\job-data-serve\models\password.js
 */
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const PasswordSchema = new Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    hash: {
      type: String,
      required: true,
    },
  },
  { collection: "password", versionKey: false }
);

module.exports = mongoose.model('password', PasswordSchema);