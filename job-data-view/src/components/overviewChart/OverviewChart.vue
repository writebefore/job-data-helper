<!--
 * @Author: LHN
 * @Date: 2020-10-20 20:16:58
 * @LastEditors: LHN
 * @LastEditTime: 2020-10-23 14:26:31
 * @description: In User Settings Edit
 * @FilePath: \job-data-helper\job-data-view\src\components\overviewChart\OverviewChart.vue
-->
<template>
  <div class="overviewChart">
    <div class="chartContainer_top">
      <div class="dataSum">
        <div class="title">总数据数量</div>
        <div class="number">{{ dataSum }}</div>
      </div>
      <div id="myChart" style="width: 100%; height: 30rem"></div>
    </div>
    <div class="chartContainer_bottom">
      
    </div>
  </div>
</template>

<script>

export default {
  name: "overview-chart",
  props: {
    chartData: {
      type: Array,
    },
  },
  data() {
    return {
      dataSum: 0,
      currentRate: 20,
    };
  },

  methods: {
    drawLine() {
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById("myChart"));
      // 绘制图表
      myChart.setOption({
        // title: {
        //   text:"数据视图",
        // },
        tooltip: {
          trigger: "axis",
        },
        grid: {
          top: "10%",
          left: 0,
          right: 0,
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: this.chartData.map((item) => item._id),
          axisLine: {
            show: false,
          },
          axisTick: {
            show: false,
          },
          axisLabel: {
            textStyle: {
              color: "gray",
            },
          },
        },
        yAxis: {
          type: "value",
          axisLine: {
            show: false,
          },
          axisTick: {
            show: false,
          },
          axisLabel: {
            show: false,
          },
        },
        series: [
          {
            name: "新增职位数量",
            data: this.chartData.map((item) => {
              this.dataSum += item.count;
              return item.count;
            }),
            type: "line",
            smooth: true,
            areaStyle: {
              color: "rgba(60,129,219,0.8)",
            },
            itemStyle: {
              color: "rgba(117,166,229,0.8)",
            },
          },
        ],
      });
    },
  },
};
</script>

<style lang="less" scoped>
.overviewChart {
  .chartContainer_top {
    .dataSum {
      text-align: center;
    }
  }
  .chartContainer_bottom {
    .salaryCircle {
      display: flex;
      justify-content: space-around;
    }
  }
}
</style>
