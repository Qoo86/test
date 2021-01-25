<template>
  <div>
    <!-- 头部组件 -->
    <header-bar>
      <template v-slot:left>
        <van-icon
          name="arrow-left"
          color="#fff"
          @click="onRouterBack"
        ></van-icon>
      </template>
      <template v-slot:title> 每 日 推 荐 </template>
    </header-bar>
    <div class="headerShow">
      <div class="date">{{ today }}</div>
      <div class="historyrecom">历史日推</div>
    </div>
    <div class="songList">
      <div
        class="songItem"
        v-for="(item, index) in dailySongs"
        :key="index"
        @click="toAudioPage(item.id)"
      >
        <div class="s_img">
          <van-image :src="item.al.picUrl" fit="cover">
            <template v-slot:loading>
              <van-loading type="spinner" />
            </template>
            <template v-slot:error>加载失败</template>
          </van-image>
        </div>
        <div class="text">
          <div class="s_title van-ellipsis">
            {{ item.name }}
            <span v-if="item.alia[0]" style="color: #767676"
              >({{ item.alia[0] }})</span
            >
            <span class="reason"> {{ reasonMsg(item.id) }} </span>
          </div>
          <div class="s_content van-ellipsis">
            <span v-for="(ar, index) in item.ar" :key="index">
              <span v-if="index === item.ar.length - 1"> {{ ar.name }} </span>
              <span v-else> {{ ar.name }} / </span>
            </span>
            - {{ item.al.name }}
          </div>
        </div>
        <div class="isMv my-icon" v-if="item.mv !== 0">&#xe621;</div>
        <div class="menu my-icon ml30" v-if="item.mv === 0">&#xe6f8;</div>
        <div class="menu my-icon" v-else>&#xe6f8;</div>
      </div>
    </div>
    <!-- 加载组件 -->
    <loading />
    <!-- 弹出层组件 -->
    <van-popup v-model="show" class="popup" closeable position="bottom">
      <!-- 音乐播放器组件 -->
      <audio-page
        :targetId="targetId"
        :songUrlList="songUrlList"
        :songdetails="songdetails"
      />
    </van-popup>
  </div>
</template>

<script>
import HeaderBar from "../components/HeaderBar.vue";
import AudioPage from "../components/Audio/audioPage";

import { _getDailyRecom } from "../network/index.js";
import {
  _getSongUrlsById,
  _getPlayListDetialBySongsId,
} from "../network/music.js";

export default {
  data() {
    return {
      show: false,
      // 日推歌曲列表
      dailySongs: [],
      // 推荐理由列表
      recommendReasons: [],
      // 当前歌单的id列表
      songidlist: [],

      // 当前歌单的歌曲url列表
      songUrlList: [],
      // 当前歌单的歌曲详情列表
      songdetails: [],

      // 当前点击的歌曲的id
      targetId: 0,
    };
  },
  methods: {
    onRouterBack() {
      this.$router.go(-1);
    },
    async getDailyRecomSong() {
      this.$store.commit("showLoading");
      // 获取每日推荐歌曲
      let { data: res } = await _getDailyRecom();
      if (res.code === 200) {
        // 保存歌曲列表
        this.dailySongs = res.data.dailySongs;
        // 保存推荐理由列表
        this.recommendReasons = res.data.recommendReasons;
        // 保存日推歌单的id列表
        for (let i = 0; i < res.data.dailySongs.length; i++) {
          this.songidlist.push(res.data.dailySongs[i].id);
        }
      }
      // 根据id列表获取歌曲详情列表
      let { data: songdetails } = await _getPlayListDetialBySongsId(
        this.songidlist.toString()
      );
      if (songdetails.code === 200) this.songdetails = songdetails.songs;
      // console.log(this.songdetails);
      // 根据id列表获取歌曲url列表
      let { data: urls } = await _getSongUrlsById(this.songidlist.toString());
      // 保存歌单url列表
      if (urls.code === 200) this.songUrlList = urls.data;
      // console.log(this.songUrlList);
      this.$store.commit("hiddenLoading");
    },
    // 将推荐理由和歌曲匹配起来
    reasonMsg(id) {
      for (let i = 0; i < this.recommendReasons.length; i++) {
        if (this.recommendReasons[i].songId === id)
          return this.recommendReasons[i].reason;
      }
    },
    //
    toAudioPage(id) {
      // 获取当前点级的歌曲id
      this.targetId = id;
      this.show = true;
    },
  },
  computed: {
    today: function () {
      let D = new Date();
      let m = D.getMonth() + 1;
      let d = D.getDate();
      m = m < 10 ? "0" + m : m;
      d = d < 10 ? "0" + d : d;
      return `${m}月${d}日`;
    },
  },
  components: {
    HeaderBar,
    AudioPage,
  },
  mounted() {
    this.getDailyRecomSong();
  },
};
</script>

<style lang="less" scoped>
.popup {
  height: 100%;
  width: 100%;
}
.reason {
  background-color: #f3ffc7;
  color: #ffc814;
  font-size: 10px;
}
.headerShow {
  height: 120px;
  background-image: radial-gradient(
    circle 263px at 100.2% 3%,
    rgba(12, 85, 141, 0.8) 31.1%,
    rgba(205, 181, 93, 0.81) 36.4%,
    rgba(244, 102, 90, 0.8) 50.9%,
    rgba(199, 206, 187, 0.8) 60.7%,
    rgba(249, 140, 69, 0.8) 72.5%,
    rgba(12, 73, 116, 0.8) 72.6%
  );
  box-sizing: border-box;
  padding: 36px 0 0 10px;
  color: white;
  .date {
    font-size: 20px;
    .day {
      font-size: 26px;
    }
  }
  .historyrecom {
    margin-top: 10px;
    color: black;
    background-color: rgba(255, 255, 255, 0.6);
    height: 20px;
    line-height: 20px;
    font-size: 11px;
    width: 64px;
    text-align: center;
    border-radius: 15px;
  }
}
.songList {
  display: flex;
  flex-direction: column;
  .songItem {
    height: 60px;
    width: 100%;
    background-color: #fff;
    overflow: hidden;
    display: flex;
    align-items: center;
    .s_img {
      width: 40px;
      height: 40px;
      margin-left: 12px;
      border-radius: 6px;
      overflow: hidden;
    }
    .text {
      width: 250px;
      margin-left: 10px;
      .s_title {
        font-size: 14px;
      }
      .s_content {
        margin-top: 5px;
        font-size: 11px;
        color: #767676;
      }
    }
    .isMv,
    .menu {
      color: #767676;
      font-size: 16px;
      line-height: 30px;
      text-align: center;
      height: 30px;
      width: 30px;
    }
  }
}
</style>