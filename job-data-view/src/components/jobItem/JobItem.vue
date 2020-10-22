<!--
 * @Author: LHN
 * @Date: 2020-10-18 16:54:01
 * @LastEditors: LHN
 * @LastEditTime: 2020-10-22 23:16:01
 * @description: In User Settings Edit
 * @FilePath: \job-data-helper\job-data-view\src\components\jobItem\JobItem.vue
-->
<template>
  <div :class="['jobItem',isTouch ? 'touch' : '']" @touchstart="touchStart" @touchend="touchEnd">
    <div class="wrap">
      <div class="company_img">
        <van-image width="4rem" height="4rem" :src="`https://www.lagou.com/${jobData.companyLogo}`" />
      </div>
      <div class="job_desc">
        <div class="job_desc-left">
          <h2 class="company_name">{{ jobData.companyShortName }}</h2>
          <div class="job_name">
            {{ `${jobData.positionName} [${jobData.city}]` }}
          </div>
          <div class="job-tag">
            <span class="tag" v-for="(item, index) in jobData.skillLabels" :key="index">
              <van-tag plain type="primary">{{ item }}</van-tag>
            </span>
          </div>
        </div>
        <div class="job_desc-right">
          <div class="salary">{{ jobData.salary }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import { Tag, Image as VanImage } from "vant";

Vue.use(Tag);
Vue.use(VanImage);
export default {
  name: "jobItem",
  props: {
    jobData: {
      type: Object,
      default: function() {
        return {};
      },
    },
  },
  data() {
    return {
      isTouch:false
    }
  },
  methods: {
    touchStart(){
      this.isTouch = true;
    },
    touchEnd(){
      this.isTouch = false
    }
  },
};
</script>

<style lang="less" scoped>
@import url("../../assets/css/common.less");
.jobItem {
  height: 6rem;
  padding: 1rem;
  box-sizing: border-box;
  border-bottom: 1px #e8e8e8 solid;
}

.touch {
  background-color: #eee;
}
.wrap {
  display: flex;
  height: 4rem;
  .company_img {
    margin-right: 0.4rem;
  }
  .job_desc {
    height: 4rem;
    flex: 1 1 auto;
    display: flex;
    .job_desc-left {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      .company_name {
        font-size: @Job-item-list-title;
        font-weight: @Job-item-list-title-weight;
      }
      .job_name {
        font-size: @Job-item-list-normal;
      }
      .job-tag {
        .tag {
          margin-right: 0.2rem;
        }
      }
    }
    .job_desc-right {
      flex: 0.3;
      display: flex;
      flex-direction: column;
      justify-content: center;
      .salary {
        font-size: @Job-item-salary-size;
        color: @Job-item-salary-color;
      }
    }
  }
}
</style>
