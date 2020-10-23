<!--
 * @Author: LHN
 * @Date: 2020-10-17 17:23:39
 * @LastEditors: LHN
 * @LastEditTime: 2020-10-23 20:20:05
 * @description: In User Settings Edit
 * @FilePath: \job-data-helper\job-data-view\src\views\mine\Mine.vue
-->
<template>
  <div class="mine">
    <div class="user-info">
      <div class="average">
        <van-image width="4rem" height="4rem" round src="https://img.yzcdn.cn/vant/cat.jpeg" />
      </div>
      <div class="user-message">
        <span class="user-name">test</span>
      </div>
      <div class="icon"><van-icon class-prefix="iconfont" name="xiugai" /></div>
    </div>
    <div class="chooseItem">
      <van-cell-group >
        <van-cell title="历史记录" clickable is-link size="large"  />
        <van-cell title="查看收藏" clickable is-link size="large"  />
        <van-cell title="评论历史" clickable is-link size="large"  />
        <van-cell title="退出" clickable is-link size="large"  />
      </van-cell-group>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import { Image as VanImage, Icon, Cell, CellGroup } from "vant";

Vue.use(VanImage);
Vue.use(Icon);
Vue.use(Cell);
Vue.use(CellGroup);
export default {
  name: "mine",
};
</script>

<style lang="less" scoped>
@import url("../../assets/css/common.less");
.mine {
  .user-info {
    background-color: white;
    width: 100%;
    display: flex;
    height: @User-info-height;
    padding: @User-info-padding;
    box-sizing: border-box;
    outline: 1px solid #eee;
    justify-content: space-between;
    .average {
      width: @User-info-msg-height;
      height: @User-info-msg-height;
    }
    .user-message {
      line-height: @User-info-msg-height;
      .user-name {
        font-size: @User-name-size;
        display: inline-block;
      }
    }
    .icon {
      width: @User-info-msg-height;
      height: @User-info-msg-height;
      line-height: @User-info-msg-height;
      text-align: center;
    }
    .chooseItem {
      background-color: white;
      margin-top: 1rem;
    }
  }
}
</style>
