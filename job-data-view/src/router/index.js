/*
 * @Author: LHN
 * @Date: 2020-10-07 15:17:40
 * @LastEditors: LHN
 * @LastEditTime: 2020-10-12 19:11:34
 * @description: In User Settings Edit
 * @FilePath: \job-data-helper\job-data-view\src\router\index.js
 */
import Vue from 'vue'
import VueRouter from 'vue-router'

import Login from '@/views/login/Login.vue';

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
  },
  {
    name:'home',
    path:'/home',
    component: () => import(/* webpackChunkName: 'HomePackage' */ '@/views/home/Home.vue')
  },
  {
    name:'cityList',
    path:'/cityList',
    component:() => import(/* webpackChunkName: 'HomePackage' */ '@/views/cityList/CityList.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
