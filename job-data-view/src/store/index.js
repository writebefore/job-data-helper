/*
 * @Author: LHN
 * @Date: 2020-10-07 15:17:40
 * @LastEditors: LHN
 * @LastEditTime: 2020-10-23 21:06:12
 * @description: In User Settings Edit
 * @FilePath: \job-data-helper\job-data-view\src\store\index.js
 */
import Vue from 'vue'
import Vuex from 'vuex'
import city from './modules/city'
import user from './modules/user'
import createPersistedState from "vuex-persistedstate";
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    city,
    user,
  },
  plugins: [createPersistedState()],
})
