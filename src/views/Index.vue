<template>
  <div id="index">
    <!-- 头部组件 -->
    <van-nav-bar fixed placeholder :border="false" class="navbar">
      <template #left>
        <van-icon
          class-prefix="my-icon"
          name="meau"
          class="menuicon"
          @click="$refs.popup.show = true"
        />
      </template>
      <template #title> Yukari Music </template>
      <template #right>
        <van-icon
          name="search"
          class="icon searchicon"
          @click="$router.push('/search')"
        />
      </template>
    </van-nav-bar>
    <!-- 轮播图组件 -->
    <index-swipe />
    <!-- 功能栏组件 -->
    <index-grid />
    <!-- 弹出层组件 -->
    <sidebar ref="popup" />
    <!-- 推荐歌单组件 -->
    <index-recom-playlist />
    <!-- 歌手排行 -->
    <index-rank-by-singer />
    <!-- 底部导航栏 -->
    <tab-bar />
  </div>
</template>

<script>
import IndexSwipe from "../components/Index/IndexSwipe.vue";
import IndexGrid from "../components/Index/IndexGrid.vue";
import Sidebar from "../components/Sidebar.vue";
import IndexRecomPlaylist from "../components/Index/IndexRecommPlaylist.vue";
import IndexRankBySinger from "../components/Index/IndexRankBySinger";
import TabBar from "../components/TabBar.vue";

export default {
  components: {
    IndexSwipe,
    IndexGrid,
    Sidebar,
    IndexRecomPlaylist,
    IndexRankBySinger,
    TabBar,
  },
};
</script>

<style lang="less" scoped>
#index {
  background-color: #fff;
  .navbar {
    .menuicon {
      color: #fff;
      font-size: 18px;
    }
    .searchicon {
      font-weight: 900;
      font-size: 20px;
    }
  }
}
</style>