<template>
  <div id="fm">
    <!-- 头部导航栏 -->
    <van-nav-bar :border="false" class="navbar" @click-left="$router.go(-1)">
      <template #left>
        <van-icon name="arrow-down" />
      </template>
      <template #title>
        <span class="title">私人FM</span>
      </template>
    </van-nav-bar>
    <div class="fm_body">
      <div class="volumeBox">
        <van-icon name="volume-o" class="icon" />
        <van-slider v-model="volume" @input="onVolumeInput" />
      </div>
      <div class="songInfo">
        <div class="blurPic">
          <van-image
            class="pic"
            v-if="activeSongObj.album"
            :src="activeSongObj.album.picUrl"
            fit="cover"
          />
        </div>
        <div class="songName van-ellipsis">{{ activeSongObj.name }}</div>
        <div class="by van-ellipsis">
          <span v-for="(ar, index) in activeSongObj.artists" :key="index">
            <span v-if="index === activeSongObj.artists.length - 1">
              {{ ar.name }}
            </span>
            <span v-else> {{ ar.name }} / </span>
          </span>
        </div>
      </div>
      <div class="menu">
        <!-- HTML自带组件 -->
        <audio ref="audio" :src="activeUrlObj.url" autoplay />
        <div class="slider">
          <div class="now">{{ currentTime | formatCurrentTime }}</div>
          <van-slider class="vanSlider" v-model="percentage" @input="onInput" />
          <div class="duration">
            {{ activeSongObj.duration | formatDuration }}
          </div>
        </div>
        <div class="btn">
          <div class="close" @click="trash(activeSongObj.id)">
            <van-icon name="close" />
          </div>
          <div class="likeIcon">
            <van-icon name="like-o" />
          </div>
          <div class="playIcon" v-if="isPause" @click="fmPlay">
            <van-icon name="play-circle-o" />
          </div>
          <div class="pauseIcon" v-else @click="fmPause">
            <van-icon name="pause-circle-o" />
          </div>
          <div class="my-icon nextIcon" @click="fmNext">
            <van-icon class-prefix="my-icon" name="next" />
          </div>
          <div class="comIcon" @click="toCommentComp">
            <van-icon name="comment-o" />
          </div>
        </div>
      </div>
    </div>
    <!-- 加载组件 -->
    <loading />
    <!-- 评论组件 -->
    <van-popup
      v-model="$store.state.isPopup"
      class="commentComp"
      position="bottom"
    >
      <comment-detial
        :parentId="activeSongObj.id"
        :toCommentinfos="toCommentInfos"
        :type="0"
        :key="activeSongObj.id"
      />
    </van-popup>
  </div>
</template>

