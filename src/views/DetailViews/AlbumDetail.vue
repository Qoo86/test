<template>
  <div id="albumDetail">
    <!-- 头部导航栏 -->
    <van-nav-bar :border="false" fixed class="navbar" @click-left="routerBack">
      <template #left>
        <van-icon name="arrow-left" size="1.4em" />
        <span class="title">专辑</span>
      </template>
      <template #right>
        <div class="menu">
          <div class="my-icon">&#xe6f8;</div>
        </div>
      </template>
    </van-nav-bar>
    <!-- 头部区域内容 -->
    <div class="headerBox">
      <!-- 上半区域 信息 -->
      <div class="box_top">
        <div class="headerbox_Pic">
          <div class="bg"></div>
          <van-image :src="album.picUrl" />
        </div>
        <div class="headerbox_txt">
          <div class="album_name van-ellipsis">{{ album.name }}</div>
          <div class="album_singer" @click="singersShow = true">
            <div class="name van-ellipsis">
              歌手：<span v-for="(ar, index) in album.artists" :key="ar.id">
                <span v-if="index === album.artists.length - 1">{{
                  ar.name
                }}</span>
                <span v-else> {{ ar.name }} / </span>
              </span>
            </div>
            <div class="icon"><van-icon name="arrow" /></div>
          </div>
          <div class="album_time">
            发行时间：{{ album.publishTime | formatDate(2) }}
          </div>
          <div class="album_dep" @click="overlayshow = true">
            <div class="van-ellipsis dep" v-if="album.description">
              {{ album.description }}
            </div>
            <div class="van-ellipsis dep">暂无</div>
            <div class="icon"><van-icon name="arrow" /></div>
          </div>
        </div>
      </div>
      <!-- 下半区域 功能菜单 -->
      <div class="box_bottom">
        <div
          class="item_div collection"
          :style="isSub ? 'color:blue' : ''"
          @click="subAlbum(id, isSub ? 0 : 1)"
        >
          <div class="my-icon">&#xe617;</div>
          <div class="num" v-if="subCount == 0">收藏</div>
          <div class="num" v-else>{{ subCount | formatNumber }}</div>
        </div>
        <div class="item_div comment" @click="toCommentDetail">
          <div class="my-icon">&#xe606;</div>
          <div class="num" v-if="commentCount == 0">评论</div>
          <div class="num" v-else>{{ commentCount | formatNumber }}</div>
        </div>
        <div class="item_div share">
          <div class="my-icon">&#xe6dc;</div>
          <div class="num" v-if="shareCount == 0">分享</div>
          <div class="num" v-else>{{ shareCount | formatNumber }}</div>
        </div>
      </div>
    </div>
    <!-- 歌单列表区域 -->
    <div class="songList">
      <div class="song_item">
        <div class="sl_title">
          <div class="t_text">
            <span class="my-icon">&#xe690;</span>播放全部<span
              style="font-size: 12px; color: #939393; margin-left: 4px"
              >( {{ songs.length }}首 )</span
            >
          </div>
          <div class="t_othericon">
            <div class="my-icon">&#xe6f3;</div>
            <div class="my-icon">&#xe62f;</div>
          </div>
        </div>
        <div class="sl_content">
          <div class="sl_item" v-for="(song, index) in songs" :key="song.id">
            <div class="item_index">{{ index + 1 }}</div>
            <div class="item_txt">
              <div class="t_songname van-ellipsis">
                {{ song.name }}
                <span class="othername" v-if="song.tns"
                  >({{ song.tns[0] }})</span
                >
              </div>
              <div class="t_songby van-ellipsis">
                <span v-for="(ar, index) in song.ar" :key="ar.id">
                  <span v-if="index === song.ar.length - 1">
                    {{ ar.name }}
                  </span>
                  <span v-else>{{ ar.name }} / </span>
                </span>
              </div>
            </div>
            <div class="item_icon" v-if="song.mv">
              <div class="mv my-icon">&#xe621;</div>
              <div class="more my-icon">&#xe6f8;</div>
            </div>
            <div class="item_icon" v-else>
              <div class="more my-icon" style="margin-left: 26px">&#xe6f8;</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <br />
    <!-- 歌手列表层 -->
    <van-popup v-model="singersShow" class="singers">
      <div class="singer_item" v-for="artist in artists" :key="artist.id">
        <div class="avatar">
          <van-image :src="artist.picUrl" class="img" fit="cover" />
        </div>
        <div class="name">{{ artist.name }}</div>
      </div>
    </van-popup>
    <!-- 歌单简介详情遮罩层 -->
    <van-overlay :show="overlayshow" @click="overlayshow = false">
      <div class="wrapper">
        <div class="block">
          <div class="pic">
            <van-image :src="album.picUrl" />
          </div>
          <div class="name">{{ album.name }}</div>
          <div class="type" v-if="album.subType">
            专辑类别：{{ album.subType }}
          </div>
          <div class="by" v-if="album.company">
            发行公司：{{ album.company }}
          </div>
          <div class="description">
            {{ album.description }}
          </div>
        </div>
      </div>
    </van-overlay>
    <!-- 评论详情组件 -->
    <van-popup
      v-model="$store.state.isPopup"
      class="commentComp"
      position="bottom"
    >
      <comment-detial
        :parentId="id"
        :toCommentinfos="toCommentinfos"
        :type="3"
      />
    </van-popup>
  </div>
