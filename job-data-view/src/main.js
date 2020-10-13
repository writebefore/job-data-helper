/*
 * @Author: LHN
 * @Date: 2020-10-07 15:17:40
 * @LastEditors: LHN
 * @LastEditTime: 2020-10-12 19:59:50
 * @description: In User Settings Edit
 * @FilePath: \job-data-helper\job-data-view\src\main.js
 */
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import api from './axios/index'
import '@/static/reset.css'
import './assets/css/fit.less'

Vue.config.productionTip = false

Vue.prototype.$http = api;

// 非登陆状态的路由守卫
router.beforeEach((to, from, next) => {
  if(to.path === '/login' || to.path === '/register'){
    next();
  }else{
    if(sessionStorage.getItem('authorization')){
      next();
    }else {
      next('/login');
    }
  }
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
