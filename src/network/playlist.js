import { request } from "./req.js";

// 根据歌单id查找歌单详情
export function _getPlayListDetialById(id) {
  return request({
    url: "/playlist/detail",
    params: {
      id: id,
    },
  }).catch((err) => err.response);
}

// 收藏or取消收藏 歌单
export function _subPlayList(type, id) {
  return request({
    url: `/playlist/subscribe`,
    params: {
      t: type,
      id: id,
    },
  }).catch((err) => err.response);
}

// 根据用户id获取用户歌单信息
export function _getUserPlayListByid(id) {
  return request({
    url: `/user/playlist`,
    params: {
      uid: id,
    },
    withCredentials: true,
  });
}

export function _getplaylistDetailDynamic(id) {
  return request({
    url: "/playlist/detail/dynamic",
    params: {
      id,
    },
  }).catch((err) => err.response);
}

// 获取歌单收藏者
export function _getPlaylistSubscribers(id, limit, offset) {
  return request({
    url: "/playlist/subscribers",
    params: {
      id,
      limit,
      offset,
    },
  }).catch((err) => err.response);
}
