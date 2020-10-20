<!--
 * @Author: LHN
 * @Date: 2020-10-11 15:59:48
 * @LastEditors: LHN
 * @LastEditTime: 2020-10-20 19:40:19
 * @description: In User Settings Edit
 * @FilePath: \job-data-helper\job-data-view\src\views\home\Home.vue
-->
<template>
  <div class="home">
    <van-nav-bar
      title="职位信息"
      :left-text="getTotalCity"
      :right-text="jobType"
      @click-left="chooseCity"
    >
    </van-nav-bar>
    <div class="container">
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </div>

    <van-tabbar route>
      <van-tabbar-item icon="home-o" to="/home/overview">职位</van-tabbar-item>
      <van-tabbar-item icon="search" to="/home/chart">图表</van-tabbar-item>
      <van-tabbar-item icon="friends-o" to="/home/mine">我的</van-tabbar-item>
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
      jobType:'前端', //职位类别
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

<style lang='less' scoped>
.container {
  overflow: hidden;
  position: absolute;
  top: 46px;
  left: 0;
  bottom: 50px;
  right: 0;
  margin: auto;
}
</style>