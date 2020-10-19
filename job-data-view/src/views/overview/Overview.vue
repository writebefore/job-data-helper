<!--
 * @Author: LHN
 * @Date: 2020-10-17 17:10:48
 * @LastEditors: LHN
 * @LastEditTime: 2020-10-19 20:44:06
 * @description: In User Settings Edit
 * @FilePath: \job-data-helper\job-data-view\src\views\overview\OverView.vue
-->
<template>
  <better-scroll class="overview">
    <div>
      <job-item v-for="(item,index) in jobData" :key="index" :jobData="item"></job-item>
    </div>
  </better-scroll>
</template>

<script>
import JobItem from "../../components/jobItem/JobItem";
import BetterScroll from "@/components/scroll/BetterScroll";
import { mapGetters } from "vuex";
export default {
  name: "overview",
  data() {
    return {
      jobListId: [], // 职位positionId数组
      jobData: [], // 职位信息
      everyGetLimit: undefined, // 每次获取数据限制条数
    };
  },
  components: {
    JobItem,
    BetterScroll,
  },
  async created() {
    const { data } = await this.$http.getJobData({
      city: this.getTotalCity,
      searchKey: "前端",
    });
    console.log(data);
    this.jobListId = data.jobListId;
    this.jobData = data.jobData;
    this.everyGetLimit = data.everyGetLimit;
  },
  computed: {
    ...mapGetters(['getTotalCity'])
  },
};
</script>

<style lang='less'>
.overview {
  height: 100%;
}
</style>