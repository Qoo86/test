<template>
  <div>
    <van-tabs animated swipeable @click="test">
      <van-tab title="综 合" name="1018">
        <composited :keyword="keyword"></composited>
      </van-tab>
      <van-tab
        v-for="item in titleObj"
        :title="item.name"
        :key="item.id"
        :name="item.type"
      >
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import Composited from "../components/SearcConentComp/Composited.vue";
export default {
  data() {
    return {
      keyword: this.$route.query.val,
      titleObj: [
        { id: "0", name: "单 曲", type: "1", content: "" },
        { id: "1", name: "专 辑", type: "10", content: "" },
        { id: "2", name: "歌 手", type: "100", content: "" },
        { id: "3", name: "歌 单", type: "1000", content: "" },
        { id: "4", name: "用 户", type: "1002", content: "" },
        { id: "5", name: "视 频", type: "1014", content: "" },
      ],
      comprehensiveData: {},
    };
  },
  methods: {
    test(name, title) {
      console.log(name, title);
    },
  },
  components: {
    Composited,
  },
  mounted() {
    this.$emit("backKeyw", this.keyword);
  },
};
</script>

<style lang="less" scoped>
</style>