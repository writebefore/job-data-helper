/*
 * @Author: LHN
 * @Date: 2020-10-07 15:17:40
 * @LastEditors: LHN
 * @LastEditTime: 2020-10-07 15:51:28
 * @description: In User Settings Edit
 * @FilePath: \job-data-helper\job-data-view\src\router\index.js
 */
import Vue from 'vue'
import VueRouter from 'vue-router'

import Login from '@/views/Login';

Vue.use(VueRouter)

const routes = [
  {
    path:'/',
    redirect: '/login',
  },
  {
    name:'login',
    path: '/login',
    component: Login, 
  }
]

const router = new VueRouter({
  routes
})

export default router
