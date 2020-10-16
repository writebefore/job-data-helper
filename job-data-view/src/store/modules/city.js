/*
 * @Author: LHN
 * @Date: 2020-10-13 09:37:55
 * @LastEditors: LHN
 * @LastEditTime: 2020-10-13 23:11:09
 * @description: In User Settings Edit
 * @FilePath: \job-data-helper\job-data-view\src\store\modules\city.js
 */
import txMapApi from "../../utils/mapServer/index";

const state = {
  totalCity: "未知",
};

const getters = {
  getTotalCity: (state) => state.totalCity,
};

const mutations = {
  setTotalCity(state, city) {
    console.log(city);
    state.totalCity = city;
  },
};

const actions = {
  chooseCity({ commit, state }, city) {
    if (state.totalCity === city) {
      return;
    }
    commit("setTotalCity", city);
  },
  getLocalCity({ commit, state }) {
    if (state.totalCity !== "未知") return;
    return new Promise((resolve, reject) => {
      txMapApi
        .getLocalCity()
        .then((res) => {
          let city = res.result.ad_info.city || res.result.ad_info.province;
          city = city.substr(0, city.length - 1); // 去除城市名后缀 市或其他
          console.log(city);
          commit("setTotalCity", city);
          resolve(true);
        })
        .catch((err) => {
          console.log(err);
          reject(err)
        });
    });
  },
};

export default {
  state,
  getters,
  mutations,
  actions,
};
