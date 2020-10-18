<!--
 * @Author: LHN
 * @Date: 2020-10-18 16:54:01
 * @LastEditors: LHN
 * @LastEditTime: 2020-10-18 23:08:25
 * @description: In User Settings Edit
 * @FilePath: \job-data-helper\job-data-view\src\components\jobItem\JobItem.vue
-->
<template>
  <div class="jobItem">
    <div class="wrap">
      <div class="company_img">
        <van-image
          width="4rem"
          height="4rem"
          src="https://img.yzcdn.cn/vant/cat.jpeg"
        />
      </div>
      <div class="job_desc">
        <div class="job_desc-left"></div>
        <div class="job_desc-right"></div>
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
  props: {},
  data() {
    return {};
  },
};
</script>

<style lang='less' scoped>
@import url("../../assets/css/common.less");
.jobItem {
  height: 6rem;
  padding: 1rem;
  box-sizing: border-box;
  border-bottom: 1px #e8e8e8 solid;
}

.wrap{
  display: flex;
  height: 4rem;
  .company_img{
    margin-right: 0.2rem;
  }
  .job_desc{
    height: 4rem;
    flex: 1 1 auto;
  }
}
</style>