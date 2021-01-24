<template>
  <div id="search">
    <van-search
      v-model="searchValue"
      shape="round"
      background="#ec4141"
      :placeholder="defultWorldObj.showKeyword"
      @input="SearchMsgBoxAndContentShow"
      @search="toSearchInput(searchValue)"
      show-action
    >
      <template #action>
        <div>
          <span @click="toSearchInput(searchValue)">搜索</span>
          <span @click="goBack" style="padding-left: 10px">返回</span>
        </div>
      </template>
    </van-search>

    <router-view :key="$route.fullPath" @backKeyw="getBackKeyw" />

    <transition name="van-slide-left">
      <div v-show="isShowMsgBox" class="searchMsgBox" style="z-index: 999">
        <div
          class="toSearch searchMsg van-ellipsis"
          @click="toSuggestSearch(searchValue)"
        >
          搜索"{{ searchValue }}"
        </div>
        <div
          class="searchMsg"
          v-for="(item, index) in searchSuggest"
          :key="index"
          @click="toSuggestSearch(item.keyword)"
        >
          <span class="my-icon msg_sicon">&#xe604;</span> {{ item.keyword }}
        </div>
      </div>
    </transition>
    <!-- 底部导航栏 -->
    <tab-bar></tab-bar>
  </div>
</template>

<script>
import TabBar from "../components/TabBar.vue";
import { _getDefaultHotKey, _getSuggestSearch } from "../network/search";
export default {
  data() {
    return {
      searchValue: "",
      defultWorldObj: {},
      searchSuggest: [],
      isShowMsgBox: false,
    };
  },
  components: {
    TabBar,
  },
  methods: {
    // 取到搜索的关键词
    getBackKeyw(data) {
      this.searchValue = data;
    },
    // 搜索核心方法
    toSearch(val) {
      this.$router.push({
        path: "/search/searchConent",
        query: { val },
      });
    },
    // 表单直接搜索
    toSearchInput(searchValue) {
      if (searchValue == "") {
        this.toSearch(this.defultWorldObj.realkeyword);
      } else {
        this.toSearch(searchValue);
      }
      this.isShowMsgBox = false;
    },
    // 推荐搜索选项卡搜索
    toSuggestSearch(v) {
      this.toSearchInput(v);
    },
    // 返回按钮
    goBack() {
      this.$router.go(-1);
      this.searchValue = "";
    },
    // 控制搜索框的显示和隐藏
    SearchMsgBoxAndContentShow() {
      if (this.searchValue != "") {
        this.isShowMsgBox = true;
      } else {
        this.isShowMsgBox = false;
      }
      // 获取推荐搜索
      this.getSuggestSearch(this.searchValue);
    },
    // 获取热搜默认关键词
    async getDefultSearchWorld() {
      let { data } = await _getDefaultHotKey();
      if (data.code === 200) this.defultWorldObj = data.data;
    },
    // 获取推荐搜索内容
    async getSuggestSearch(keywords) {
      if (keywords == "") return;
      let { data } = await _getSuggestSearch(keywords);
      if (data.code === 200) this.searchSuggest = data.result.allMatch;
    },
  },

  mounted() {
    this.getDefultSearchWorld();
  },
};
</script>

<style lang="less" scoped>
#search {
  .searchMsgBox {
    position: absolute;
    width: 96%;
    max-height: 500px;
    overflow: scroll;
    background-color: #fff;
    box-shadow: 0 0 5px #888;
    top: 60px;
    left: 50%;
    transform: translate(-50%, 0);
    font-size: 14px;
    padding: 4px 10px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    cursor: pointer;
    .searchMsg {
      color: #888;
      height: 36px;
      line-height: 36px;

      .msg_sicon {
        padding-right: 10px;
      }
    }
    .toSearch {
      color: #5383e8;
    }
  }
}
</style>