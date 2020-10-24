<!--
 * @Author: LHN
 * @Date: 2020-10-07 15:47:19
 * @LastEditors: LHN
 * @LastEditTime: 2020-10-23 21:10:29
 * @description: In User Settings Edit
 * @FilePath: \job-data-helper\job-data-view\src\views\login\Login.vue
-->
<template>
  <div class="login">
    <div class="container">
      <div class="app-title">
        <div class="status">{{ isLogin ? "登录" : "注册" }}</div>
        JOB-DATA
      </div>
      <van-form @failed="onFailed" @submit="onSubmit" ref="InputForm">
        <van-field
          v-model="user.userName"
          icon-prefix="iconfont"
          left-icon="user_name"
          clearable
          :rules="[
            {
              pattern: userNamePattern,
              message: '4到10位(字母,数字,下划线,减号)',
            },
          ]"
          placeholder="请输入用户名"
        />
        <van-field
          v-model="user.password"
          icon-prefix="iconfont"
          left-icon="mima"
          type="password"
          clearable
          :rules="[
            {
              pattern: userNamePattern,
              message: '6到15位(字母,数字,特殊字符_-~!@#$%^&*?)',
            },
          ]"
          placeholder="请输入密码"
        />
        <div class="login-button">
          <van-button type="primary" native-type="submit" plain size="large"
            ><span>{{ isLogin ? "登录" : "注册" }}</span></van-button
          >
        </div>
      </van-form>

      <div class="resgister_message">
        {{ isLogin ? "未注册账号?" : "已有账号?"
        }}<span @click="changeStatus">{{
          !isLogin ? "点击登录" : "点击注册"
        }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import {mapActions} from "vuex";
import { Button, Field, Toast, Form } from "vant";

Vue.use(Button);
Vue.use(Field);
Vue.use(Toast);
Vue.use(Form);
Vue.use(Toast);
export default {
  name: "login",
  data() {
    return {
      isLogin: true,
      user: {
        userName: "",
        password: "",
      },
      userNamePattern: /^[a-zA-Z0-9_-]{4,10}$/, // 用户名正则校验
      passwordPattern: /^[a-zA-Z0-9_-~!@#$%^&*?]{6,15}$/, // 密码校验
    };
  },
  methods: {
    // 切换正常还是登陆
    ...mapActions(["loadUserInfo"]),
    changeStatus() {
      this.clearInput();
      this.isLogin = !this.isLogin;
    },
    // 提交事件
    onSubmit() {
      this.isLogin ? this.login() : this.register();
    },
    // 登录事件
    async login() {
      console.log("登录");
      try {
        const { data } = await this.$http.userLogin(this.user);
        this.loadUserInfo(data);
        sessionStorage.setItem("authorization", data.token);
        console.log(data);
        this.$router.push({
          name: "home",
          params: {
            user: {
              userId: data.userId,
              userName: data.userName,
              headerImg: data.headerImg,
            },
          },
        });
      } catch (err) {
        Toast.fail(err.msg)
        console.log(err);
      }
    },
    // 注册事件
    async register() {
      console.log("注册");
      try {
        const { data } = await this.$http.userRegister(this.user);
        console.log(data);
        this.$router.push({
          name: "home",
          params: {
            user: {
              userId: data.userId,
              userName: data.userName,
              headerImg: data.headerImg,
            },
          },
        });
      } catch (err) {
        console.log(err);
      }
    },
    // 清空表单
    clearInput() {
      this.user.userName = "";
      this.user.password = "";
      this.$refs.InputForm.resetValidation();
    },
    // 表单验证失败
    onFailed() {
      Toast.fail("请按要求输入表单内容!");
    },
  },
};
</script>

<style lang='less' scoped>
@import url("../../assets/css/common.less");
.login {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-image: url("./img/background.jpg");
  background-repeat: no-repeat;
  background-size: cover;
  .container {
    width: 80vw;
    margin: 0 auto;
    text-align: center;
    .app-title {
      margin: 4.5rem 0px;
      font-size: @App-title-size;
      font-weight: bolder;
      .status {
        margin: 0.5rem 0px;
        font-size: @App-font-size;
      }
    }
    .login-button {
      margin-top: 6rem;
      span {
        font-size: 1rem;
        font-weight: bolder;
      }
    }
    .resgister_message {
      margin-top: 4rem;
      font-size: @App-font-size;
      span {
        color: red;
      }
    }
  }
}
</style>