</template>

<script>
import {
  _albumSub,
  _getAlbum,
  _getAlbumDetailDynamic,
} from "../../network/album";
import CommentDetial from "../../components/Detial/CommentDetial";
export default {
  data() {
    return {
      overlayshow: false,
      singersShow: false,
      id: this.$route.query.id,
      // 歌曲列表
      songs: [],
      // 歌手列表
      artists: [],
      // 专辑信息
      album: {},
      // 收藏数
      subCount: 0,
      // 评论数
      commentCount: 0,
      // 分享数
      shareCount: 0,
      // 是否收藏
      isSub: false,
      // 在评论页显示的头部信息
      toCommentinfos: {},
    };
  },
  components: {
    CommentDetial,
  },
  methods: {
    //   初始化页面
    init(id) {
      this.getAlbum(id);
      this.getAlbumDynamic(id);
    },
    //  返回
    routerBack() {
      this.$router.go(-1);
    },
    // 评论详情
    toCommentDetail() {
      this.$store.commit("showPopup");
    },
    // 获取专辑内容
    async getAlbum(id) {
      let { data } = await _getAlbum(id);
      if (data.code === 200) {
        // 保存专辑信息
        this.album = data.album;
        // 保存歌曲列表
        this.songs = data.songs;
        // 保存歌手列表
        this.artists = data.album.artists;
        // 保存发送给评论详情组件的部分信息
        this.toCommentinfos = {
          name: data.album.name,
          coverImgUrl: data.album.picUrl,
          artists: data.album.artists,
        };
      } else {
        console.log(data);
      }
    },
    // 获取专辑动态内容
    async getAlbumDynamic(id) {
      let { data } = await _getAlbumDetailDynamic(id);
      if (data.code === 200) {
        this.commentCount = data.commentCount;
        this.subCount = data.subCount;
        this.shareCount = data.shareCount;
        this.isSub = data.isSub;
      }
    },
    // 收藏 / 取消收藏
    async subAlbum(id, t) {
      let { data } = await _albumSub(id, t);
      if (data.code === 200) {
        if (t === 1) {
          this.$msg.success("收藏成功，请前往我的-收藏和赞中查看");
        } else {
          this.$msg.success("取消收藏成功");
        }
        this.getAlbumDynamic(id);
      }
    },
  },
  mounted() {
    this.init(this.id);
  },
};
</script>

