<!--
 * @Author: LHN
 * @Date: 2020-10-17 17:10:48
 * @LastEditors: LHN
 * @LastEditTime: 2020-10-23 14:01:22
 * @description: In User Settings Edit
 * @FilePath: \job-data-helper\job-data-view\src\views\overview\Overview.vue
-->
<template>
  <div class="container">
    <better-scroll class="overview" :data="jobData" :beforeScroll="beforeScroll" :pullup="pullup" @scrollToEnd="scrollEnd" v-show="jobData.length">
      <div class="jobItem-list">
        <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
          <van-list v-model="loading" :finished="finished" finished-text="没有更多了" offset="300" @load="getMoreJobData" ref="vanList" :immediate-check="false">
            <job-item v-for="(item, index) in jobData" :key="index" :jobData="item"></job-item>
          </van-list>
        </van-pull-refresh>
      </div>
    </better-scroll>
    <van-empty image="search" description="描述文字" v-show="!jobData.length" />
  </div>
</template>

<script>
import JobItem from "../../components/jobItem/JobItem";
import BetterScroll from "@/components/scroll/BetterScroll";
import { mapGetters } from "vuex";
import Vue from "vue";
import { PullRefresh, List, Empty } from "vant";

Vue.use(PullRefresh);
Vue.use(List);
Vue.use(Empty);
export default {
  name: "overview",
  data() {
    return {
      jobListId: [], // 职位positionId数组
      jobData: [], // 职位信息
      everyGetLimit: 0, // 每次获取数据限制条数

      getMoreTimes: 1, // 获取更多的次数

      // 下拉刷新与上滑加载
      isLoading: false,
      loading: false,
      finished: false,

      // better-scroll 配置
      beforeScroll: true,
      pullup: true,

      // 是否有数据
      hasData: false,
    };
  },
  components: {
    JobItem,
    BetterScroll,
  },
  computed: {
    ...mapGetters(["getTotalCity"]),
    // salaryData() {
    //   if (this.jobData.length === 0) {
    //     return {
    //       minSalary: "未知",
    //       averageSalary: "未知",
    //       maxSalary: "未知",
    //     };
    //   } else {
    //     let min = Number.MAX_SAFE_INTEGER;
    //     let max = Number.MIN_SAFE_INTEGER;
    //     let sum = 0;
    //     const jobData = [...this.jobData];
    //     console.log(jobData);
    //     for (let item of jobData) {
    //       let salary = item.salary.split('-');
    //       const start = parseInt(salary[0]);
    //       const end = parseInt(salary[1]);
    //       min = Math.min(min,start);
    //       max = Math.max(max,end);
    //     }
    //     return {
    //       minSalary: `${min}k`,
    //       averageSalary: `${(average/jobData.length).toFixed(1)}k`,
    //       maxSalary: `${max}k`,
    //     };
    //   }
    // },
  },
  methods: {
    // 刷新
    onRefresh() {
      this.getJobData();
    },
    async getJobData() {
      const { data } = await this.$http.getJobData({
        city: this.getTotalCity,
        searchKey: "前端",
      });
      console.log(data);
      this.jobListId = data.jobListId;
      this.jobData = data.jobData;
      this.everyGetLimit = data.everyGetLimit;
      this.getMoreTimes = 1;
      this.isLoading = false;
      this.loading = false;
    },
    scrollEnd() {
      console.log("到底了");
      this.$refs.vanList.check(); //触发vant-list组件的load事件
    },
    async getMoreJobData() {
      console.log("加载更多");
      let startIndex, endIndex;

      // 判断是否还有数据
      if (this.jobListId.length - this.jobData.length < this.everyGetLimit) {
        startIndex = this.getMoreTimes * this.everyGetLimit;
        endIndex = this.jobListId.length;
        this.finished = true;
      } else {
        startIndex = this.getMoreTimes * this.everyGetLimit;
        endIndex = (this.getMoreTimes + 1) * this.everyGetLimit;
        this.getMoreTimes++;
      }

      const jobDataIds = this.jobListId.slice(startIndex, endIndex);
      console.log(startIndex, endIndex, jobDataIds);
      const { data } = await this.$http.getMoreJobData({ jobDataIds });
      this.jobData = [...this.jobData, ...data];
      this.loading = false;
    },
  },
  async created() {
    this.getJobData();
  },
};
</script>

<style lang="less" scoped>
.container {
  height: 100%;
  .overview {
    height: 100%;
    overflow: hidden;
    .jobItem-list {
      touch-action: none;
    }
  }
}
</style>
