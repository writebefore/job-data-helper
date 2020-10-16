<!--
 * @Author: LHN
 * @Date: 2020-10-11 15:59:48
 * @LastEditors: LHN
 * @LastEditTime: 2020-10-13 23:38:13
 * @description: In User Settings Edit
 * @FilePath: \job-data-helper\job-data-view\src\views\home\Home.vue
-->
<template>
  <div class="home">
    <van-nav-bar
      title="职位信息"
      :left-text="getTotalCity"
      @click-left="chooseCity"
    >
      <template #right>
        <van-icon name="wap-nav" size="18" />
      </template>
    </van-nav-bar>
    <div class="container">
      <router-view></router-view>
    </div>
    <van-tabbar v-model="active">
      <van-tabbar-item icon="home-o">标签</van-tabbar-item>
      <van-tabbar-item icon="search">标签</van-tabbar-item>
      <van-tabbar-item icon="friends-o">标签</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
import Vue from "vue";
import { NavBar, Tabbar, TabbarItem, Icon } from "vant";
import { mapGetters, mapActions } from "vuex";

Vue.use(NavBar);
Vue.use(Tabbar);
Vue.use(TabbarItem);
Vue.use(Icon);

export default {
  name: "home",
  data() {
    return {
      active: 0, //当前选中页面
      user: {}, // 当前用户信息
    };
  },
  computed: {
    ...mapGetters(["getTotalCity"]), // 选中城市
  },
  methods: {
    chooseCity() {
      this.$router.push({ name: "cityList" });
    },
    ...mapActions(["getLocalCity"]),
  },
  created() {
    this.user = this.$route.params.user;
    this.getLocalCity(); // 获取当前城市
  },
};
</script>

<style>
</style>