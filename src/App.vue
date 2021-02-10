<template>
  <div id="app">
    <router-view class="pb60" />
    <play-music
      v-if="$route.path !== '/personalfm'"
      :class="[
        $route.path === '/index' ||
        $route.path === '/search/hotSearch' ||
        $route.path === '/user'
          ? 'b50'
          : 'b0',
        ,
        'pmFixed',
      ]"
    />
  </div>
</template>

<script>
import PlayMusic from "./components/PlayMusic/PlayMusic.vue";
export default {
  components: {
    PlayMusic,
  },
};
</script>

<style lang="less">
#app {
  width: 375px;
  height: 667px;
  background-color: #f5f5f5;
}
</style>
