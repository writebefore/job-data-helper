<!--
 * @Author: LHN
 * @Date: 2020-10-17 17:10:48
 * @LastEditors: LHN
 * @LastEditTime: 2020-10-18 21:59:10
 * @description: In User Settings Edit
 * @FilePath: \job-data-helper\job-data-view\src\views\overview\OverView.vue
-->
<template>
    <better-scroll class="overview">
      <div>
        <job-item v-for="i in 10" :key="i"></job-item>
      </div>
    </better-scroll>
</template>

<script>
import JobItem from '../../components/jobItem/JobItem'
import BetterScroll from '@/components/scroll/BetterScroll'
export default {
    name:'overview',
    data() {
        return {
            
        }
    },
    components:{
      JobItem,
      BetterScroll,
    }
}
</script>

<style lang='less'>
  .overview{
    height: 100%;
  }
</style>