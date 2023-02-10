// pages/music-player/music-player.js
import { throttle } from "underscore"
import {parseLyric} from "../../utils/parse-lyric"
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
    lyricInfos:[],
    currentLyricIndex: 0,
    currentLyricText: "",

    playModeIndex: 0,
    playModeName: "order",
    //歌曲暂停开始按钮
    isPlaying: false,
    //滑动条
    sliderValue: 0,
    // 是否滑动条在改变
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
      const lyricString = res.lrc.lyric
      const lyricInfos = parseLyric(lyricString)
      this.setData({ lyricInfos })
      console.log(this.data.lyricInfos);
    })

    // 3.播放当前的歌曲
    
    audioContext.src = `https://music.163.com/song/media/outer/url?id=${id}.mp3`
    audioContext.autoplay = false

    //4.监听播放的进度
    const throttleUpdateProgress = throttle(this.updateProgress,500,{leading:false})
    audioContext.onTimeUpdate(()=>{
      if (!this.data.isSliderChanging) {
        //调用节流函数，
        throttleUpdateProgress()
      }
    })
    //   audioContext.onWaiting(() => {
    //     audioContext.pause()
    // })

    // audioContext.onCanplay(() => {
    //     audioContext.play()
    // })  
  },
  updateProgress(){
    //拿到实时时间  audioContext.currentTime
    this.setData({currentTime:audioContext.currentTime*1000})

    //修改滑动条
    const sliderValue = this.data.currentTime / this.data.durationTime * 100
    this.setData({ sliderValue })
  },
  //滑动条点击改变
  onSliderChange(event) {
    //获取点击滑块位置对应的值
    const value = event.detail.value
    //计算要播放的位置时间
    const currentTime = value / 100 * this.data.durationTime
    //audioText里面的currentTime不能直接修改，只能读，所以只能利用seek方法
    audioContext.seek(currentTime / 1000)
    this.setData({ sliderValue: value, currentTime, isSliderChanging: false })
  },
  //滑动条滑动改变
  onSliderChanging(event) {
    const value = event.detail.value

    // 计算当前时间
    const currentTime = value / 100 * this.data.durationTime
    this.setData({ currentTime: currentTime, isSliderChanging: true })
  },
  //轮播图监听
  onSwiperChange(event) {
    const currentPage = event.detail.current
    this.setData({ currentPage })
  },
  onBackTap() {
    wx.navigateBack()
  },
  //歌曲的控制
  onPlayOrPauseTap() {
    if (!audioContext.paused) {
      audioContext.pause()
      this.setData({isPlaying:false})
    } else {
      audioContext.play()
      this.setData({isPlaying:true})
    }
  },
  onUnload() {

  },
})