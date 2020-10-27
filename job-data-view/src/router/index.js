/*
 * @Author: LHN
 * @Date: 2020-10-07 15:17:40
 * @LastEditors: LHN
 * @LastEditTime: 2020-10-26 21:01:24
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
    redirect: '/home/overview',
    component: () => import(/* webpackChunkName: 'HomePackage' */ '@/views/home/Home.vue'),
    children:[
      {
        name:'overview',
        path:'overview',
        component:() => import(/* webpackChunkName: 'Overview' */ '@/views/overview/Overview.vue'),
      },
      {
        name:"chart",
        path:'chart',
        component: () => import(/* webpackChunkName: 'Chart' */ '@/views/chart/Chart.vue')
      },
      {
        name:'mine',
        path:'mine',
        component:() => import(/* webpackChunkName: 'Overview' */ '@/views/mine/Mine.vue')
      }
    ]
  },
  {
    name:'cityList',
    path:'/cityList',
    component:() => import(/* webpackChunkName: 'CityList' */ '@/views/cityList/CityList.vue')
  },
  {
    name:'jobDetail',
    path:'/jobDetail',
    component:() =>import(/* webpackChunkName: 'JobDetail' */ '@/views/jobDetail/JobDetail.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
