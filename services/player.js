import {hyRequest} from './index'

export function getSongDetail(ids) {
  return hyRequest.get({
    url: "/song/detail",
    data: {
      ids
    }
  })
}

//歌词
export function getSongLyric(id) {
  return hyRequest.get({
    url: "/lyric",
    data: {
      id
    }
  })
}