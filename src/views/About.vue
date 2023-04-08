<template>
  <div>
    <!-- 头部组件 -->
    <van-nav-bar fixed placeholder :border="false" class="navbar">
      <template #left>
        <van-icon name="arrow-left" color="#fff" @click="$router.go(-1)" />
      </template>
      <template v-slot:title> 关于Yukari Music </template>
    </van-nav-bar>
    <!-- 主体内容 -->
    <div class="content">
      <div class="logo">
        <img src="../assets/images/logo.jpg" />
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="less" scoped>
.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 30px;
  .logo {
    margin-bottom: 10%;
    width: 100px;
    height: 100px;
    > img {
      width: inherit;
      height: inherit;
    }
  }
  > p {
    font-size: 14px;
    color: #5b5b5b;
    line-height: 30px;
  }
}
</style>
