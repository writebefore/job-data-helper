/*
 * @Author: LHN
 * @Date: 2020-10-23 20:55:12
 * @LastEditors: LHN
 * @LastEditTime: 2020-10-23 21:05:37
 * @description: In User Settings Edit
 * @FilePath: \job-data-helper\job-data-view\src\store\modules\user.js
 */
const state = {
    userInfo: {},
};

const getters = {
    getUserInfo:(state) => state.userInfo,
};

const mutations = {
    setUserInfo(state, userInfo){
        state.userInfo = {...userInfo};
    }
};

const actions = {
    loadUserInfo({commit}, userInfo){
        commit('setUserInfo',userInfo);
    }
};

export default {
    state,
    getters,
    mutations,
    actions,
}