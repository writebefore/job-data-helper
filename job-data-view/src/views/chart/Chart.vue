<!--
 * @Author: LHN
 * @Date: 2020-10-20 18:53:25
 * @LastEditors: LHN
 * @LastEditTime: 2020-10-20 20:27:45
 * @description: In User Settings Edit
 * @FilePath: \job-data-helper\job-data-view\src\views\chart\chart.vue
-->
<template>
  <div class="chart">
    <van-tabs v-model="active" swipeable>
      <van-tab title="总览">
          <overview-chart></overview-chart>
      </van-tab>
      <van-tab title="领域">内容 3</van-tab>
      <van-tab title="城市">内容 2</van-tab>
      <van-tab title="学历">内容 3</van-tab>
      <van-tab title="薪资">内容 3</van-tab>
      <van-tab title="类型">内容 3</van-tab>
    </van-tabs>
  </div>
</template>

<script>
import Vue from "vue";
import { Tab, Tabs } from "vant";
import OverviewChart from "../../components/overviewChart/OverviewChart";
Vue.use(Tab);
Vue.use(Tabs);

export default {
  name: "chart",
  data() {
    return {
      active: 0,
    };
  },
  components: { OverviewChart },
};
</script>

<style>
.chart {
  height: 100%;
}
</style>