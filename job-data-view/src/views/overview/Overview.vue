<!--
 * @Author: LHN
 * @Date: 2020-10-17 17:10:48
 * @LastEditors: LHN
 * @LastEditTime: 2020-10-19 23:28:59
 * @description: In User Settings Edit
 * @FilePath: \job-data-helper\job-data-view\src\views\overview\OverView.vue
-->
<template>
  <better-scroll
    class="overview"
    :data="jobData"
    :beforeScroll="beforeScroll"
  >
    <div class="jobItem-list">
      <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
        <van-list
          v-model="loading"
          :finished="finished"
          finished-text="没有更多了"
        >
          <job-item
            v-for="(item, index) in jobData"
            :key="index"
            :jobData="item"
          ></job-item>
        </van-list>
      </van-pull-refresh>
    </div>
  </better-scroll>
</template>

<script>
import JobItem from "../../components/jobItem/JobItem";
import BetterScroll from "@/components/scroll/BetterScroll";
import { mapGetters } from "vuex";
import Vue from "vue";
import { PullRefresh, List } from "vant";

Vue.use(PullRefresh);
Vue.use(List);
export default {
  name: "overview",
  data() {
    return {
      jobListId: [], // 职位positionId数组
      jobData: [], // 职位信息
      everyGetLimit: undefined, // 每次获取数据限制条数

      isLoading: false,
      loading: false,
      finished: false,

      beforeScroll: true,
    };
  },
  components: {
    JobItem,
    BetterScroll,
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
      this.isLoading = false;
      this.jobListId = data.jobListId;
      this.jobData = data.jobData;
      this.everyGetLimit = data.everyGetLimit;
    },
  },
  async created() {
    this.getJobData();
  },
  computed: {
    ...mapGetters(["getTotalCity"]),
  },
};
</script>

<style lang='less'>
.overview {
  height: 100%;
  overflow: hidden;
  .jobItem-list {
    touch-action: none;
  }
}
</style>