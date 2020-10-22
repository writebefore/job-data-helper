<!--
 * @Author: LHN
 * @Date: 2020-10-12 19:09:41
 * @LastEditors: LHN
 * @LastEditTime: 2020-10-22 19:09:07
 * @description: In User Settings Edit
 * @FilePath: \job-data-helper\job-data-view\src\views\cityList\CityList.vue
-->
<template>
  <div class="cityList">
    <van-nav-bar
      title="城市列表"
      left-text="返回"
      right-text="定位"
      @click-left="goBack"
      @click-right="getLocation"
      left-arrow
    />

    <div class="search">
      <van-search
        v-model="searchCity"
        placeholder="请输入搜索关键词"
        @input="onChange"
      />
    </div>
    <div class="container" v-show="!searchCity">
      <van-cell title="热门城市" :border="false" />
      <van-grid :gutter="8" clickable>
        <van-grid-item v-for="value in hotCityList" :key="value" :text="value" @click="changeCity(value)">
        </van-grid-item>
      </van-grid>
      <van-index-bar :index-list="indexList">
        <template v-for="(item, index) in cityList">
          <van-index-anchor
            v-if="/[A-Z]{1}/.test(item)"
            :index="item"
            :key="index"
          />
          <van-cell v-else clickable :title="item" :key="index" @click="changeCity(item)"/>
        </template>
      </van-index-bar>
    </div>

    <div class="serchResult" v-show="searchCity">
      <van-cell
        v-for="(item, index) in searchResultList"
        clickable
        :title="item"
        :key="index"
        @click="changeCity(item)"
      />
    </div>
  </div>
</template>

<script>

import {
  IndexBar,
  IndexAnchor,
  NavBar,
  Cell,
  Tag,
  Grid,
  GridItem,
  Search,
  Form,
} from "vant";
import Vue from "vue";
Vue.use(IndexBar);
Vue.use(IndexAnchor);
Vue.use(NavBar);
Vue.use(Cell);
Vue.use(Tag);
Vue.use(Grid);
Vue.use(GridItem);
Vue.use(Search);
Vue.use(Form);

import cities from "./city.json";
import { mapActions } from "vuex";
import txMapApi from "../../utils/mapServer/index"
export default {
  name: "cityList",
  data() {
    return {
      hotCityList: [
        "全国",
        "北京",
        "上海",
        "深圳",
        "广州",
        "杭州",
        "成都",
        "南京",
        "武汉",
        "西安",
        "厦门",
        "长沙",
        "苏州",
        "天津",
      ],
      cityList: [...cities],
      indexList: [],
      searchResultList: [],
      searchCity: "",
    };
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    onChange() {
      this.searchResultList = this.cityList.filter((item) => {
        return item.match(this.searchCity);
      });
    },
    changeCity(city) {
      this.chooseCity(city);
      this.goBack();
    },
    getLocation(){
      txMapApi.getLocalCity().then(res => {
        let city = res.result.ad_info.city || res.result.ad_info.province;
        city = city.substr(0, city.length - 1); // 去除城市名后缀 市或其他
        this.changeCity(city);
      }).catch(err => {
        console.log(err);
      })
    },
    ...mapActions(["chooseCity"]),
  },
  created() {
    this.indexList = this.cityList.filter((item) => {
      return /[A-Z]{1}/.test(item);// 过滤索引
    });
  },
};
</script>

<style>
</style>