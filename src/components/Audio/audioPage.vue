<template>
  <div id="audio">
    {{ targetId }}
  </div>
</template>

<script>
import { _getSongUrlsById, _getSongWordById } from "../../network/music";
export default {
  props: {
    targetId: Number,
    songUrlList: Array,
    songdetails: Array,
  },
  methods: {},
};
</script>

<style lang="less" scoped>
#audio {
  width: 100%;
  height: 100%;
  background-color: rgb(255, 0, 0);
}
</style>