<script>
import CommentDetial from "../components/Detial/CommentDetial.vue";
import { _getPersonalFm } from "../network/Fm";
import {
  _getSongUrlsById,
  _like,
  _getPlayListDetialBySongsId,
  _trash,
} from "../network/music";
export default {
  data() {
    return {
      // 本次请求FM接口得到的数据
      fm: [],
      // 当前正在播放的歌曲索引
      activeNum: 0,
      // 当前正在播放的歌曲对象
      activeSongObj: {},
      // 当前正在播放的歌曲url对象
      activeUrlObj: {},
      // 当前已播放的时长
      currentTime: 0,
      // 当前播放的时间占总时长的百分比
      percentage: 0,
      // 音量
      volume: 0,
      // 是否正在暂停
      isPause: true,
      // 发送给评论组件的部分信息
      toCommentInfos: {},
    };
  },
  components: {
    CommentDetial,
  },
  methods: {
    // 获取私人FM数据
    async getFm() {
      this.$store.commit("showLoading");

      let { data: res } = await _getPersonalFm();
      if (res.code === 200) this.fm = res.data;
      // 获取到数据后将此次请求到的数据中的第一项赋值给activeSongObj
      this.activeSongObj = this.fm[this.activeNum];
      console.log(this.activeSongObj);
      // 然后获取歌曲的url
      this.getSongUrl(this.activeSongObj.id);

      this.$store.commit("hiddenLoading");
    },
    // 根据歌曲id获取歌曲url
    async getSongUrl(id) {
      let { data: res } = await _getSongUrlsById(id);
      if (res.code === 200) this.activeUrlObj = res.data[0];
    },
    // 暂停
    fmPause() {
      this.isPause = false;
      this.$refs.audio.pause();
    },
    // 播放
    fmPlay() {
      this.isPause = true;
      this.$refs.audio.play();
    },
    // 下一首
    fmNext() {
      // 点击下一首时，索引++
      this.activeNum++;
      if (this.fm[this.activeNum]) {
        // 如果索引++后还能取到值，就将下一项赋值给activeSongObj，然后再次获取歌曲url
        this.activeSongObj = this.fm[this.activeNum];
        this.getSongUrl(this.activeSongObj.id);
      } else {
        // 如果获取不到值，说明已经是此次请求的最后一首 重置索引 获取新一轮的数据
        this.activeNum = 0;
        this.getFm();
      }
    },
    // 垃圾桶
    async trash(id) {
      let { data } = await _trash(id);
      if (data.code === 200) {
        this.$msg.success("移除至垃圾桶成功，我们会努力向您推荐您更喜欢的内容");
        this.fmNext();
      } else {
        this.$msg.fail(data.msg);
      }
    },
    // 喜欢
    async like(id, like) {
      let { data } = await _like(id, like);
      console.log(data);
    },
    /*  
      手动调整滑块位置时把currentTime定位到该位置
      input 	进度变化时实时触发
      change 	进度变化且结束拖动后触发
      Q：为什么使用input 而不使用 change
      A：使用change有以下问题
        1.当拖动进度条时，不会触发change时间，
          由于percentage的值是通过监听currentTime计算而出的，所以会造成滑块来回闪动的情况
        2.无法在不松开进度条的情况下 听到自己在什么位置
      所以选择使用input
    */
    onInput(v) {
      this.$refs.audio.currentTime = (v / 100) * this.$refs.audio.duration;
    },
    // 音量控制
    onVolumeInput(v) {
      this.$refs.audio.volume = v / 100;
    },
    // 展示评论详情组件
    toCommentComp() {
      this.toCommentInfos = {
        name: this.activeSongObj.name,
        coverImgUrl: this.activeSongObj.album.picUrl,
        artists: this.activeSongObj.artists,
      };
      this.$store.commit("showPopup");
    },
  },
  mounted() {
    this.getFm();
    // 当媒体的第一帧数据获取到时，获取音量
    this.$refs.audio.onloadeddata = (event) => {
      this.volume = event.target.volume * 100;
    };
    // 当audio中的currentTime发生变化时调用
    this.$refs.audio.ontimeupdate = (event) => {
      let e_t = event.target;
      this.isPause = e_t.paused;
      this.currentTime = e_t.currentTime;
      this.percentage = (e_t.currentTime / e_t.duration) * 100;
    };
    // 当播放到媒体的结束位置时 切换下一首
    this.$refs.audio.onended = () => this.fmNext();
  },
};
</script>

<style lang="less" scoped>
#fm {
  width: 100%;
  height: 100%;
  background-image: radial-gradient(
    circle 919px at 1.7% 6.1%,
    rgba(41, 58, 76, 1) 0%,
    rgba(40, 171, 226, 1) 100.2%
  );
  .navbar {
    background-color: transparent;
    z-index: 999;
    .title {
      color: #fff;
      font-size: 16px;
    }
  }
  .fm_body {
    height: 605px;
    position: relative;
    .volumeBox {
      height: 16px;
      display: flex;
      width: 320px;
      margin: 8px auto 0;
      align-items: center;
      .icon {
        color: #fff;
        margin-right: 20px;
        font-size: 12px;
      }
    }
    .songInfo {
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 10px 0;
      .blurPic {
        width: 260px;
        height: 260px;
        border-radius: 10px;
        overflow: hidden;
        margin-top: 60px;
        .pic {
          width: inherit;
          height: inherit;
        }
      }
      .songName {
        text-align: center;
        width: 300px;
        margin-top: 10px;
        font-size: 16px;
        height: 36px;
        line-height: 40px;
        color: #fff;
      }
      .by {
        text-align: center;
        width: 300px;
        margin-top: -4px;
        height: 20px;
        line-height: 20px;
        font-size: 12px;
        color: #dcdcdc;
      }
    }
    .menu {
      margin-top: 40px;
      .slider {
        height: 60px;
        display: grid;
        grid-template-columns: 13% 74% 13%;
        align-items: center;
        .now,
        .duration {
          color: #e1e1e1;
          text-align: center;
          font-size: 10px;
        }
      }
    }
    .btn {
      height: 70px;
      padding: 0 30px;
      display: grid;
      align-items: center;
      color: #f0f0f0;
      grid-template-columns: 18% 18% 28% 18% 18%;
      > div {
        height: 100%;
        text-align: center;
        line-height: 70px;
      }
      .close,
      .likeIcon,
      .comIcon {
        font-size: 24px;
      }
      .nextIcon {
        font-size: 18px;
      }
      .playIcon,
      .pauseIcon {
        font-size: 48px;
      }
    }
  }
  .commentComp {
    width: 100%;
    height: 100%;
  }
}
</style>