<template>
  <div id="playlistdetial">
    <!-- 头部导航栏 -->
    <van-nav-bar
      :border="false"
      fixed
      class="navbareset"
      @click-left="$router.go(-1)"
    >
      <template #left>
        <van-icon name="arrow-left" size="1.4em" />
      </template>
      <template #title>
        <span> 歌单 - {{ playlistmsg.name }}</span>
      </template>
      <template #right>
        <div class="menu">
          <div class="my-icon">&#xe604;</div>
          <div class="my-icon">&#xe6f8;</div>
        </div>
      </template>
    </van-nav-bar>
    <!-- 头部区域内容 -->
    <div class="headerBox">
      <!-- 上半区域 信息 -->
      <div class="box_top">
        <div class="headerbox_Pic">
          <van-image class="h_b_pic" :src="playlistmsg.coverImgUrl" />
          <div class="playcount">▶ {{ playCount | formatNumber }}</div>
        </div>
        <div class="headerbox_txt">
          <div class="h_t_playlistName van-multi-ellipsis--l2">
            {{ playlistmsg.name }}
          </div>
          <div class="h_t_creatorInfo">
            <div class="ctr_avatar">
              <van-image class="ctr_pic" round :src="creator.avatarpic" />
            </div>
            <div class="ctr_name">{{ creator.username }}</div>
          </div>
          <div
            class="introduce"
            @click="overlayshow = true"
            v-if="playlistmsg.description !== null"
          >
            <div class="introduce_txt van-ellipsis">
              {{ playlistmsg.description }}
            </div>
            <div class="my-icon">&#xe610;</div>
          </div>
        </div>
      </div>
      <!-- 下半区域 功能菜单 -->
      <div class="box_bottom">
        <!--  iscreated == 是否是自己创建 -->
        <div v-if="iscreated">
          <div class="item_div collection">
            <div class="my-icon cddd">&#xe617;</div>
            <div class="num cddd" v-if="collectionCount !== 0">
              {{ collectionCount | formatNumber }}
            </div>
            <div class="num cddd" v-else>收藏</div>
          </div>
        </div>
        <div v-if="!iscreated">
          <!--  subscribed == 是否收藏-->
          <!-- 是 -->
          <div
            class="item_div collection"
            v-if="subscribed"
            @click="subscribedToFalse"
          >
            <div class="my-icon blue">&#xe617;</div>
            <div class="num blue" v-if="collectionCount !== 0">
              {{ collectionCount | formatNumber }}
            </div>
            <div class="num" v-else>收藏</div>
          </div>
          <!-- 否 -->
          <div class="item_div collection" v-else @click="subscribedToTrue">
            <div class="my-icon">&#xe617;</div>
            <div class="num" v-if="collectionCount !== 0">
              {{ collectionCount | formatNumber }}
            </div>
            <div class="num" v-else>收藏</div>
          </div>
        </div>
        <div class="item_div comment" @click="toCommentDetail">
          <div class="my-icon">&#xe606;</div>
          <div class="num" v-if="commentCount !== 0">
            {{ commentCount | formatNumber }}
          </div>
          <div class="num" v-else>评论</div>
        </div>
        <div class="item_div share" @click="$store.commit('showShareSheet')">
          <div class="my-icon">&#xe6dc;</div>
          <div class="num" v-if="shareCount !== 0">
            {{ shareCount | formatNumber }}
          </div>
          <div class="num" v-else>分享</div>
        </div>
      </div>
    </div>
    <!-- 歌单列表区域 -->
    <div class="songList">
      <div class="sl_title">
        <div class="t_text">
          <span class="my-icon">&#xe690;</span>播放全部<span
            class="fz12 ml4 c939393"
            >( {{ trackIds.length }}首 )</span
          >
        </div>
        <div class="t_othericon">
          <div class="my-icon">&#xe6f3;</div>
          <div class="my-icon">&#xe62f;</div>
        </div>
      </div>
      <div class="sl_content">
        <div class="sl_item" v-for="(song, index) in tracks" :key="index">
          <div class="item_index">{{ index + 1 }}</div>
          <div class="item_txt">
            <div class="t_songname van-ellipsis">
              {{ song.name }}
              <span v-if="song.alia[0]" class="othername"
                >({{ song.alia[0] }})</span
              >
            </div>
            <div class="t_songby van-ellipsis">
              <span v-for="(ar, index) in song.ar" :key="index">
                <span v-if="index === song.ar.length - 1"> {{ ar.name }} </span>
                <span v-else>{{ ar.name }} / </span>
              </span>
              <span v-if="song.al.name"> - {{ song.al.name }}</span>
            </div>
          </div>
          <div class="item_icon" v-if="song.mv === 0">
            <div class="more my-icon ml26">&#xe6f8;</div>
          </div>
          <div class="item_icon" v-else>
            <div class="mv my-icon">&#xe621;</div>
            <div class="more my-icon">&#xe6f8;</div>
          </div>
        </div>
      </div>
    </div>
    <!-- 收藏用户展示区域 -->
    <div
      class="collectionuserlist"
      v-if="collectionCount !== 0"
      @click="$store.commit('showSubPopup')"
    >
      <div class="useravatr">
        <van-image
          v-for="(pic, index) in subscribers"
          :key="index"
          round
          :src="pic.avatarUrl"
          class="pic"
        />
      </div>
      <div class="collectionnum">
        {{ collectionCount | formatNumber }}人收藏
        <van-icon name="arrow" size="1.1em" color="#939393" class="icon" />
      </div>
    </div>
    <!-- 遮罩层 -->
    <van-overlay :show="overlayshow" @click="overlayshow = false">
      <div class="wrapper">
        <div class="block">
          <div class="pl_pic">
            <img :src="playlistmsg.coverImgUrl" />
          </div>
          <div class="pl_name">{{ playlistmsg.name }}</div>
          <div class="tag">
            <div class="title">标签：</div>
            <div
              class="tag_item"
              v-for="items in playlistmsg.tags"
              :key="items.id"
            >
              {{ items }}
            </div>
          </div>
          <div class="description">
            {{ playlistmsg.description }}
          </div>
        </div>
      </div>
    </van-overlay>
    <!-- 加载组件 -->
    <loading />
    <!-- 评论组件 -->
    <van-popup
      v-model="$store.state.isPopup"
      class="commentComp"
      position="bottom"
    >
      <comment-detial
        :parentId="songlistid"
        :toCommentinfos="toCommentinfos"
        :type="2"
      />
    </van-popup>
    <!-- 分享面板组件 -->
    <van-share-sheet
      v-model="$store.state.isShareSheet"
      title="立即分享给好友"
      :options="options"
      @cancel="$store.commit('hiddenShareSheet')"
      @click-overlay="$store.commit('hiddenShareSheet')"
    />
    <!-- 收藏者列表组件 -->
    <van-popup position="top" class="h100p" v-model="$store.state.isSubPopup">
      <playlist-subscribers-detail-page :playlistid="songlistid" />
    </van-popup>
  </div>
