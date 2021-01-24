<template>
  <div class="contentbox">
    <!-- 热搜榜 -->
    <div class="hotbox">
      <div class="title">热搜榜</div>
      <div class="hotdetial">
        <div
          class="hotedetialitem"
          v-for="(item, index) in hotDetail"
          :key="item.id"
          @click="toSearch(item.searchWord)"
        >
          <span class="itemlever">{{ index + 1 }}</span>
          <span class="itemname">{{ item.searchWord }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { _getHotDetail } from "../network/search";

export default {
  data() {
    return {
      hotDetail: [],
    };
  },
  methods: {
    // 搜索
    toSearch(val) {
      this.$router.push({
        path: "/search/searchConent",
        query: { val },
      });
    },
    // 获取热搜榜
    async getHotdetail() {
      let { data } = await _getHotDetail();
      if (data.code === 200) this.hotDetail = data.data;
    },
  },
  mounted() {
    this.getHotdetail();
  },
};
</script>

<style lang="less" scoped>
.contentbox {
  margin: 16px 16px 0 16px;
  position: relative;
  .hotbox {
    .title {
      font-size: 14px;
    }
    .hotdetial {
      margin-top: 10px;
      display: grid;
      grid-template-columns: 1fr 1fr;
      .hotedetialitem {
        height: 30px;
        font-size: 14px;
        line-height: 24px;
        cursor: pointer;
        .itemlever {
          color: #ccc;
          padding-right: 14px;
        }
        .itemname {
          color: #757575;
        }
        &:nth-of-type(-n + 3) {
          .itemlever {
            color: #ec4141;
          }
          .itemname {
            color: #000;
          }
        }
      }
    }
  }
}
</style>