<template>
  <div>
    <!-- 头部组件 -->
    <header-bar>
      <template v-slot:left>
        <van-icon
          class-prefix="my-icon"
          name="meau"
          size="0.5rem"
          color="#fff"
          @click="showPopup"
          badge="坑"
        ></van-icon>
      </template>
      <template v-slot:title> Yukari Music </template>
      <template v-slot:right>
        <van-icon
          class-prefix="my-icon"
          name="search"
          size="0.5rem"
          color="#fff"
          @click="toSearch"
        ></van-icon
      ></template>
    </header-bar>
    <!-- 轮播图组件 -->
    <swipe></swipe>
    <!-- 功能栏组件 -->
    <grid></grid>
    <!-- 弹出层组件 -->
    <popup ref="popup"></popup>
    <!-- 推荐歌单组件 -->
    <recom-song-list></recom-song-list>
    <ranking-list-by-index></ranking-list-by-index>
    <!-- 底部导航栏 -->
    <tab-bar></tab-bar>
  </div>
</template>

<script>
import HeaderBar from "../components/HeaderBar.vue";
import Swipe from "../components/Swipe.vue";
import Grid from "../components/Grid.vue";
import Popup from "../components/Popup.vue";
import RecomSongList from "../components/RecomSongList.vue";
import RankingListByIndex from "../components/RankingListByIndex.vue";
import TabBar from "../components/TabBar.vue";

export default {
  data() {
    return {};
  },
  methods: {
    showPopup() {
      this.$refs.popup.show = true;
    },
    toSearch() {
      this.$router.push("/search");
    },
  },
  components: {
    HeaderBar,
    Swipe,
    Grid,
    Popup,
    RecomSongList,
    RankingListByIndex,
    TabBar,
  },
  mounted() {
    // this.$refs.popup.getLoginStatus();
  },
};
</script>

<style>
</style>