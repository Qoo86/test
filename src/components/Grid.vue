<template>
  <div id="grid">
    <van-grid :border="false">
      <van-grid-item
        to="/dailyrecom"
        icon-prefix="my-icon"
        icon="ritui"
        text="每日推荐"
      />
      <van-grid-item icon-prefix="my-icon" icon="gedang" text="歌单" />
      <van-grid-item icon-prefix="my-icon" icon="fm" text="私人FM" />
      <van-grid-item icon-prefix="my-icon" icon="phb" text="排行榜" />
    </van-grid>
  </div>
</template>

<script>
export default {};
</script>

<style lang="less" scoped>
</style>