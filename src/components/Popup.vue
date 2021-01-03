<template>
  <van-popup
    v-model="show"
    position="left"
    :style="{
      height: '100%',
      width: '80%',
      background: '#F5F5F6',
    }"
  >
    <div class="user">
      <div class="user_avatar">
        <img v-if="userLoginStatus" :src="userimg" />
        <img v-else src="../assets/images/logo.jpg" />
      </div>
      <div class="user_name">
        <span v-if="userLoginStatus">{{ username }}</span>
        <router-link v-else :to="{ path: '/login' }" tag="span" class="loginbtn"
          >点击登录</router-link
        >
      </div>
    </div>
    <div class="funList">
      <van-cell :title="'当前登录状态：' + loginStatusGetText"></van-cell>
    </div>
    <div class="funList">
      <van-cell
        title="消息"
        icon-prefix="my-icon"
        icon="msg"
        is-link
        to="/myMessage"
      />
      <van-cell title="创作者中心" icon-prefix="my-icon" icon="czz" is-link />
    </div>
    <div class="funList">
      <van-cell title="音乐黑名单" icon-prefix="my-icon" icon="ban" is-link />
      <van-cell title="青少年模式" icon-prefix="my-icon" icon="qsn" is-link />
      <van-cell title="我的订单" icon-prefix="my-icon" icon="order" is-link />
      <van-cell title="优惠券" icon-prefix="my-icon" icon="yhq" is-link />
      <van-cell title="音乐闹钟" icon-prefix="my-icon" icon="nz" is-link />
    </div>
    <div class="funList">
      <van-cell
        title="关于"
        icon-prefix="my-icon"
        icon="about"
        is-link
        to="/about"
      />
    </div>
    <div class="funList">
      <van-button
        type="default"
        block
        @click="loginout"
        v-show="userLoginStatus"
        >退 出 登 录</van-button
      >
    </div>
  </van-popup>
</template>

<script>
export default {
  data() {
    return {
      show: false,
      username: "",
      userimg: "",
      userLoginStatus: false,
      loginStatusGetText: "",
    };
  },
  methods: {
    // 获取登录状态
    async getLoginStatus() {
      let result = await this.$http({
        url: `login/status`,
        withCredentials: true,
      }).catch(function (err) {
        return err.response;
      });
      if (result.data.code == 200) {
        this.userLoginStatus = true;
        // 能够获取到登陆状态之后去获取用户信息
        this.getUserInfo();
        this.loginStatusGetText = "已登录";
      } else if (result.data.code == 301) {
        this.userLoginStatus = false;
        this.loginStatusGetText = result.data.msg;
        this.$store.commit("saveuserProfile", null);
      }
    },

    // 获取用户信息
    async getUserInfo() {
      let { data } = await this.$http({
        url: `user/account`,
        withCredentials: true,
      });
      let userinfo = data.profile;
      this.username = userinfo.nickname;
      this.userimg = userinfo.avatarUrl;
    },

    // 退出登录
    async loginout() {
      let { data } = await this.$http({
        url: `logout`,
        withCredentials: true,
      });
      if (data.code == 200) {
        window.localStorage.removeItem("token");
        window.localStorage.removeItem("userid");
        // this.$msg.success("退出登录成功");
        window.location.reload();
        this.getLoginStatus();
      }
    },
  },
  mounted() {
    this.getLoginStatus();
  },
};
</script>

<style lang="less" scoped>
.user {
  margin: 12px 0 0 16px;
  display: flex;
  align-items: center;
  .user_avatar {
    width: 36px;
    height: 36px;
    border-radius: 50%;
    border: 2px solid rgb(255, 145, 145);
    background-color: rgba(255, 145, 145, 0.2);
    overflow: hidden;
    position: relative;
    img {
      width: inherit;
      height: inherit;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }
  .user_name {
    cursor: pointer;
    font-size: 14px;
    margin-left: 20px;
    .loginbtn {
      border: 1px solid #ec4141;
      color: #ec4141;
      line-height: 14px;
      border-radius: 15px;
      padding: 1px 8px;
    }
  }
  .arrow_icon {
    cursor: pointer;
    margin-left: 10px;
    margin-top: 4.2px;
    font-size: 14px;
  }
}
.funList {
  width: 90%;
  border-radius: 16px;
  background-color: #fff;
  margin: 20px auto;
  overflow: hidden;
}
.van-cell__left-icon {
  margin-right: 10px;
}
</style>