<!--
 * @Author: LHN
 * @Date: 2020-10-20 18:53:25
 * @LastEditors: LHN
 * @LastEditTime: 2020-10-22 20:07:22
 * @description: In User Settings Edit
 * @FilePath: \job-data-helper\job-data-view\src\views\chart\chart.vue
-->
<template>
  <div class="chart">
    <van-tabs v-model="active" swipeable>
      <van-tab title="总览">
          <overview-chart :chartData="overviewChartData" ref="overviewChart"></overview-chart>
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
import {mapGetters} from "vuex"
Vue.use(Tab);
Vue.use(Tabs);

export default {
  name: "chart",
  data() {
    return {
      active: 0,
      overviewChartData:[]
    };
  },
  components: { OverviewChart },
  computed: {
    ...mapGetters(['getTotalCity'])
  },
  methods: {
    async getJobDataGroupBy(){
      let {data} = await this.$http.getJobDataGroupBy({searchKey:'前端',groupBy:'createDate',city:this.getTotalCity});
      // this.overviewChartData = [...data] 无效? 无法监听数组变化?
      this.overviewChartData.push(...data)
      this.$refs.overviewChart.drawLine(); // 难点 解决父子主键数据绑定时不同步的问题
    }
  },
  mounted() {
    this.getJobDataGroupBy()
  },
};
</script>

<style>
.chart {
  height: 100%;
}
</style>