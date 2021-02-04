<template >
  <div id="RecomSongList">
    <div class="title">
      <div class="title_name">推荐歌单</div>
      <div class="more">更 多</div>
    </div>
    <div class="songListBox">
      <div
        v-for="item in recSonList"
        :key="item.id"
        class="songList"
        @click="toPlayListDetail(item.id)"
      >
        <div class="songListImg">
          <van-image :src="item.picUrl" />
        </div>
        <div class="songListName van-multi-ellipsis--l2">{{ item.name }}</div>
        <div class="songListNameplayCount">
          ▶ {{ item.playCount | formatNumber }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { _getRecomPlayList } from "../network/index.js";
export default {
  data() {
    return {
      recSonList: {},
    };
  },
  methods: {
    // 跳转歌单详情页
    toPlayListDetail(id) {
      this.$router.push({
        path: "/playlistdetail",
        query: { id },
      });
    },
    // 获取推荐歌单列表
    async getRecomPlayList() {
      let { data } = await _getRecomPlayList(8);
      if (data.code === 200) {
        for (let i = 0; i < data.result.length; i++) {
          this.recSonList[data.result[i].id] = data.result[i];
        }
        this.$forceUpdate(); // 解决F5刷新后v-for不渲染的问题，bug原因不明
      }
    },
  },
  mounted() {
    this.getRecomPlayList();
  },
};
</script>

<style lang="less" scoped>
#RecomSongList {
  .title {
    background-color: #fff;
    display: flex;
    justify-content: space-between;
    padding: 20px 6px 0 6px;
    color: #3e3e3e;
    .title_name {
      font-size: 15px;
      font-weight: 600;
    }
    .more {
      font-size: 10px;
      text-align: center;
      height: 16px;
      width: 50px;
      line-height: 16px;
      border: 1px solid #717171;
      border-radius: 10px;
    }
  }
  .songListBox {
    width: 100%;
    height: 260px;
    background-color: #fff;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    .songList {
      position: relative;
      margin: 10px 0 0;
      width: 80px;
      height: 120px;
      .songListImg {
        width: 80px;
        height: 80px;
        border-radius: 10px;
        overflow: hidden;
        background-color: aquamarine;
        opacity: 0.8;
        .van-image__img {
          width: 80px;
          height: 80px;
        }
      }
      .songListName {
        padding-top: 6px;
        width: 80px;
        font-size: 11px;
        text-align: center;
      }
      .songListNameplayCount {
        position: absolute;
        color: #fff;
        font-size: 10px;
        top: 4px;
        right: 4px;
        height: 14px;
        line-height: 14px;
        background-color: rgba(0, 0, 0, 0.5);
        border-radius: 20px;
        padding: 0 6px;
      }
    }
  }
}
</style>