<template>
  <div class="content">
    <!-- 单曲 -->
    <div class="list_div">
      <van-cell value="单曲" value-class="s_title" />
      <van-empty
        image="error"
        description="暂无相关的任何单曲"
        v-if="!compositeData.song.songs"
      />
      <div class="songList" v-else>
        <div v-for="item in compositeData.song.songs" :key="item.index">
          <van-cell-group>
            <van-cell
              :title="item.name"
              :label="item.ar[0].name"
              center
              class="van-multi-ellipsis--l2"
            >
              <template #right-icon>
                <van-icon name="play-circle-o" size="1.4em" />
              </template>
            </van-cell>
          </van-cell-group>
        </div>
      </div>
      <van-cell
        :value="compositeData.song.moreText"
        value-class="s_more"
        v-if="compositeData.song.more"
      />
    </div>
    <!-- 专辑 -->
    <div class="list_div">
      <van-cell value="专辑" value-class="s_title" />
      <van-empty
        image="error"
        description="暂无相关的任何专辑"
        v-if="!compositeData.album.albums"
      />
      <div class="albumList" v-else>
        <div
          class="a_listitem"
          v-for="item in compositeData.album.albums"
          :key="item.index"
        >
          <div class="a_listImg">
            <van-image width="50" height="50" :src="item.picUrl" />
          </div>
          <div class="a_listText">
            <div class="a_listName van-ellipsis">{{ item.name }}</div>
            <div class="a_listbyandtime">
              {{ item.artist.name }} {{ item.publishTime | formatDate }}
            </div>
          </div>
        </div>
      </div>
      <van-cell
        :value="compositeData.album.moreText"
        value-class="s_more"
        v-if="compositeData.album.more"
      />
    </div>
    <!-- 歌单 -->
    <div class="list_div">
      <van-cell value="歌单" value-class="s_title" />
      <van-empty
        image="error"
        description="暂无相关的任何歌单"
        v-if="!compositeData.playList.playLists"
      />
      <div class="playList" v-else>
        <div
          class="p_listitem"
          v-for="item in compositeData.playList.playLists"
          :key="item.index"
        >
          <div class="playListIMg">
            <van-image width="50" height="50" :src="item.coverImgUrl" />
          </div>
          <div class="playListText">
            <div class="plt_name van-ellipsis">{{ item.name }}</div>
            <div class="plt_sm van-ellipsis">
              {{ item.trackCount }}首 | by {{ item.creator.nickname }} | 播放{{
                item.playCount | formNum
              }}次
            </div>
          </div>
        </div>
      </div>
      <van-cell
        :value="compositeData.playList.moreText"
        value-class="s_more"
        v-if="compositeData.playList.more"
      />
    </div>
    <!-- 歌手 -->
    <div class="list_div">
      <van-cell value="歌手" value-class="s_title" />
      <van-empty
        image="error"
        description="暂无相关的任何歌手"
        v-if="!compositeData.artist.artists"
      />
      <div class="singerList" v-else>
        <div
          class="s_listitem"
          v-for="item in compositeData.artist.artists"
          :key="item.index"
        >
          <div class="s_listitemImg">
            <van-image
              :src="item.picUrl"
              width="1.4rem"
              height="1.4rem"
              round
              fit="cover"
            />
          </div>
          <div class="s_listitemName van-ellipsis">
            {{ item.name }}
          </div>
        </div>
      </div>
      <van-cell
        :value="compositeData.artist.moreText"
        value-class="s_more"
        v-if="compositeData.artist.more"
      />
    </div>
    <!-- 用户 -->
    <div class="list_div">
      <van-cell value="用户" value-class="s_title" />
      <van-empty
        image="error"
        description="暂无相关的任何用户"
        v-if="!compositeData.user.users"
      />
      <div class="usersList" v-else>
        <div
          class="user_item"
          v-for="item in compositeData.user.users"
          :key="item.index"
        >
          <div class="userimg">
            <van-image
              :src="item.avatarUrl"
              width="1.4rem"
              height="1.4rem"
              round
              fit="cover"
            />
          </div>
          <div class="userInfo">
            <div class="username van-ellipsis">
              {{ item.nickname }}
              <span
                v-if="item.gender == 1"
                class="my-icon"
                style="color: #5282e8; font-size: 16px"
                >&#xe60a;</span
              >
              <span v-else class="my-icon" style="color: pink; font-size: 16px"
                >&#xe683;</span
              >
            </div>
            <div class="userjianjie van-ellipsis">{{ item.signature }}</div>
          </div>
        </div>
      </div>
      <van-cell
        :value="compositeData.user.moreText"
        value-class="s_more"
        v-if="compositeData.user.more"
      />
    </div>
    <!-- 视频 -->
    <div class="list_div">
      <van-cell value="视频" value-class="s_title" />
      <van-empty
        image="error"
        description="暂无相关的任何视频"
        v-if="!compositeData.video.videos"
      />
      <div class="videoList" v-else>
        <div
          class="videoItem"
          v-for="item in compositeData.video.videos"
          :key="item.index"
        >
          <div class="v_img">
            <div class="playicon">
              <van-icon name="play" class="icon" />
            </div>
            <van-image
              :src="item.coverUrl"
              fit="cover"
              width="80px"
              height="45px"
            />
          </div>
          <div class="v_text">
            <div class="v_name van-ellipsis">{{ item.title }}</div>
            <div class="v_content van-ellipsis">
              {{ item.durationms | formDuration }} | by
              {{ item.creator[0].userName }} |
              {{ item.playTime | formNum }}次播放
            </div>
          </div>
        </div>
      </div>
      <van-cell
        :value="compositeData.video.moreText"
        value-class="s_more"
        v-if="compositeData.video.more"
      />
    </div>
  </div>
