<!--
 * @Author: LHN
 * @Date: 2020-10-24 17:08:42
 * @LastEditors: LHN
 * @LastEditTime: 2020-10-24 18:13:49
 * @description: In User Settings Edit
 * @FilePath: \job-data-helper\job-data-view\src\views\jobDetail\JobDetail.vue
-->
<template>
  <div class="job-detail">
      <div v-html="jobDetail"></div>
  </div>
</template>

<script>
export default {
  name: "jobDetail",
  data() {
    return {
      jobData: {},
      jobDetail: "",
    };
  },
  methods: {
      async getJobDetail(){
        let {data} = await this.$http.getJobDetail({positionId:this.jobData.positionId});
        this.jobDetail = data.jobDetail;
      }
  },
  created() {
    console.log(this.$route.query);
    this.jobData =  JSON.parse(this.$route.query.jobData);
    console.log(this.jobData);
    this.getJobDetail();
  },
};
</script>

<style></style>
