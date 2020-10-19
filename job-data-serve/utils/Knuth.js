/*
 * @Author: LHN
 * @Date: 2020-10-19 14:49:35
 * @LastEditors: LHN
 * @LastEditTime: 2020-10-19 16:18:22
 * @description: Knuth算法 洗牌算法
 * @FilePath: \job-data-helper\job-data-serve\utils\Knuth.js
 */
/**
 *
 * @param {Array} arr
 * @return {Array} 随机后的数组
 */
const Knuth = function ([...arr]) {
  for (let i = arr.length - 1; i >= 0; i--) {
    const t = random(i);
    [arr[i], arr[t]] = [arr[t], arr[i]];
  }
  return arr;
};

const random = function (num) {
  return parseInt(Math.random() * (num + 1));
};

module.exports = Knuth;