</template>

<script>
export default {
  props: ["keyword"],
  data() {
    return {
      compositeData: {
        song: {},
        album: {},
        playList: {},
        artist: {},
        user: {},
        video: {},
      },
    };
  },
  methods: {
    // 获取 <综合> 里面的数据
    async getCompositedata(keyword) {
      let { data } = await this.$http({
        url: `search?keywords=${keyword}&type=1018`,
        withCredentials: true,
      });

      if (data.code == 200) {
        if (data.result.song != undefined)
          this.compositeData.song = data.result.song;

        if (data.result.album != undefined)
          this.compositeData.album = data.result.album;

        if (data.result.playList != undefined)
          this.compositeData.playList = data.result.playList;

        if (data.result.artist != undefined)
          this.compositeData.artist = data.result.artist;

        if (data.result.user != undefined)
          this.compositeData.user = data.result.user;

        if (data.result.video != undefined)
          this.compositeData.video = data.result.video;
      } else {
        return;
      }
    },
  },
  mounted() {
    this.getCompositedata(this.keyword);
  },
};
</script>

<style lang="less" scoped>
.van-cell__title {
  font-size: 13px;
}
.van-cell__label {
  font-size: 11px;
}

.content {
  height: 512px;
  overflow: scroll;
  .list_div {
    width: 92%;
    margin: 20px auto;
    background-color: #fff;
    border-radius: 10px;
    .s_title {
      font-weight: 600;
      letter-spacing: 0.2em;
    }
    .s_more {
      font-size: 12px;
      text-align: center;
      color: #a4a2a2;
    }

    .playList {
      .p_listitem {
        height: 70px;
        display: flex;
        align-items: center;
        .playListIMg {
          width: 50px;
          height: 50px;
          border-radius: 12px;
          overflow: hidden;
          margin-left: 20px;
          > img {
            width: inherit;
            height: inherit;
          }
        }
        .playListText {
          width: 230px;
          margin-left: 20px;
          .plt_name {
            font-size: 13px;
          }
          .plt_sm {
            margin-top: 4px;
            color: #757575;
            font-size: 10px;
          }
        }
      }
    }

    .albumList {
      .a_listitem {
        height: 70px;
        display: flex;
        align-items: center;
        .a_listImg {
          width: 50px;
          height: 50px;
          margin-left: 20px;
          border-radius: 12px;
          overflow: hidden;
        }
        .a_listText {
          margin-left: 14px;
          width: 230px;
          .a_listName {
            font-size: 14px;
          }
          .a_listbyandtime {
            margin-top: 6px;
            font-size: 10px;
            color: #757575;
          }
        }
      }
    }

    .singerList {
      .s_listitem {
        height: 76px;
        display: flex;
        align-items: center;
        .s_listitemImg {
          margin-left: 20px;
        }
        .s_listitemName {
          width: 230px;
          font-size: 14px;
          margin-left: 10px;
        }
      }
    }

    .usersList {
      .user_item {
        height: 76px;
        display: flex;
        align-items: center;
        .userimg {
          margin-left: 20px;
        }
        .userInfo {
          width: 210px;
          margin-left: 8px;
          .username {
            font-size: 14px;
          }
          .userjianjie {
            margin-top: 4px;
            font-size: 10px;
            color: #a4a2a2;
          }
        }
      }
    }

    .videoList {
      .videoItem {
        height: 76px;
        display: flex;
        align-items: center;
        .v_img {
          margin-left: 20px;
          width: 80px;
          height: 45px;
          border-radius: 12px;
          overflow: hidden;
          position: relative;
          .playicon {
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
            z-index: 999;
            .icon {
              font-size: 26px;
              color: rgba(255, 255, 255, 0.8);
            }
          }
        }
        .v_text {
          width: 230px;
          margin-left: 10px;
          .v_name {
            font-size: 14px;
            color: #2c2c2c;
          }
          .v_content {
            margin-top: 4px;
            color: #757575;
            font-size: 11px;
          }
        }
      }
    }
  }
}
</style>