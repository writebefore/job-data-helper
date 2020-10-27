<!--
 * @Author: LHN
 * @Date: 2020-10-24 17:08:42
 * @LastEditors: LHN
 * @LastEditTime: 2020-10-26 22:43:57
 * @description: In User Settings Edit
 * @FilePath: \job-data-helper\job-data-view\src\views\jobDetail\JobDetail.vue
-->
<template>
  <div class="job-detail">
    <van-nav-bar title="职位详情" left-text="返回" left-arrow @click-left="onClickLeft">
      <template #right>
        <div class="icon">
          <van-icon class-prefix="iconfont" name="shouye" size="18" />
        </div>
      </template>
    </van-nav-bar>
    <div class="jobTitle">
      <h2 class="jobTitle_text">职位标题</h2>
      <div class="collection_icon"><van-icon name="star-o" color="#f4ea2a" /></div>
    </div>
    <div v-html="jobDetail"></div>
  </div>
</template>

<script>
import Vue from "vue";
import { NavBar, Icon, Cell } from "vant";
Vue.use(NavBar);
Vue.use(Icon);
Vue.use(Cell);
export default {
  name: "jobDetail",
  data() {
    return {
      positionId: "",
      jobDetail: "",
    };
  },
  methods: {
    async getJobDetail() {
      console.log("positionId", this.positionId);
      let { data } = await this.$http.getJobDetail({ positionId: this.positionId });
      this.jobDetail = data.jobDetail;
    },
    onClickLeft() {
      this.$router.go(-1);
    },
  },
  created() {
    this.positionId = this.$route.query.positionId;
    this.getJobDetail();
  },
};
</script>

<style lang="less" scoped>
.icon{
  font-weight: bolder;
}
.jobTitle {
  height: 2rem;
  display: flex;
  font-size: 1.3rem;
  justify-content: space-between;
  align-items: center;
  padding: 8px 10px;
  font-weight: bolder;
  border-bottom: 1px #eee solid;
}
</style>
