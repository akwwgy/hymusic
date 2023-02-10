// pages/music-player/music-player.js
import {getSongDetail,getSongLyric} from "../../services/player"
Page({
  data: {
    id:0,
    currentSong: {},
    lycString:""
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    const id = options.id
    this.setData({id})

    // 歌曲请求
    getSongDetail(id).then(res => {
      const currentSong = res.songs[0]
      this.setData({ currentSong })
      this.setData({ durationTime: currentSong.dt })
    })
    getSongLyric(id).then(res => {
      this.setData({lycString:res.lrc.lyric})
    })
  },
  onUnload() {

  },
})