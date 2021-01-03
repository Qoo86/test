<template>
  <div id="playlistdetial">
    <!-- 头部导航栏 -->
    <van-nav-bar
      :border="false"
      fixed
      class="navbareset"
      @click-left="routerBack"
    >
      <template #left>
        <van-icon name="arrow-left" size="1.4em" />
      </template>
      <template #title>
        <span> 歌单 - {{ headermsgs.name }}</span>
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
          <van-image class="h_b_pic" :src="headermsgs.coverImgUrl" />
          <div class="playcount">▶ {{ headermsgs.playCount | formNum }}</div>
        </div>
        <div class="headerbox_txt">
          <div class="h_t_playlistName van-multi-ellipsis--l2">
            {{ headermsgs.name }}
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
            v-if="headermsgs.description !== null"
          >
            <div class="introduce_txt van-ellipsis">
              {{ headermsgs.description }}
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
            <div class="my-icon" style="color: #ddd">&#xe617;</div>
            <div
              class="num"
              v-if="headermsgs.collection !== 0"
              style="color: #ddd"
            >
              {{ headermsgs.collection | formNum }}
            </div>
            <div class="num" style="color: #ddd" v-else>收藏</div>
          </div>
        </div>
        <div v-if="!iscreated">
          <!--  subscribed == 是否收藏-->
          <div class="item_div collection" v-if="subscribed">
            <div class="my-icon" style="color: #2b6de6">&#xe617;</div>
            <div
              class="num"
              v-if="headermsgs.collection !== 0"
              style="color: #2b6de6"
            >
              {{ headermsgs.collection | formNum }}
            </div>
            <div class="num" v-else>收藏</div>
          </div>
          <div class="item_div collection" v-else>
            <div class="my-icon">&#xe617;</div>
            <div class="num" v-if="headermsgs.collection !== 0">
              {{ headermsgs.collection | formNum }}
            </div>
            <div class="num" v-else>收藏</div>
          </div>
        </div>
        <div class="item_div comment">
          <div class="my-icon">&#xe606;</div>
          <div class="num" v-if="headermsgs.comment !== 0">
            {{ headermsgs.comment | formNum }}
          </div>
          <div class="num" v-else>评论</div>
        </div>
        <div class="item_div share">
          <div class="my-icon">&#xe6dc;</div>
          <div class="num" v-if="headermsgs.share !== 0">
            {{ headermsgs.share | formNum }}
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
            style="font-size: 12px; color: #939393; margin-left: 4px"
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
              {{ song.ar[0].name }}
              <span v-if="song.al.name"> - {{ song.al.name }}</span>
            </div>
          </div>
          <div class="item_icon" v-if="song.mv === 0">
            <div style="width: 14px; height: 14px"></div>
            <div class="more my-icon">&#xe6f8;</div>
          </div>
          <div class="item_icon" v-else>
            <div class="mv my-icon">&#xe6cf;</div>
            <div class="more my-icon">&#xe6f8;</div>
          </div>
        </div>
      </div>
    </div>
    <!-- 收藏用户展示区域 -->
    <div class="collectionuserlist" v-if="headermsgs.subscribedCount !== 0">
      <div class="useravatr">
        <van-image
          v-for="pic in subscribers"
          :key="pic.index"
          round
          :src="pic.avatarUrl"
          class="pic"
        />
      </div>
      <div class="collectionnum">
        {{ headermsgs.subscribedCount | formNum }}人收藏
        <van-icon name="arrow" size="1.1em" color="#939393" class="icon" />
      </div>
    </div>
    <!-- 遮罩层 -->
    <van-overlay :show="overlayshow" @click="overlayshow = false">
      <div class="wrapper">
        <div class="block">
          <div class="pl_pic">
            <img :src="headermsgs.coverImgUrl" />
          </div>
          <div class="pl_name">{{ headermsgs.name }}</div>
          <div class="tag">
            <div class="title">标签：</div>
            <div
              class="tag_item"
              v-for="items in headermsgs.tags"
              :key="items.id"
            >
              {{ items }}
            </div>
          </div>
          <div class="description">
            {{ headermsgs.description }}
          </div>
        </div>
      </div>
    </van-overlay>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 控制遮罩层的显示哥隐藏
      overlayshow: false,
      // 从上级路由传递过来的id 用于查询歌单详情
      songlistid: this.$route.query.id,
      // 歌单创建人信息
      creator: {},
      // 页面头部的各种信息
      headermsgs: {},
      // 收藏人列表
      subscribers: [],
      // 收藏状态
      subscribed: "",
      // 是否是自己创建
      iscreated: true,
      // 歌曲id列表
      trackIds: [],
      // 歌曲列表
      tracks: [],
    };
  },
  methods: {
    // 返回上级路由
    routerBack() {
      this.$router.go(-1);
    },
    // 获取歌单详情
    async getPlayListdetail(id) {
      let { data } = await this.$http({
        url: `/playlist/detail?id=${id}`,
        withCredentials: true,
      });
      // console.log(data.playlist);
      if (data.code !== 200) return;
      // 保存歌单创建者信息
      this.creator = {
        id: data.playlist.creator.userId,
        username: data.playlist.creator.nickname,
        avatarpic: data.playlist.creator.avatarUrl,
      };
      // 保存头部的各种信息
      this.headermsgs = {
        coverImgUrl: data.playlist.coverImgUrl,
        name: data.playlist.name,
        description: data.playlist.description,
        tags: data.playlist.tags,
        collection: data.playlist.subscribedCount,
        comment: data.playlist.commentCount,
        share: data.playlist.shareCount,
        playCount: data.playlist.playCount,
        subscribedCount: data.playlist.subscribedCount,
      };
      // 保存收藏者列表
      for (let i = 0; i < data.playlist.subscribers.length; i++) {
        this.subscribers.push(data.playlist.subscribers[i]);
      }
      // 添加判断 使显示的头像在[0,5]之间
      if (this.subscribers.length > 5) {
        for (let i = 0; i < this.subscribers.length - 3; i++) {
          this.subscribers.pop();
        }
      }
      // 保存收藏状态
      this.subscribed = data.playlist.subscribed;
      // 保存歌曲列表的全部歌曲id
      for (let i = 0; i < data.playlist.trackIds.length; i++) {
        this.trackIds.push(data.playlist.trackIds[i].id);
      }
      /* 
        由于/playlist/detail接口返回的歌曲信息不完整
        但歌曲id是完整的 因此用歌曲id再次请求获取歌曲详情 
      */
      let res = await this.$http({
        url: `/song/detail?ids=${this.trackIds}`,
        withCredentials: true,
      });
      if (res.data.code !== 200) return;
      // 保存歌曲列表信息
      this.tracks = res.data.songs;
      // 判断是否是用户自己创建的歌单
      this.isCreatedPangduan();
    },
    // 判断是否是用户自己创建的歌单
    isCreatedPangduan() {
      let loginid = window.localStorage.getItem("userid");
      if (loginid == this.creator.id) {
        this.iscreated = true;
      } else {
        this.iscreated = false;
      }
    },
  },
  mounted() {
    this.getPlayListdetail(this.songlistid);
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
          width: 50px;
          height: 16px;
          background-color: rgba(0, 0, 0, 0.4);
          color: #fff;
          font-size: 10px;
          line-height: 16px;
          border-radius: 20px;
          padding: 0 4px;
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
        &:nth-child(n-1) {
          border-right: 2px solid #ccc;
        }
        height: 60%;
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
        position: relative;
        .item_index {
          text-align: center;
          width: 50px;
          font-size: 16px;
          color: #939393;
        }
        .item_txt {
          width: 265px;
          .t_songname {
            font-size: 16px;
            .othername {
              color: #939393;
            }
          }
          .t_songby {
            font-size: 12px;
            margin-top: 2px;
            color: #939393;
          }
        }
        .item_icon {
          position: absolute;
          right: 4%;
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
      }
    }
  }
}
</style>