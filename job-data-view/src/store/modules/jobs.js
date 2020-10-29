/*
 * @Author: LHN
 * @Date: 2020-10-26 22:48:45
 * @LastEditors: LHN
 * @LastEditTime: 2020-10-28 21:43:17
 * @description: In User Settings Edit
 * @FilePath: \job-data-helper\job-data-view\src\store\modules\jobs.js
 */
import Services from '../../axios/index';  

const state = {
  jobListId: [], // 职位positionId数组
  jobData: [], // 职位信息
  everyGetLimit: 0, // 每次获取数据限制条数
  getMoreTimes: 1, // 获取更多的次数

  chosenJobData: {}, // 选择的要查看的职位详情
  isFinished: false, // 数据是否全部获取完

  isRefresh: false, // 是否正在刷新数据
  isLoading: false, // 是否正在加载数据
};
const getters = {
  getJobListId: (state) => state.jobListId,
  getJobData: (state) => state.jobData,
  getIsFinished: (state) => state.isFinished,
  getChosenJobData: (state) => state.chosenJobData,
  getIsRefresh: (state) => state.isRefresh,
  getIsLoading: (state) => state.isLoading,
};
const mutations = {
  setJobListId(state, jobListId) {
    state.jobListId = [ ...jobListId ];
  },
  setJobData(state, jobData) {
    state.jobData = [...jobData ];
  },
  setEveryGetLimit(state, everyGetLimit) {
    state.everyGetLimit = everyGetLimit;
  },
  setGetMoreTimes(state, getMoreTimes) {
    state.getMoreTimes = getMoreTimes;
  },
  setIsFinished(state, isFinished) {
    state.isFinished = isFinished;
  },
  setChosenJobData(state, chosenJobData) {
    state.chosenJobData = chosenJobData;
  },
  setIsRefresh(state, isRefresh){
    state.isRefresh = isRefresh;
  },
  setIsLoading(state, isLoading){
    state.isLoading = isLoading;
  }
};
const actions = {
  async refreshJobData({ commit, state }, {city,searchKey}) {
    commit("setIsFinished", false);
    commit("setIsRefresh", true);
    const { data } = await Services.getJobData({city,searchKey});
    if (!data.jobData.length || !data.jobListId.length) {
      commit("setIsFinished", true);
    }
    if (state.jobListId.length || state.jobData.length) {
      commit("setJobData", []);
      commit("setJobListId", []);
    }
    commit("setJobListId", [...data.jobListId]);
    commit("setJobData", [...data.jobData]);
    commit("setEveryGetLimit", data.everyGetLimit);
    commit("setGetMoreTimes", 1);
    commit("setIsRefresh", false);
    commit("setIsLoading",false)
  },

  async getMoreJobData({ commit, state }) {
    if (state.isFinished) {
      return;
    }
    let startIndex, endIndex;
    if (state.jobListId.length - state.jobData.length <= state.everyGetLimit) {
      startIndex = state.getMoreTimes * state.everyGetLimit; // 获取起始下标
      endIndex = state.jobListId.length;
      commit("setIsFinished", true);
    } else {
      startIndex = state.getMoreTimes * state.everyGetLimit;
      endIndex = startIndex + state.everyGetLimit;
      commit("setGetMoreTimes", state.getMoreTimes + 1);
    }

    const jobDataIds = state.jobListId.slice(startIndex, endIndex);
    console.log(startIndex, endIndex, jobDataIds);
    const { data } = await Services.getMoreJobData({ jobDataIds });
    commit('setJobData', [...state.jobData, ...data]);
    commit("setIsLoading", false);
  },
};

export default {
  state,
  getters,
  mutations,
  actions,
};
