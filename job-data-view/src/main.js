/*
 * @Author: LHN
 * @Date: 2020-10-07 15:17:40
 * @LastEditors: LHN
 * @LastEditTime: 2020-10-08 17:46:26
 * @description: In User Settings Edit
 * @FilePath: \job-data-helper\job-data-view\src\main.js
 */
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import api from './axios/index'

Vue.config.productionTip = false

Vue.prototype.$http = api;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
