import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

// 分钟访问重复路由时报错
//获取原型对象上的push函数
const originalPush = VueRouter.prototype.push;
//修改原型对象中的push方法
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch((err) => err);
};

const routes = [
  { path: "/", redirect: "/index" },
  // 首页
  { path: "/index", component: () => import("@/views/Index.vue") },
  // 登录
  { path: "/login", component: () => import("@/views/Login.vue") },
  // 关于
  { path: "/about", component: () => import("@/views/About.vue") },
  // 搜索
  {
    path: "/search",
    component: () => import("@/views/Search.vue"),
    redirect: "/search/hotSearch",
    children: [
      {
        path: "/search/hotSearch",
        component: () => import("@/views/HotSearch.vue"),
      },
      {
        path: "/search/searchConent",
        component: () => import("@/views/SearchConent.vue"),
      },
    ],
  },
  // 每日推荐
  {
    path: "/dailyrecom",
    meta: { isUserLogin: true },
    component: () => import("@/views/Dailyrecom.vue"),
  },
  // 我的消息
  {
    path: "/myMessage",
    meta: { isUserLogin: true },
    component: () => import("@/views/MyMessage.vue"),
  },
  // 私信详情
  {
    path: "/userMsgDetail",
    meta: { isUserLogin: true },
    component: () => import("@/views/DetailViews/UserMsgDetail.vue"),
  },
  // 个人中心
  {
    path: "/user",
    meta: { isUserLogin: true },
    component: () => import("@/views/User.vue"),
  },
  // 歌单详情
  {
    path: "/playlistdetail",
    component: () => import("@/views/DetailViews/PlayListDetail.vue"),
  },
];

const router = new VueRouter({
  routes,
  mode: "history",
});

export default router;
