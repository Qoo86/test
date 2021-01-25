<template>
  <div id="playlistgroup">
    <!-- 头部导航栏 -->
    <van-nav-bar
      :border="false"
      fixed
      @click-left="$router.go(-1)"
      class="navbar"
    >
      <template #left>
        <van-icon name="arrow-left" class="icon" />
        <div class="title">歌单广场</div>
      </template>
      <template #title> </template>
      <template #right> </template>
    </van-nav-bar>
    <!-- 歌单主体 -->
    <div class="playlistBody">
      <!-- 标题部份 -->
      <div class="title">
        <div class="txt">全部精品</div>
        <div class="screen" @click="show = !show">
          <span class="my-icon">&#xe625;</span>
          <span>筛选</span>
        </div>
      </div>
      <!-- 歌单列表 -->
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="getPlaylistHighquality(cat)"
      >
        <div class="playlists">
          <div class="playlistItem" v-for="pl in playlists" :key="pl.id">
            <div class="coverImg">
              <van-image class="img" :src="pl.coverImgUrl" fit="cover" />
              <div class="playcount">
                <span class="my-icon">&#xe6b3;</span>
                <span>{{ pl.playCount | formatNumber }}</span>
              </div>
            </div>
            <div class="name van-multi-ellipsis--l2">
              {{ pl.name }}
            </div>
          </div>
        </div>
      </van-list>
    </div>
    <!-- 弹出层 -->
    <van-popup
      v-model="show"
      position="bottom"
      closeable
      close-icon="close"
      class="popup"
    >
      <div class="title">所有精品歌单</div>
      <div class="all">
        <div class="allBtn class1">全部精品</div>
      </div>
      <div class="Tags">
        <div v-for="tag in Tags" :key="tag.id" class="tag class1 van-ellipsis">
          {{ tag.name }}
        </div>
      </div>
    </van-popup>
  </div>
</template>

<script>
import {
  _getPlaylistHighqualityTags,
  _getTopPlaylistHighquality,
} from "../network/playlist";
export default {
  data() {
    return {
      active: 0,
      show: false,
      // 热门歌单分类列表
      Tags: [],
      // 歌单标题标签
      cat: "全部",
      // 分页用数据，保存上一次请求的数据中的最后一个歌单的pushtime
      before: "",
      loading: false,
      finished: false,
      // 歌单列表
      playlists: [],
    };
  },
  methods: {
    init() {
      this.getPlaylistHighqualityTags();
    },
    // 获取精品歌单的全部标签
    async getPlaylistHighqualityTags() {
      let { data } = await _getPlaylistHighqualityTags();
      if (data.code === 200) {
        this.Tags = data.tags;
      }
    },
    // 获取精品歌单liebiao
    async getPlaylistHighquality(cat) {
      let { data } = await _getTopPlaylistHighquality(cat, this.before);
      if (data.code === 200) {
        this.before = data.lasttime;
        for (let i = 0; i < data.playlists.length; i++) {
          this.playlists.push(data.playlists[i]);
        }
        this.loading = false;
        if (data.playlists.length < 60) this.finished = true;
      }
    },
  },
  mounted() {
    this.init();
  },
};
</script>

<style lang="less" scoped>
#playlistgroup {
  background-color: #fff;
  .navbar {
    background-color: #fff;
    .title,
    .icon {
      color: #000;
    }
    .title {
      margin-left: 10px;
      font-size: 15px;
    }
  }
  .playlistBody {
    .title {
      position: fixed;
      width: 100%;
      height: 40px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-size: 12px;
      z-index: 2;
      box-sizing: content-box;
      background-color: #fff;
      top: 46px;
      .txt {
        margin-left: 20px;
      }
      .screen {
        margin-right: 20px;
        .my-icon {
          margin-right: 6px;
        }
      }
    }
    .playlists {
      margin-top: 86px;
      display: grid;
      grid-template-columns: repeat(3, 31%);
      justify-content: center;
      .playlistItem {
        padding: 10px;
        .coverImg {
          position: relative;
          .img {
            border-radius: 8px;
            overflow: hidden;
          }
          .playcount {
            position: absolute;
            color: #fff;
            height: 16px;
            font-size: 10px;
            line-height: 16px;
            padding: 0 6px;
            background-color: rgba(0, 0, 0, 0.3);
            top: 4px;
            right: 4px;
            border-radius: 10px;
            .my-icon {
              margin-right: 3px;
            }
          }
        }
        .name {
          font-size: 12px;
        }
      }
    }
  }
  .popup {
    height: 460px;
    .class1 {
      color: #000;
      background-color: #f0f0f0;
    }
    .class2 {
      color: #fff;
      background-color: #0078d7;
    }
    .title {
      font-size: 15px;
      height: 50px;
      line-height: 50px;
      text-align: center;
      letter-spacing: 2px;
    }
    .all {
      .allBtn {
        height: 36px;
        font-size: 13px;
        letter-spacing: 2px;
        text-align: center;
        line-height: 36px;
        border-radius: 30px;
        width: 90%;
        margin-left: 50%;
        transform: translateX(-50%);
      }
    }
    .Tags {
      height: 320px;
      overflow: scroll;
      margin-top: 20px;
      display: grid;
      grid-template-columns: repeat(4, 25%);
      justify-items: center;
      .tag {
        margin-top: 10px;
        height: 30px;
        width: 80%;
        line-height: 30px;
        text-align: center;
        font-size: 12px;
        border-radius: 15px;
        padding: 0 10px;
        box-sizing: border-box;
        letter-spacing: 1px;
      }
    }
  }
}
</style>