</template>

<script>
import {
  _getplaylistDetailDynamic,
  _getPlayListDetialById,
  _getPlaylistSubscribers,
  _subPlayList,
} from "../../network/playlist.js";
import { _getPlayListDetialBySongsId } from "../../network/music";
import CommentDetial from "../../components/Detial/CommentDetial";
import PlaylistSubscribersDetailPage from "../../components/Detial/PlaylistSubscribersDetailPage.vue";
export default {
  data() {
    return {
      // 控制遮罩层的显示隐藏
      overlayshow: false,
      // 从上级路由传递过来的id 用于查询歌单详情
      songlistid: this.$route.query.id,
      // 歌单创建人信息
      creator: {},
      // 页面头部的歌单信息
      playlistmsg: {},
      // 收藏人列表
      subscribers: [],
      // 是否是自己创建
      iscreated: false,
      // 歌曲id列表
      trackIds: [],
      // 歌曲列表
      tracks: [],
      // 收藏数量
      collectionCount: 0,
      // 评论数量
      commentCount: 0,
      // 分享数量
      shareCount: 0,
      // 播放量
      playCount: 0,
      // 收藏状态
      subscribed: false,
      //
      toCommentinfos: {},
      // 分享面板配置
      options: [
        [
          { name: "微信", icon: "wechat" },
          { name: "微博", icon: "weibo" },
          { name: "QQ", icon: "qq" },
        ],
        [
          { name: "复制链接", icon: "link" },
          { name: "分享海报", icon: "poster" },
          { name: "二维码", icon: "qrcode" },
          { name: "小程序码", icon: "weapp-qrcode" },
        ],
      ],
    };
  },
  components: {
    CommentDetial,
    PlaylistSubscribersDetailPage,
  },
  methods: {
    // 获取歌单详情
    async getPlayListdetail(id) {
      this.$store.commit("showLoading");
      let { data: plDetial } = await _getPlayListDetialById(id);
      if (plDetial.code === 200) {
        // 保存歌单创建者信息
        this.creator = {
          // 歌单创建者id
          id: plDetial.playlist.creator.userId,
          // 歌单创建者昵称
          username: plDetial.playlist.creator.nickname,
          // 歌单创建者头像
          avatarpic: plDetial.playlist.creator.avatarUrl,
        };
        // 保存歌单信息
        this.playlistmsg = {
          // 歌单封面
          coverImgUrl: plDetial.playlist.coverImgUrl,
          // 歌单名字
          name: plDetial.playlist.name,
          // 歌单简介
          description: plDetial.playlist.description,
          // 歌单标签
          tags: plDetial.playlist.tags,
        };
        // 保存发送给评论区的部分信息
        this.toCommentinfos = {
          // 歌单名字
          name: plDetial.playlist.name,
          // 歌单封面
          coverImgUrl: plDetial.playlist.coverImgUrl,
          // 歌单创建者昵称
          username: plDetial.playlist.creator.nickname,
        };
        // 保存歌曲列表的全部歌曲id
        // 由于某些歌单数量过多，参数太大容易报错，所以控制在700内
        if (plDetial.playlist.trackIds.length > 700) {
          for (let i = 0; i < 700; i++) {
            this.trackIds.push(plDetial.playlist.trackIds[i].id);
          }
        } else {
          for (let i = 0; i < plDetial.playlist.trackIds.length; i++) {
            this.trackIds.push(plDetial.playlist.trackIds[i].id);
          }
        }
      }
      // 获取收藏者列表
      let { data: subs } = await _getPlaylistSubscribers(id, 6);
      if (subs.code === 200) this.subscribers = subs.subscribers;
      /* 
        由于/playlist/detail接口返回的歌曲信息不完整
        但歌曲id是完整的 因此用歌曲id再次请求获取歌曲详情 
      */
      let { data: sDetail } = await _getPlayListDetialBySongsId(
        this.trackIds.toString()
      );
      if (sDetail.code === 200) {
        // 保存歌曲列表信息
        this.tracks = sDetail.songs;
      }
      // 判断歌单是否由自己创建
      this.isCreated();
      this.$store.commit("hiddenLoading");
    },
    // 获取歌单详情动态部分,如评论数,是否收藏,播放数
    async getPlayListDetailDynamic(id) {
      let { data } = await _getplaylistDetailDynamic(id);
      if (data.code === 200) {
        // 播放量
        this.playCount = data.playCount;
        // 分享量
        this.shareCount = data.shareCount;
        // 收藏量
        this.collectionCount = data.bookedCount;
        // 评论量
        this.commentCount = data.commentCount;
        // 收藏状态
        this.subscribed = data.subscribed;
      }
    },
    // 判断歌单是否由自己创建
    isCreated() {
      if (localStorage.getItem("userinfo") !== null) {
        let nowid = this.creator.id;
        let loginid = JSON.parse(localStorage.getItem("userinfo")).userId;
        if (nowid === loginid) this.iscreated = true;
        else this.iscreated = false;
      } else {
        this.iscreated = false;
      }
    },
    // 收藏
    async subscribedToTrue() {
      this.$store.commit("showLoading");
      let { data } = await _subPlayList(1, this.songlistid);
      if (data.code === 200) {
        this.getPlayListDetailDynamic(this.songlistid);
      } else {
        this.$msg.fail(data.msg);
      }
      this.$store.commit("hiddenLoading");
    },
    // 取消收藏
    subscribedToFalse() {
      let id = this.songlistid;
      this.$dialog.confirm({
        message: "确定不再收藏此歌单吗",
        cancelButtonColor: "black",
        confirmButtonText: "不再收藏",
        confirmButtonColor: "#2B6DE6",
        beforeClose: async (action, done) => {
          if (action === "confirm") {
            let { data } = await _subPlayList(2, id);
            if (data.code === 200) {
              this.getPlayListDetailDynamic(this.songlistid);
            } else {
              this.$msg.fail(data.msg);
            }
            done();
          } else {
            done();
          }
        },
      });
    },
    // 评论详情
    toCommentDetail() {
      this.$store.commit("showPopup");
    },
  },
  mounted() {
    this.getPlayListdetail(this.songlistid);
    this.getPlayListDetailDynamic(this.songlistid);
  },
};
</script>

