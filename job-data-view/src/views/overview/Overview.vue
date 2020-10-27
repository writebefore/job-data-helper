<!--
 * @Author: LHN
 * @Date: 2020-10-17 17:10:48
 * @LastEditors: LHN
 * @LastEditTime: 2020-10-27 21:19:21
 * @description: In User Settings Edit
 * @FilePath: \job-data-helper\job-data-view\src\views\overview\Overview.vue
-->
<template>
  <div class="container">
    <better-scroll class="overview" :data="getJobData" :beforeScroll="beforeScroll" :pullup="pullup" @scrollToEnd="scrollEnd" v-show="getJobData.length">
      <div class="jobItem-list">
        <van-pull-refresh v-model="isRefresh" @refresh="onRefresh">
          <van-list v-model="isLoading" :finished="getIsFinished" finished-text="没有更多了" offset="300" @load="getMoreJobData" ref="vanList" :immediate-check="false">
            <job-item v-for="(item, index) in getJobData" :key="index" :jobData="item"></job-item>
          </van-list>
        </van-pull-refresh>
      </div>
    </better-scroll>
    <van-empty image="search" description="描述文字" v-show="!getJobData.length" />
  </div>
</template>

<script>
import JobItem from "../../components/jobItem/JobItem";
import BetterScroll from "@/components/scroll/BetterScroll";
import { mapActions, mapGetters } from "vuex";
import Vue from "vue";
import { PullRefresh, List, Empty } from "vant";

Vue.use(PullRefresh);
Vue.use(List);
Vue.use(Empty);
export default {
  name: "overview",
  data() {
    return {
      // better-scroll 配置
      beforeScroll: true,
      pullup: true,
    };
  },
  components: {
    JobItem,
    BetterScroll,
  },
  methods: {
    ...mapActions(["refreshJobData", "getMoreJobData"]),
    scrollEnd() {
      console.log("到底了");
      this.$refs.vanList.check(); //触发vant-list组件的load事件
    },
    onRefresh() {
      this.refreshJobData({ city: this.getTotalCity, searchKey: "前端" });
    },
  },
  computed: {
    ...mapGetters(["getTotalCity", "getJobListId", "getJobData", "getIsFinished"]),
    isRefresh: {
      get() {
        return this.$store.state.jobs.isRefresh;
      },
      set(value) {
        this.$store.commit("setIsRefresh", value);
      },
    },
    isLoading: {
      get() {
        return this.$store.state.jobs.isLoading;
      },
      set(value) {
        this.$store.commit("setIsLoading", value);
      },
    },
  },
  created() {
    this.refreshJobData({ city: this.getTotalCity, searchKey: "前端" });
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
