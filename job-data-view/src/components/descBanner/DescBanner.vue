<!--
 * @Author: LHN
 * @Date: 2020-10-29 14:31:21
 * @LastEditors: LHN
 * @LastEditTime: 2020-10-29 14:47:59
 * @description: In User Settings Edit
 * @FilePath: \job-data-helper\job-data-view\src\components\descBanner\DescBanner.vue
-->
<template>
  <div class="desc-banner">
    <div class="container">
      <slot name="container">{{ title }}</slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "descBanner",
  props: {
    title: {
        type:String,
    },
  },
};
</script>

<style lang="less" scoped>
@import url("../../assets/css/common.less");
.desc-banner {
  height: 2rem;
  background-color: @Desc-banner-bgc;
  line-height: 2rem;
  .container {
    margin-left: @Job-detail-font-padding-left;
    color: @Job-item-salary-color;
    font-size: @Job-item-list-normal;
  }
}
</style>
