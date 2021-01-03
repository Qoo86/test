<template>
  <div id="ranking">
    <div class="headerBox">
      <div class="title">歌手榜</div>
      <div class="more">更多</div>
    </div>
    <van-tabs v-model="active" style="margin-top: 10px">
      <van-tab title="中国" animated>
        <div class="rankingContent">
          <div
            class="rankingItem"
            v-for="(item, index) in artistsByChina"
            :key="item.index"
          >
            <div class="rankingNum">{{ index + 1 }}</div>
            <div class="singerPic">
              <van-image fit="cover" :src="item.img1v1Url" />
            </div>
            <div class="singerInfo">
              <div class="singerName">
                {{ item.name }}
                <span style="color: #ccc" v-if="item.trans !== ''">
                  ({{ item.trans }})</span
                >
              </div>
              <div class="singerHotNum">
                <span class="my-icon">&#xe60b; </span>
                <span>{{ item.score }}</span>
              </div>
            </div>
          </div>
        </div>
      </van-tab>
      <van-tab title="欧美">
        <div class="rankingContent">
          <div
            class="rankingItem"
            v-for="(item, index) in artistsByOumei"
            :key="item.index"
          >
            <div class="rankingNum">{{ index + 1 }}</div>
            <div class="singerPic">
              <van-image fit="cover" :src="item.img1v1Url" />
            </div>
            <div class="singerInfo">
              <div class="singerName">
                {{ item.name }}
                <span style="color: #ccc" v-if="item.trans !== ''">
                  ({{ item.trans }})</span
                >
              </div>
              <div class="singerHotNum">
                <span class="my-icon">&#xe60b; </span>
                <span>{{ item.score }}</span>
              </div>
            </div>
          </div>
        </div>
      </van-tab>
      <van-tab title="韩国">
        <div class="rankingContent">
          <div
            class="rankingItem"
            v-for="(item, index) in artistsByHanguo"
            :key="item.index"
          >
            <div class="rankingNum">{{ index + 1 }}</div>
            <div class="singerPic">
              <van-image fit="cover" :src="item.img1v1Url" />
            </div>
            <div class="singerInfo">
              <div class="singerName">
                {{ item.name }}
                <span style="color: #ccc" v-if="item.trans !== ''">
                  ({{ item.trans }})</span
                >
              </div>
              <div class="singerHotNum">
                <span class="my-icon">&#xe60b; </span>
                <span>{{ item.score }}</span>
              </div>
            </div>
          </div>
        </div>
      </van-tab>
      <van-tab title="日本">
        <div class="rankingContent">
          <div
            class="rankingItem"
            v-for="(item, index) in artistsByJpan"
            :key="item.index"
          >
            <div class="rankingNum">{{ index + 1 }}</div>
            <div class="singerPic">
              <van-image fit="cover" :src="item.img1v1Url" />
            </div>
            <div class="singerInfo">
              <div class="singerName">
                {{ item.name }}
                <span style="color: #ccc" v-if="item.trans !== ''">
                  ({{ item.trans }})</span
                >
              </div>
              <div class="singerHotNum">
                <span class="my-icon">&#xe60b; </span>
                <span>{{ item.score }}</span>
              </div>
            </div>
          </div>
        </div>
      </van-tab>
    </van-tabs>
    <br />
    <br />
  </div>
</template>

<script>
export default {
  data() {
    return {
      active: 0,
      artistsByChina: [],
      artistsByOumei: [],
      artistsByHanguo: [],
      artistsByJpan: [],
    };
  },
  methods: {
    // 获得首页的排行榜数据（中国）
    async getRankingDataChina() {
      let { data } = await this.$http({
        url: `/toplist/artist?type=1`,
        withCredentials: true,
      });
      if (data.code !== 200) return;
      this.artistsByChina = [
        data.list.artists[0],
        data.list.artists[1],
        data.list.artists[2],
        data.list.artists[3],
        data.list.artists[4],
        data.list.artists[5],
        data.list.artists[6],
        data.list.artists[7],
        data.list.artists[8],
        data.list.artists[9],
      ];
    },
    // 获得首页的排行榜数据（欧美）
    async getRankingDataOM() {
      let { data } = await this.$http({
        url: `/toplist/artist?type=2`,
        withCredentials: true,
      });
      if (data.code !== 200) return;
      this.artistsByOumei = [
        data.list.artists[0],
        data.list.artists[1],
        data.list.artists[2],
        data.list.artists[3],
        data.list.artists[4],
        data.list.artists[5],
        data.list.artists[6],
        data.list.artists[7],
        data.list.artists[8],
        data.list.artists[9],
      ];
    },
    // 获得首页的排行榜数据（韩国）
    async getRankingDataHG() {
      let { data } = await this.$http({
        url: `/toplist/artist?type=3`,
        withCredentials: true,
      });
      if (data.code !== 200) return;
      this.artistsByHanguo = [
        data.list.artists[0],
        data.list.artists[1],
        data.list.artists[2],
        data.list.artists[3],
        data.list.artists[4],
        data.list.artists[5],
        data.list.artists[6],
        data.list.artists[7],
        data.list.artists[8],
        data.list.artists[9],
      ];
    },
    // 获得首页的排行榜数据（日本）
    async getRankingDataJP() {
      let { data } = await this.$http({
        url: `/toplist/artist?type=4`,
        withCredentials: true,
      });
      if (data.code !== 200) return;
      this.artistsByJpan = [
        data.list.artists[0],
        data.list.artists[1],
        data.list.artists[2],
        data.list.artists[3],
        data.list.artists[4],
        data.list.artists[5],
        data.list.artists[6],
        data.list.artists[7],
        data.list.artists[8],
        data.list.artists[9],
      ];
    },
  },
  mounted() {
    this.getRankingDataChina();
    this.getRankingDataOM();
    this.getRankingDataHG();
    this.getRankingDataJP();
  },
};
</script>

<style lang="less" scoped>
#ranking {
  padding-top: 20px;
  background-color: #fff;
  .headerBox {
    display: flex;
    align-items: center;
    .title {
      font-size: 16px;
      font-weight: bold;
      padding: 8px 0 0 6px;
      width: 83.5%;
    }
    .more {
      height: 16px;
      width: 50px;
      border: 1px solid rgba(0, 0, 0, 0.5);
      border-radius: 15px;
      font-size: 12px;
      text-align: center;
      line-height: 16px;
    }
  }
  .rankingContent {
    .rankingItem {
      display: grid;
      grid-template-columns: 14% 20% 66%;
      height: 80px;
      align-items: center;
      .singerPic {
        border-radius: 6px;
        overflow: hidden;
        width: 62px;
        height: 62px;
      }
      .rankingNum {
        text-align: center;
        font-size: 18px;
      }
      &:nth-of-type(-n + 3) {
        .rankingNum {
          color: crimson;
        }
      }
      .singerInfo {
        .singerName {
          font-size: 15px;
        }
        .singerHotNum {
          color: #b3b3b3;
          font-size: 11px;
          margin-top: 5px;
        }
      }
    }
  }
}
</style>