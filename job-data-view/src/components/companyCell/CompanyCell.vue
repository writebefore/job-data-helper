<!--
 * @Author: LHN
 * @Date: 2020-10-28 21:45:48
 * @LastEditors: LHN
 * @LastEditTime: 2020-10-29 14:24:57
 * @description: In User Settings Edit
 * @FilePath: \job-data-helper\job-data-view\src\components\companyCell\CompanyCell.vue
-->
<template>
  <div class="company-cell">
    <div class="container">
      <div class="company-average">
        <van-image width="4rem" height="4rem" :src="`https://www.lagou.com/${companyLogo}`" />
      </div>
      <div class="message">
        <div class="company-title">{{ companyShortName }}</div>
        <div class="short-view">{{ shortView }}</div>
        <div class="company-label-list">
          <span class="tag" v-for="(item, index) in companyLabelList" :key="index">
            <van-tag plain type="primary">{{ item }}</van-tag>
          </span>
        </div>
      </div>
      <div class="location">
        <van-icon class-prefix="iconfont" name="weizhi" size="20px"/>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import { Image as VanImage, Tag, Icon } from "vant";
Vue.use(VanImage);
Vue.use(Tag);
Vue.use(Icon);

export default {
  name: "company-cell",
  props: {
    companyLogo: {
      type: String,
    },
    companyShortName: {
      type: String,
    },
    shortView: {
      type: String,
    },
    companyLabelList: {
      type: Array,
    },
  },
};
</script>

<style lang="less" scoped>
@import url("../../assets/css/common.less");
.company-cell {
  padding: @Job-detail-font-padding-top @Job-detail-font-padding-left;
  border-bottom: 1px #eee solid;
  .container {
    height: 4rem;
    display: flex;
  }
  .company-average {
    margin-right: 8px;
  }
  .message {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    .company-title {
      font-weight: bolder;
      color: @Job-item-salary-color;
    }
    .short-view {
      font-size: @Job-item-list-normal;
      color: gray;
    }
    .company-label-list {
      .tag {
        margin-right: 8px;
      }
    }
  }
  .location {
    text-align: center;
    margin: auto;
    font-weight: bolder;
  }
}
</style>
