<template>
  <van-swipe :autoplay="3000" :height="150">
    <van-swipe-item v-for="(image, index) in images" :key="index">
      <img v-lazy="image" width="100%" />
    </van-swipe-item>
  </van-swipe>
</template>

<script>
import { _getSwipe } from "../network/index.js";
export default {
  data() {
    return {
      images: [],
    };
  },
  methods: {
    async getSwipe() {
      let { data: res } = await _getSwipe();
      if (res.code === 200) {
        for (let i = 0; i < res.banners.length; i++) {
          this.images.push(res.banners[i].pic);
        }
      }
    },
  },
  mounted() {
    this.getSwipe();
  },
};
</script>

<style>
</style>