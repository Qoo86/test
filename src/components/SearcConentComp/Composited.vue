<template>
  <div class="content">
    <!-- 单曲 -->
    <div class="list_div">
      <van-cell value="单曲" value-class="s_title" />
      <van-empty
        image="error"
        description="暂无相关的任何单曲"
        v-if="!song.songs"
      />
      <div class="songList" v-else>
        <div v-for="item in song.songs" :key="item.id">
          <van-cell-group>
            <van-cell :title="item.name" center class="van-multi-ellipsis--l2">
              <template #label>
                <span class="custom-title van-ellipsis">
                  <span v-for="(ar, index) in item.ar" :key="index">
                    <span v-if="index === item.ar.length - 1">
                      {{ ar.name }}
                    </span>
                    <span v-else>{{ ar.name }} / </span>
                  </span>
                  -
                  {{ item.al.name }}
                </span>
              </template>
              <template #right-icon>
                <van-icon name="play-circle-o" size="1.4em" />
              </template>
            </van-cell>
          </van-cell-group>
        </div>
      </div>
      <van-cell :value="song.moreText" value-class="s_more" v-if="song.more" />
    </div>
    <!-- 专辑 -->
    <div class="list_div">
      <van-cell value="专辑" value-class="s_title" />
      <van-empty
        image="error"
        description="暂无相关的任何专辑"
        v-if="!album.albums"
      />
      <div class="albumList" v-else>
        <div
          class="a_listitem"
          v-for="(item, index) in album.albums"
          :key="index"
          @click="toAlbumDetail(item.id)"
        >
          <div class="a_listImg">
            <van-image width="50" height="50" :src="item.picUrl" />
          </div>
          <div class="a_listText">
            <div class="a_listName van-ellipsis">{{ item.name }}</div>
            <div class="a_listbyandtime">
              {{ item.artist.name }} {{ item.publishTime | formatDate(2) }}
            </div>
          </div>
        </div>
      </div>
      <van-cell
        :value="album.moreText"
        value-class="s_more"
        v-if="album.more"
      />
    </div>
    <!-- 歌单 -->
    <div class="list_div">
      <van-cell value="歌单" value-class="s_title" />
      <van-empty
        image="error"
        description="暂无相关的任何歌单"
        v-if="!playList.playLists"
      />
      <div class="playList" v-else>
        <div
          class="p_listitem"
          v-for="(item, index) in playList.playLists"
          :key="index"
          @click="toPlayListDetail(item.id)"
        >
          <div class="playListIMg">
            <van-image width="50" height="50" :src="item.coverImgUrl" />
          </div>
          <div class="playListText">
            <div class="plt_name van-ellipsis">{{ item.name }}</div>
            <div class="plt_sm van-ellipsis">
              {{ item.trackCount }}首
              <span v-if="item.creator">by {{ item.creator.nickname }}</span>
              播放{{ item.playCount | formatNumber }}次
            </div>
          </div>
        </div>
      </div>
      <van-cell
        :value="playList.moreText"
        value-class="s_more"
        v-if="playList.more"
      />
    </div>
    <!-- 歌手 -->
    <div class="list_div">
      <van-cell value="歌手" value-class="s_title" />
      <van-empty
        image="error"
        description="暂无相关的任何歌手"
        v-if="!artist.artists"
      />
      <div class="singerList" v-else>
        <div
          class="s_listitem"
          v-for="(item, index) in artist.artists"
          :key="index"
          @click="toArtistDetail(item.id)"
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
        :value="artist.moreText"
        value-class="s_more"
        v-if="artist.more"
      />
    </div>
    <!-- 用户 -->
    <div class="list_div">
      <van-cell value="用户" value-class="s_title" />
      <van-empty
        image="error"
        description="暂无相关的任何用户"
        v-if="!user.users"
      />
      <div class="usersList" v-else>
        <div
          class="user_item"
          v-for="(item, index) in user.users"
          :key="index"
          @click="toUserInfoDetailPage(item.userId)"
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
              <span v-if="item.gender == 1" class="my-icon blue">&#xe60a;</span>
              <span v-else class="my-icon pink">&#xe683;</span>
            </div>
            <div class="userjianjie van-ellipsis">{{ item.signature }}</div>
          </div>
        </div>
      </div>
      <van-cell :value="user.moreText" value-class="s_more" v-if="user.more" />
    </div>
    <!-- 视频 -->
    <div class="list_div">
      <van-cell value="视频" value-class="s_title" />
      <van-empty
        image="error"
        description="暂无相关的任何视频"
        v-if="!video.videos"
      />
      <div class="videoList" v-else>
        <div
          class="videoItem"
          v-for="(item, index) in video.videos"
          :key="index"
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
              {{ item.durationms | formatDuration }} | by
              {{ item.creator[0].userName }} |
              {{ item.playTime | formatNumber }}次播放
            </div>
          </div>
        </div>
      </div>
      <van-cell
        :value="video.moreText"
        value-class="s_more"
        v-if="video.more"
      />
    </div>
  </div>
</template>

<script>
import { _getSearchdata } from "../../network/search";

export default {
  props: ["keyword"],
  data() {
    return {
      song: {},
      album: {},
      playList: {},
      artist: {},
      user: {},
      video: {},
    };
  },
  methods: {
    // 获取 <综合> 里面的数据
    async getCompositedata(keywords, type) {
      let { data: res } = await _getSearchdata(keywords, type);
      if (res.code === 200) {
        let data = res.result;
        if (data.song) this.song = data.song;
        if (data.album) this.album = data.album;
        if (data.playList) this.playList = data.playList;
        if (data.artist) this.artist = data.artist;
        if (data.user) this.user = data.user;
        if (data.video) this.video = data.video;
      } else {
        console.log(res);
      }
    },
    // 跳转歌单详情页
    toPlayListDetail(id) {
      this.$router.push({ path: "/playlistdetail", query: { id } });
    },
    toAlbumDetail(id) {
      this.$router.push({ path: "/albumDetail", query: { id } });
    },
    toArtistDetail(id) {
      this.$router.push({ path: "/artist", query: { id } });
    },
    // 跳转用户详情页
    toUserInfoDetailPage(id) {
      this.$router.push({ path: "/userinfo", query: { id } });
    },
  },
  mounted() {
    this.getCompositedata(this.keyword, "1018");
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
.custom-title {
  display: inline-block;
  width: 240px;
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
            .my-icon {
              font-size: 16px;
            }
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