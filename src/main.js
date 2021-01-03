import Vue from "vue";
import App from "./App.vue";
import router from "./router";

import axios from "axios";

import "../src/assets/css/reset.css";
import "../src/assets/css/icon.css";

import "amfe-flexible";

import Vant from "vant";
import "vant/lib/index.css";
import "vant/lib/index.less";

import { Lazyload } from "vant";
import { Toast } from "vant";

Vue.use(Vant);
Vue.use(Toast);
Vue.use(Lazyload);

axios.defaults.baseURL = "http://localhost:3000/";
// 防止走缓存，给每次请求添加时间戳
axios.interceptors.request.use((config) => {
  if (config.method == "post") {
    config.data = {
      ...config.data,
      _t: Date.parse(new Date()) / 1000,
    };
  } else if (config.method == "get") {
    config.params = {
      _t: Date.parse(new Date()) / 1000,
      ...config.params,
    };
  }
  return config;
});

Vue.prototype.$http = axios;
Vue.prototype.$msg = Toast;

import formatDate from "./assets/formJS/formDate.js";
import formatDate2 from "./assets/formJS/formDate2.js";
import formNum from "./assets/formJS/formNum.js";
import formDuration from "./assets/formJS/formDuration.js";
import store from "./store";

// 注册全局过滤器 用于格式化时间戳
// 将日期过滤为yyyy-mmmm-dddd
Vue.filter("formatDate", formatDate);
// 将日期过滤为mm月dd日
Vue.filter("formatDate2", formatDate2);
Vue.filter("formNum", formNum);
Vue.filter("formDuration", formDuration);

Vue.config.productionTip = false;

router.beforeEach((to, from, next) => {
  const token = window.localStorage.getItem("token");
  if (to.matched.some((r) => r.meta.isUserLogin)) {
    if (token) {
      next();
    } else {
      Toast.fail("您尚未登录 请先登录");
      // next({
      //   path: "/login",
      //   param: { redirect: to.fullPath },
      // });
    }
  } else {
    next();
  }
});

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
