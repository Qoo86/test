import { request } from "./req.js";

// 根据id查询歌曲url
export function _getSongUrlsById(id) {
  return request({
    url: "/song/url",
    params: {
      id: id,
    },
  }).catch((err) => err.response);
}

/* 
  由于/playlist/detail接口返回的歌曲信息不完整
  但歌曲id是完整的 因此用歌曲id再次请求/song/detail获取歌曲详情 
*/
export function _getPlayListDetialBySongsId(ids) {
  return request({
    method: "post",
    url: `/song/detail`,
    params: {
      ids: ids,
    },
  }).catch((err) => err.response);
}

// 根据id获取歌词
export function _getSongWordById(id) {
  return request({
    url: "/lyric",
    params: {
      id: id,
    },
  }).catch((err) => err.response);
}