<style lang="less" scoped>
#playlistdetial {
  .navbareset {
    background-image: linear-gradient(
      110.3deg,
      rgba(72, 85, 99, 1) 8.8%,
      rgba(127, 146, 166, 1) 95.1%
    );
    .menu {
      color: #fff;
      display: flex;
      font-size: 1.2em;
      > .my-icon {
        margin-left: 8px;
      }
    }
  }
  .headerBox {
    margin-top: 46px;
    background-image: linear-gradient(
      110.3deg,
      rgba(72, 85, 99, 1) 8.8%,
      rgba(127, 146, 166, 1) 95.1%
    );
    position: relative;
    .box_top {
      height: 180px;
      box-sizing: border-box;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 20px 10px;
      .headerbox_Pic {
        text-align: center;
        width: 135px;
        position: relative;
        .h_b_pic {
          width: 100px;
          height: 100px;
          border-radius: 12px;
          overflow: hidden;
        }
        .playcount {
          position: absolute;
          top: 4px;
          right: 16px;
          height: 16px;
          background-color: rgba(0, 0, 0, 0.4);
          color: #fff;
          font-size: 10px;
          line-height: 16px;
          border-radius: 20px;
          padding: 0 10px;
        }
      }
      .headerbox_txt {
        width: 240px;
        .h_t_playlistName {
          color: #ececec;
          font-size: 14px;
        }
        .h_t_creatorInfo {
          display: flex;
          align-items: center;
          color: #d8d8d8;
          margin: 6px 0 12px;
          .ctr_pic {
            width: 24px;
            height: 24px;
          }
          .ctr_name {
            margin-left: 10px;
            font-size: 12px;
          }
        }
        .introduce {
          height: 20px;
          font-size: 12px;
          color: #d8d8d8;
          display: flex;
          align-items: center;
          .introduce_txt {
            width: 200px;
            height: 16px;
            line-height: 16px;
          }
          .my-icon {
            font-size: 10px;
            line-height: 16px;
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
        display: flex;
        align-items: center;
        justify-content: center;
        &:nth-child(-n + 2) {
          border-right: 2px solid #ccc;
        }
        height: 24px;
        width: 100%;
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
          color: #2b6de6;
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
  .collectionuserlist {
    height: 60px;
    background-color: #fff;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .useravatr {
      margin-left: 10px;
      .pic {
        margin: 0 4px;
        width: 32px;
        height: 32px;
      }
    }
    .collectionnum {
      font-size: 13px;
      color: #939393;
      margin-right: 20px;
      height: 60px;
      display: flex;
      align-items: center;
      .icon {
        margin-left: 4px;
      }
    }
  }
  // 遮罩层相关
  .wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    background-image: linear-gradient(
      110.3deg,
      rgba(72, 85, 99, 1) 8.8%,
      rgba(127, 146, 166, 1) 95.1%
    );
    .block {
      margin-top: 36%;
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 0 20px;
      .pl_pic {
        width: 180px;
        height: 180px;
        border-radius: 15px;
        overflow: hidden;
        > img {
          width: inherit;
          height: inherit;
        }
      }
      .pl_name {
        margin: 20px 0 40px 0;
        font-size: 16px;
        color: #fff;
        font-weight: 500;
      }
      .tag {
        display: flex;
        align-items: center;
        width: 100%;
        font-size: 14px;
        margin-bottom: 10px;
        color: #fff;
        .tag_item {
          font-size: 12.6px;
          height: 22px;
          width: 48px;
          line-height: 22px;
          text-align: center;
          background-color: rgba(0, 0, 0, 0.4);
          margin: 0 4px;
          border-radius: 15px;
        }
      }
      .description {
        font-size: 12.8px;
        line-height: 18px;
        color: #fff;
        height: 260px;
        overflow: scroll;
      }
    }
  }
  // 评论弹出层
  .commentComp {
    width: 100%;
    height: 100%;
  }
}
</style>