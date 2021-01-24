import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isLoading: false,
    isPlayMusicPage: false,
    isPopup: false,
    isShareSheet: false,
    // 歌单详情中的收藏者列表弹出层的显示隐藏
    isSubPopup: false,
  },
  mutations: {
    showLoading(state) {
      state.isLoading = true;
    },
    hiddenLoading(state) {
      state.isLoading = false;
    },
    showisPlayMusicPage(state) {
      state.isPlayMusicPage = true;
    },
    hiddenisPlayMusicPage(state) {
      state.isPlayMusicPage = false;
    },
    showPopup(state) {
      state.isPopup = true;
    },
    hiddenPopup(state) {
      state.isPopup = false;
    },
    showShareSheet(state) {
      state.isShareSheet = true;
    },
    hiddenShareSheet(state) {
      state.isShareSheet = false;
    },
    showSubPopup(state) {
      state.isSubPopup = true;
    },
    hiddenSubPopup(state) {
      state.isSubPopup = false;
    },
  },
  actions: {},
  getters: {},
  modules: {},
});
