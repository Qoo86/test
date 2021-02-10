import {
  _getLyric,
  _getPlayListDetialBySongsId,
  _getSongUrlsById,
} from "../../network/music";

export async function getSongObject(id) {
  // 获取歌曲详情
  let { data: detail } = await _getPlayListDetialBySongsId(id);
  // 获取歌词url
  let { data: url } = await _getSongUrlsById(id);
  // 獲取歌曲歌詞
  let { data: lrc } = await _getLyric(id);
  const item = {
    id: id,
    title: detail.songs[0].name,
    pic: detail.songs[0].al.picUrl,
    url: url.data[0].url,
    artist: detail.songs[0].ar,
    lrc: lrc,
  };
  return { item };
}

export async function getSongObjectList(ids) {}
