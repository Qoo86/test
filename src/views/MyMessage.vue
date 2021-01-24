<template>
  <div id="mymessage">
    <header-bar>
      <template v-slot:left>
        <van-icon
          name="arrow-left"
          color="#fff"
          @click="onRouterBack"
        ></van-icon>
      </template>
      <template v-slot:title> 我 的 消 息 </template>
    </header-bar>
    <van-notice-bar
      left-icon="volume-o"
      text="由于本项目的后台接口为互联网dalao资源，
      并且该接口文档中没有对私信的操作：如“全部已读、清空聊天记录”等内容的相关信息，
      因此并没有实现这些功能。只有最基础的列表查看QAQ"
    />
    <div class="headerGrid">
      <div class="fans">
        <div class="my-icon icon_g" style="background-color: #ff4500">
          &#xe605;
        </div>
        <div class="text">粉丝</div>
      </div>
      <div class="pinglun">
        <div class="my-icon icon_g" style="background-color: #00bfff">
          &#xe606;
        </div>
        <div class="text">评论</div>
      </div>
      <div class="aite">
        <div class="my-icon icon_g" style="background-color: #ff8c00">
          &#xe648;
        </div>
        <div class="text">@我</div>
      </div>
      <div class="tongzhi">
        <div class="my-icon icon_g" style="background-color: #ffd700">
          &#xe615;
        </div>
        <div class="text">通知</div>
      </div>
    </div>
    <div class="title">官方消息</div>
    <div class="GfMsg">
      <div class="lickPicIcon my-icon">&#xe702;</div>
      <div class="text">新歌发布</div>
      <div class="icon"><van-icon name="arrow" size=".4rem" /></div>
    </div>
    <div class="title">私信对话</div>
    <div class="shixingBox">
      <div
        class="sx_item"
        v-for="(item, index) in fromUserPrivateMsg"
        :key="index"
        @click="getDetailMsg(item.fromUser.userId, item.fromUser.nickname)"
      >
        <div class="sx_pic">
          <div class="avater">
            <img :src="item.fromUser.avatarUrl" />
          </div>
          <!-- 避免官方号和个人号、用户号数据结构不同报错 -->
          <div class="rzicon" v-if="item.fromUser.avatarDetail">
            <img :src="item.fromUser.avatarDetail.identityIconUrl" />
          </div>
        </div>
        <div class="sx_content">
          <div class="sx_nameAndTime">
            <div class="name">
              {{ item.fromUser.nickname }}
            </div>
            <div class="time">{{ item.lastMsgTime | formatDate(1) }}</div>
          </div>
          <div class="sx_text">
            <div class="sx_text_content van-ellipsis">
              <!-- 避免官方号和个人号、用户号数据结构不同报错 -->
              <span v-if="JSON.parse(item.lastMsg).promotionUrl">
                {{ JSON.parse(item.lastMsg).promotionUrl.text }} :
              </span>
              <!-- 避免官方号和个人号、用户号数据结构不同报错 -->
              <span v-if="JSON.parse(item.lastMsg).album">
                {{ JSON.parse(item.lastMsg).album.type }} :
              </span>
              <span>
                {{ JSON.parse(item.lastMsg).msg }}
              </span>
            </div>
            <!-- 避免官方号和个人号、用户号数据结构不同报错 -->
            <div v-if="item.newMsgCount" class="sx_text_newMsgNum">
              {{ item.newMsgCount }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import HeaderBar from "../components/HeaderBar.vue";
import { _getPrivateMsg } from "../network/user";
export default {
  data() {
    return {
      fromUserPrivateMsg: [],
    };
  },
  components: {
    HeaderBar,
  },
  methods: {
    onRouterBack() {
      this.$router.go(-1);
    },
    // 传输id给信息详情路由
    getDetailMsg(id, name) {
      this.$router.push({
        path: "/userMsgDetail",
        query: { id, name },
      });
    },
    // 获得私信内容列表
    async getPrivateMsg() {
      let { data } = await _getPrivateMsg();
      if (data.code === 200) this.fromUserPrivateMsg = data.msgs;
    },
  },
  mounted() {
    this.getPrivateMsg();
  },
};
</script>

<style lang="less" scoped>
#mymessage {
  .headerGrid {
    height: 120px;
    background-color: #fff;
    display: grid;
    justify-items: center;
    align-items: center;
    grid-template-columns: repeat(4, 25%);
    .icon_g {
      width: 50px;
      height: 50px;
      border-radius: 50%;
      margin-bottom: 16px;
      font-size: 24px;
      text-align: center;
      line-height: 50px;
      color: #fff;
    }
    .text {
      text-align: center;
      font-size: 12px;
      color: #a0a0a0;
    }
  }
  .title {
    height: 30px;
    font-size: 12px;
    line-height: 30px;
    margin-left: 10px;
    color: #a0a0a0;
  }
  .GfMsg {
    background-color: #fff;
    height: 70px;
    display: flex;
    align-items: center;
    .lickPicIcon {
      width: 50px;
      height: 50px;
      border-radius: 50%;
      margin: 0 10px;
      font-size: 36px;
      line-height: 50px;
      text-align: center;
      color: #fff;
      background-color: red;
    }
    .text {
      width: 72%;
      font-size: 14px;
    }
    .icon {
      height: 15px;
    }
  }
  .shixingBox {
    background-color: #fff;
    .sx_item {
      height: 75px;
      display: flex;
      align-items: center;
      .sx_pic {
        position: relative;
        width: 68px;
        .avater {
          margin-left: 6px;
          width: 50px;
          height: 50px;
          border-radius: 50%;
          overflow: hidden;
          > img {
            width: 50px;
            height: 50px;
          }
        }
        .rzicon {
          position: absolute;
          width: 16px;
          height: 16px;
          right: 16%;
          top: 50%;
          > img {
            width: 16px;
            height: 16px;
          }
        }
      }
      .sx_content {
        width: 80%;
        .sx_nameAndTime {
          display: flex;
          align-items: center;
          position: relative;
          .name {
            font-size: 14px;
          }
          .time {
            font-size: 10px;
            color: #a0a0a0;
            position: absolute;
            right: 4%;
          }
        }
      }
      .sx_text {
        margin-top: 3px;
        display: flex;
        align-items: center;
        .sx_text_content {
          width: 88%;
          font-size: 12px;
          color: #a0a0a0;
        }
        .sx_text_newMsgNum {
          margin-left: 4%;
          width: 14px;
          height: 14px;
          border-radius: 50%;
          background-color: red;
          font-size: 10px;
          line-height: 14px;
          text-align: center;
          color: #fff;
        }
      }
    }
  }
}
</style>