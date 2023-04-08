<template>
  <div style="padding: 10px;overflow:hidden;transform: translateY(0);">
    <van-swipe :autoplay="3000" class="swiper">
      <van-swipe-item v-for="(image, index) in images" :key="index">
        <img v-lazy="image" class="img" />
      </van-swipe-item>
    </van-swipe>
  </div>
</template>

<script>
import { _getSwipe } from "../../network/index.js";
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

<style lang="less" scoped>
.swiper {
  height: 150px;
  .img {
    width: 355px;
    height: 146px;
    display: block;
    -webkit-border-radius:  15px ;    /* Webkit browsers */

  }
}
</style>
