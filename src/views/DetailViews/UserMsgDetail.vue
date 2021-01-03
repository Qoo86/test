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
      <template v-slot:title>WITH：{{ fromUserName }}</template>
    </header-bar>
    <!-- 通知栏 -->
    <van-notice-bar
      v-if="hint"
      :text="hint"
      color="#1989fa"
      background="#ecf9ff"
      left-icon="info-o"
    />
    <!-- 主体内容 -->
    <div class="Body">
      <div class="b_item">
        <div class="time">12-12 20:11</div>
        <div class="b_i_main">
          <div class="m_userPic">
            <img src="../../assets/images/logo.jpg" alt="" />
          </div>
          <div class="m_msgBox">
            <div class="msg_txt">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Libero,
              eaque sunt obcaecati illo corporis repellendus, commodi numquam
              veniam debitis nam sed accusamus culpa! Officia, animi eius. Ipsam
              tempore rem hic.
            </div>
            <div class="msg_neiron">
              <div class="m_n_pic"></div>
              <div class="m_n_txt">你好陌生人</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import HeaderBar from "../../components/HeaderBar.vue";
export default {
  data() {
    return {
      keyId: this.$route.query.id,
      fromUserName: this.$route.query.name,
      hint: "",
      msgs: [],
    };
  },
  components: {
    HeaderBar,
  },
  methods: {
    onRouterBack() {
      this.$router.go(-1);
    },
    // 根据ID获取到聊天记录
    // async getMsgDetailById(id) {
    //   let { data } = await this.$http({
    //     url: `/msg/private/history?uid=${id}`,
    //     withCredentials: true,
    //   });
    //   console.log(data);
    //   if (data.code !== 200) return;
    //   this.hint = data.hint;
    //   this.msgs = data.msgs;
    // },
  },
  mounted() {
    // this.getMsgDetailById(this.keyId);
  },
};
</script>

<style lang="less" scoped>
.Body {
  .b_item {
    .time {
      height: 18px;
      width: 24%;
      background-color: #d1d1d1;
      border-radius: 15px;
      text-align: center;
      margin: 20px auto 0;
      font-size: 12px;
      line-height: 18px;
      color: white;
    }
    .b_i_main {
      display: flex;
      margin: 20px 8px;
      .m_userPic {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        overflow: hidden;
        margin-right: 12px;
        > img {
          width: 40px;
          height: 40px;
        }
      }
      .m_msgBox {
        background-color: #e0e0e0;
        border-radius: 15px;
        padding: 6px 10px;
        width: 76%;
        .msg_txt {
          font-size: 14px;
        }
        .msg_neiron {
          background-color: #fff;
          border-radius: 10px;
          display: flex;
          margin: 10px 0 4px;
          padding: 6px 6px;
          align-items: center;
          .m_n_pic {
            width: 112px;
            height: 63px;
            background-color: #000;
          }
          .m_n_txt {
            margin-left: 10px;
            font-size: 12px;
          }
        }
      }
    }
  }
}
</style>