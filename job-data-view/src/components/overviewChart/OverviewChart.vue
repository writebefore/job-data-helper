<!--
 * @Author: LHN
 * @Date: 2020-10-20 20:16:58
 * @LastEditors: LHN
 * @LastEditTime: 2020-10-20 20:48:39
 * @description: In User Settings Edit
 * @FilePath: \job-data-helper\job-data-view\src\components\overviewChart\OverviewChart.vue
-->
<template>
  <div class="overviewChart">
    <div id="myChart" style="width: 100%; height: 400px"></div>
  </div>
</template>

<script>
export default {
  name: "overview-chart",
  data() {
    return {};
  },
  methods: {
    drawLine() {
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById("myChart"));
      // 绘制图表
      myChart.setOption(
        ({
          xAxis: {
            type: "category",
            data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
          },
          yAxis: {
            type: "value",
          },
          series: [
            {
              data: [820, 932, 901, 934, 1290, 1330, 1320],
              type: "line",
            },
          ],
        })
      );
    },
  },
  mounted() {
    this.drawLine();
  },
};
</script>

<style lang='less' scoped>
</style>