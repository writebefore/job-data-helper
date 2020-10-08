<!--
 * @Author: LHN
 * @Date: 2020-10-07 15:47:19
 * @LastEditors: LHN
 * @LastEditTime: 2020-10-08 18:13:35
 * @description: In User Settings Edit
 * @FilePath: \job-data-helper\job-data-view\src\views\Login.vue
-->
<template>
  <div class="login">
    <van-button type="warning">警告按钮</van-button>
  </div>
</template>

<script>
import Vue from 'vue'
import { Button } from 'vant'
Vue.use(Button)
export default {
    name: 'login',
    methods: {
      async login(){
        const res = await this.$http.userLogin({userName:'admin',password: '123456'})
        console.log(res);
      }
    },
    beforeMount() {
      this.login();
    },
};
</script>

<style>
</style>