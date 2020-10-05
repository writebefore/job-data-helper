/*
 * @Author: LHN
 * @Date: 2020-10-04 15:59:49
 * @LastEditors: LHN
 * @LastEditTime: 2020-10-04 18:23:43
 * @description: In User Settings Edit
 * @FilePath: \job-data-helper\job-data-serve\models\user.js
 */
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const UserSchema = new Schema(
  {
    userId: {
      type: String,
    },
    userName: {
      type: String,
    },
    headerImg: {
      type: String,
      default: '',
    },
    createTime:{
      type:String,
      default:Date.now(),
    }
  },
  { collection: "user", versionKey: false }
);

module.exports = mongoose.model("user", UserSchema);
