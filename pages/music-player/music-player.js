// pages/music-player/music-player.js
import {getSongDetail,getSongLyric} from "../../services/player"

const app = getApp()

//创建一个播放器
const audioContext = wx.createInnerAudioContext()

Page({
  data: {
    //状态栏高度
    statusHeight: 20,
    currentPage: 0,
    contentHeight: 555,

    id:0,
    currentSong: {},
    currentTime: 0,
    durationTime: 0,
    lycString:"",

    playModeIndex: 0,
    playModeName: "order",

    //滑动条
    sliderValue: 0,
    isSliderChanging: false,

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    const id = options.id
    this.setData({id})

     // 设备信息
     this.setData({ statusHeight: app.globalData.statusHeight })
     this.setData({ contentHeight: app.globalData.windowHeight })

    // 歌曲请求
    getSongDetail(id).then(res => {
      const currentSong = res.songs[0]
      this.setData({ currentSong })
      //设置歌曲总时间
      this.setData({ durationTime: currentSong.dt })
    })
    getSongLyric(id).then(res => {
      this.setData({lycString:res.lrc.lyric})
    })

    // 3.播放当前的歌曲
    audioContext.stop()
    audioContext.src = `https://music.163.com/song/media/outer/url?id=${id}.mp3`
    audioContext.autoplay = false

    //4.监听播放的进度
    audioContext.onTimeUpdate(()=>{
      //拿到实时时间  audioContext.currentTime
      this.setData({currentTime:audioContext.currentTime*1000})

      //修改滑动条
      const sliderValue = this.data.currentTime / this.data.durationTime * 100
      this.setData({ sliderValue })
    })
  },


  //轮播图监听
  onSwiperChange(event) {
    const currentPage = event.detail.current
    this.setData({ currentPage })
  },
  onBackTap() {
    wx.navigateBack()
  },
  onUnload() {

  },
})