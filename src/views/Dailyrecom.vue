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
      <div class="date">
        <span class="day">{{ day }}</span
        >/{{ mouth }}
      </div>
      <div class="historyrecom">历史日推</div>
    </div>
    <div class="songList">
      <div class="songItem" v-for="item in dailySongs" :key="item.index">
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
            <span class="reason"> {{ reasonMsg(item.id) }} </span>
            <span style="color: #767676">{{ item.alia[0] }}</span>
          </div>
          <div class="s_content van-ellipsis">
            {{ item.ar[0].name }} - {{ item.al.name }}
          </div>
        </div>
        <div class="isMv my-icon" v-if="item.mv !== 0">&#xe6cf;</div>
        <div
          class="menu my-icon"
          v-if="item.mv === 0"
          style="margin-left: 30px"
        >
          &#xe6f8;
        </div>
        <div class="menu my-icon" v-else>&#xe6f8;</div>
      </div>
    </div>
  </div>
</template>

<script>
import HeaderBar from "../components/HeaderBar.vue";

export default {
  data() {
    return {
      mouth: new Date().getMonth() + 1,
      day: new Date().getUTCDate(),
      dailySongs: [],
      recommendReasons: [],
    };
  },
  methods: {
    onRouterBack() {
      this.$router.go(-1);
    },
    // 获取每日推荐歌曲
    async getDailyRecomSong() {
      let { data } = await this.$http({
        url: `/recommend/songs`,
        withCredentials: true,
      });
      // console.log(data);
      if (data.code !== 200) return;
      this.dailySongs = data.data.dailySongs;
      this.recommendReasons = data.data.recommendReasons;
      // console.log(data.data);
    },
    // 推荐理由
    reasonMsg(id) {
      for (let i = 0; i < this.recommendReasons.length; i++) {
        if (this.recommendReasons[i].songId === id)
          return this.recommendReasons[i].reason;
      }
    },
  },
  components: {
    HeaderBar,
  },
  mounted() {
    this.getDailyRecomSong();
  },
};
</script>

<style lang="less" scoped>
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