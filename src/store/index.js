import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  // 同步操作在mutations里面修改
  mutations: {},
  // 异步操作在actions里面修改
  actions: {},
  // 类似于计算属性
  getters: {},
  modules: {},
});
