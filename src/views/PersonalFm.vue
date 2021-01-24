<template>
  <div id="fm">
    <!-- 头部导航栏 -->
    <van-nav-bar :border="false" class="navbar" @click-left="backlastroute">
      <template #left>
        <van-icon name="arrow-down" />
      </template>
      <template #title>
        <span class="title">私人FM</span>
      </template>
    </van-nav-bar>
    <div class="fm_body"></div>
  </div>
</template>

<script>
import { _getPersonalFm } from "../network/Fm";
export default {
  data() {
    return {};
  },
  methods: {
    // 返回上级路由
    backlastroute() {
      this.$router.go(-1);
    },
  },
  mounted() {},
};
</script>

<style lang="less" scoped>
#fm {
  width: 100%;
  height: 100%;
  background-image: radial-gradient(
    circle 919px at 1.7% 6.1%,
    rgba(41, 58, 76, 1) 0%,
    rgba(40, 171, 226, 1) 100.2%
  );
  .navbar {
    background-color: transparent;
    z-index: 999;
    .title {
      color: #fff;
      font-size: 16px;
    }
  }
  .fm_body {
    height: 621px;
  }
}
</style>