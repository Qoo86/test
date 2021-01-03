<template>
  <van-swipe :autoplay="3000" :height="150">
    <van-swipe-item v-for="(image, index) in images" :key="index">
      <img v-lazy="image" width="100%" />
    </van-swipe-item>
  </van-swipe>
</template>

<script>
export default {
  data() {
    return {
      images: [],
    };
  },
  methods: {
    async getSwipe() {
      let result = await this.$http({
        url: "/banner?type=2",
        withCredentials: true,
      });
      let banners = result.data.banners;
      for (let i = 0; i < banners.length; i++) {
        this.images.push(banners[i].pic);
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