<style lang="less" scoped>
#albumDetail {
  .navbar {
    background-image: linear-gradient(
      111.3deg,
      rgba(74, 105, 187, 1) 9.6%,
      rgba(205, 77, 204, 1) 93.6%
    );
    .title {
      padding-left: 6px;
      font-size: 16px;
      color: #fff;
    }
    .menu {
      color: #fff;
      font-size: 18px;
    }
  }
  .headerBox {
    margin-top: 46px;
    position: relative;
    background-image: linear-gradient(
      111.3deg,
      rgba(74, 105, 187, 1) 9.6%,
      rgba(205, 77, 204, 1) 93.6%
    );
    .box_top {
      height: 180px;
      box-sizing: border-box;
      display: flex;
      align-items: center;
      justify-content: space-around;
      padding: 20px 10px;
      position: relative;
      .headerbox_Pic {
        width: 110px;
        height: 110px;
        border-radius: 15px;
        overflow: hidden;
        .bg {
          position: absolute;
          width: 110px;
          height: 110px;
          border-radius: 50%;
          background-color: #000;
          top: 20px;
        }
      }
      .headerbox_txt {
        width: 210px;
        .album_name {
          font-size: 16px;
          color: #fff;
        }
        .album_singer {
          font-size: 12px;
          color: rgba(255, 255, 255, 0.6);
          margin: 14px 0;
          display: flex;
          align-items: center;
          width: 100%;
          height: 20px;
          .name {
            width: 200px;
          }
          .icon {
            margin-top: 4px;
            font-size: 14px;
          }
        }
        .album_time,
        .album_dep {
          font-size: 10px;
          color: rgba(255, 255, 255, 0.4);
        }
        .album_dep {
          margin-top: 6px;
          display: flex;
          height: 20px;
          align-items: center;
          width: 100%;
          .dep {
            width: 140px;
          }
          .icon {
            font-size: 14px;
            margin-top: 4px;
            margin-left: 60px;
          }
        }
      }
    }
    .box_bottom {
      background-color: #fff;
      height: 40px;
      width: 70%;
      border-radius: 20px;
      box-shadow: 2px 2px 6px #ccc;
      position: absolute;
      top: 88%;
      left: 50%;
      transform: translate(-50%, -0);
      display: grid;
      grid-template-columns: repeat(3, 33.33%);
      align-items: center;
      .item_div {
        height: 24px;
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        &:nth-child(-n + 2) {
          border-right: 2px solid #ccc;
        }
        .my-icon {
          font-size: 18px;
          margin-right: 6px;
        }
        .num {
          font-size: 12px;
        }
      }
    }
  }
  .songList {
    padding-top: 40px;
    background-color: #fff;
    .sl_title {
      display: flex;
      align-items: center;
      justify-content: space-between;
      height: 40px;
      .t_text {
        margin-left: 10px;
        font-size: 14px;
        height: 20px;
        line-height: 20px;
        > .my-icon {
          font-size: 16px;
          color: #4a69bb;
          margin-right: 4px;
        }
      }
      .t_othericon {
        margin-right: 10px;
        display: flex;
        font-size: 16px;
        height: 20px;
        line-height: 20px;
        > .my-icon {
          margin: 0 6px;
        }
      }
    }
    .sl_content {
      .sl_item {
        display: flex;
        height: 50px;
        align-items: center;
        .item_index {
          text-align: center;
          width: 50px;
          font-size: 14px;
          color: #939393;
        }
        .item_txt {
          width: 270px;
          .t_songname {
            font-size: 14px;
            .othername {
              color: #939393;
            }
          }
          .t_songby {
            font-size: 12px;
            margin-top: 3px;
            color: #939393;
          }
        }
        .item_icon {
          display: flex;
          justify-content: space-between;
          font-size: 14px;
          color: #939393;
          width: 40px;
          box-sizing: border-box;
        }
      }
    }
  }
  .singers {
    width: 260px;
    height: 90%;
    .singer_item {
      width: 100%;
      height: 60px;
      display: flex;
      align-items: center;
      .avatar {
        width: 46px;
        height: 46px;
        .img {
          width: inherit;
          height: inherit;
        }
        margin-left: 10px;
        overflow: hidden;
      }
      .name {
        font-size: 14px;
        margin-left: 10px;
      }
    }
  }
  .wrapper {
    width: 100%;
    height: 100%;
    background-image: radial-gradient(
      circle 757px at 14.6% 44.8%,
      rgba(60, 77, 115, 1) 27.7%,
      rgba(0, 194, 209, 1) 95.9%
    );
    display: flex;
    position: relative;
    .block {
      margin-top: 20%;
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 0 20px;
      .pic {
        width: 160px;
        height: 160px;
        border-radius: 20px;
        overflow: hidden;
      }
      .name {
        color: #fff;
        font-size: 16px;
        margin-top: 20px;
      }
      .type,
      .by,
      .description {
        width: 100%;
        text-align: left;
        font-size: 12.6px;
        color: rgba(255, 255, 255, 0.7);
      }
      .description {
        margin-top: 10px;
        height: 260px;
        overflow: scroll;
        white-space: pre-line;
      }
      .type {
        margin: 40px 0 10px;
      }
      .by {
        margin-bottom: 4px;
      }
    }
  }
  .commentComp {
    width: 100%;
    height: 100%;
  }
}
</style>