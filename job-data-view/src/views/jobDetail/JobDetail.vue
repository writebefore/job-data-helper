<!--
 * @Author: LHN
 * @Date: 2020-10-24 17:08:42
 * @LastEditors: LHN
 * @LastEditTime: 2020-10-29 18:45:27
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
      <h2 class="jobTitle_text">{{ jobData.positionName }}</h2>
      <div class="collection_icon"><van-icon name="star-o" color="#f4ea2a" /></div>
    </div>
    <div class="job-message">
      <div class="items">
        <span class="item salary">
          <van-icon class-prefix="iconfont" color="#52b38a" name="qian" size="18" />
          <span class="text">{{ jobData.salary }}</span>
        </span>
        <span class="item workaddress">
          <van-icon class-prefix="iconfont" color="#52b38a" name="location" size="18" />
          <span class="text">{{ jobData.city }}</span>
        </span>
        <span class="item jobnature">
          <van-icon class-prefix="iconfont" color="#52b38a" name="shijian" size="18" />
          <span class="text">{{ jobData.jobNature }}</span>
        </span>
        <span class="item workyear">
          <van-icon class-prefix="iconfont" color="#52b38a" name="-jichushezhi" size="18" />
          <span class="text">{{ jobData.workYear }}</span>
        </span>
        <span class="item education">
          <van-icon class-prefix="iconfont" color="#52b38a" name="xueli" size="18" />
          <span class="text">{{ jobData.education }}</span>
        </span>
      </div>
      <div class="advantage">{{ `职位诱惑：${jobData.positionAdvantage}` }}</div>
    </div>
    <company-cell :companyLogo="jobData.companyLogo" :companyShortName="jobData.companyShortName" :shortView="`${jobData.industryField} | ${jobData.financeStage} | ${jobData.companySize}`" :companyLabelList="jobData.companyLabelList"></company-cell>
    <desc-banner :title="banner1"></desc-banner>
    <div class="job-detail-body">
      <div class="job-detail_text" v-html="jobDetail"></div>
    </div>
    <desc-banner :title="banner2"></desc-banner>
  </div>
</template>

<script>
import Vue from "vue";
import { NavBar, Icon, Cell } from "vant";
import CompanyCell from "../../components/companyCell/CompanyCell";
import DescBanner from "../../components/descBanner/DescBanner";
Vue.use(NavBar);
Vue.use(Icon);
Vue.use(Cell);
export default {
  name: "jobDetail",
  components: {
    CompanyCell,
    DescBanner,
  },
  data() {
    return {
      jobData: { ...this.$store.state.jobs.chosenJobData },
      positionId: "",
      jobDetail: "",

      banner1:"职位描述",
      banner2:"职位评价"
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
    console.log(this.jobData);
    this.getJobDetail();
  },
};
</script>

<style lang="less" scoped>
@import url("../../assets/css/common.less");
.icon {
  font-weight: bolder;
}
.jobTitle {
  height: 2rem;
  display: flex;
  font-size: 1.3rem;
  justify-content: space-between;
  align-items: center;
  padding: @Job-detail-font-padding-top @Job-detail-font-padding-left;
  font-weight: bolder;
  border-bottom: 1px #eee solid;
}
.job-message {
  padding: @Job-detail-font-padding-top @Job-detail-font-padding-left;
  border-bottom: 1px #eee solid;
  .items {
    .item {
      margin: 8px 0;
      display: inline-block;
      width: 33.3%;
      white-space: nowrap;
      .text {
        margin-left: @Job-detail-font-padding-left;
      }
    }
  }

  .item:nth-child(3n + 1) {
    text-align: start;
  }
  .item:nth-child(3n + 2) {
    text-align: center;
  }
  .item:nth-child(3n) {
    text-align: end;
  }

  .advantage {
    height: 1.5rem;
    text-align: start;
    line-height: 1.5rem;
    color: gray;
    font-size: @Job-detail-font-size;
  }
}

.job-detail-body {
  padding: @Job-detail-font-padding-top @Job-detail-font-padding-left;
  .job-detail_text{
    font-size: @Job-item-list-normal;
    line-height: 1.5rem;
  }
}
</style>
