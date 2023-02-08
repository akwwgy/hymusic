// pages/main-music/main-music.js
import {getMusicBanner,getSongMenuList} from "../../services/music"
import recommendStore from "../../store/recommendStore"
import rankingStore from "../../store/rankingStore"
import querySelect from "../../utils/query_select"
import throttle from "../../utils/throttle"

const querySelectThrottle = throttle(querySelect)
//拿到app
const app = getApp()

Page({
  data:{
    searchValue:"",
    banners:[],
    bannerHeight:150,
    screenWidth:375,

    recommendSongs:[],

    //歌单数据
    hotMenuList:[],
    recMenuList:[],

    //巅峰帮数据
    isRankingData: false,
    rankingInfos:{}
  },
  onLoad(){
   this.fetchMusicBanner()
  //  this.fetchRecommendSongs()
   this.fetchHotSongMenuList()

   recommendStore.onState("recommendSongInfo", this.handleRecommendSongs)
   //发起action
  recommendStore.dispatch("fetchRecommendSongsAction")
  
  rankingStore.onState("newRanking", this.handleNewRanking)
  rankingStore.onState("originRanking", this.handleOriginRanking)
  rankingStore.onState("upRanking", this.handleUpRanking)
  rankingStore.dispatch("fetchRankingDataAction")

  //获取屏幕尺寸
  this.setData({screenWidth:app.globalData.screenWidth})
 
  },
  async fetchMusicBanner(){
    const res = await getMusicBanner()
    this.setData({banners:res.banners})
  },
  // async fetchRecommendSongs(){
  //   const res = await getPlaylistDetail(3778678)
  //   const playlist = res.playlist
  //   const recommendSongs = playlist.tracks.slice(0,6)
  //   this.setData({recommendSongs:recommendSongs})
  // },

  // 获取热门歌单
  async fetchHotSongMenuList(){
    getSongMenuList().then(res=>{
      this.setData({hotMenuList:res.playlists})
    })
    getSongMenuList("华语").then(res=>{
      this.setData({recMenuList:res.playlists})
    })
  },

  //界面的事件监听方法
  onSearchClick(){
    wx.navigateTo({
      url: '/pages/detail-search/detail-search',
    })
  },
  onBannerImageLoad(event){
    //获取image组件高度
  //  const query = wx.createSelectorQuery()
  //  //拿到所选组件的矩形框
  //  query.select(".banner-image").boundingClientRect()
  //  query.exec(res=>{
  //    this.setData({bannerHeight:res[0].height})
  //  })
  querySelectThrottle(".banner-image").then(res=>{
    //要使用节流，不需要执行八次，执行一次就行了
    this.setData({bannerHeight:res[0].height})
  })
  },
  onRecommendMoreClick(){
    wx.navigateTo({
      url: '/pages/detail-song/detail-song'
    })
  },
    // ====================== 从Store中获取数据 ======================
    handleRecommendSongs(value) {
      if (!value.tracks) return
      this.setData({ recommendSongs: value.tracks.slice(0, 6) })
    },
    handleNewRanking(value) {
      // console.log("新歌榜:", value);
      if (!value.name) return
      this.setData({ isRankingData: true })
      const newRankingInfos = { ...this.data.rankingInfos, newRanking: value }
      this.setData({ rankingInfos: newRankingInfos })
    },
    handleOriginRanking(value) {
      // console.log("原创榜:", value);
      if (!value.name) return
      this.setData({ isRankingData: true })
      const newRankingInfos = { ...this.data.rankingInfos, originRanking: value }
      this.setData({ rankingInfos: newRankingInfos })
    },
    handleUpRanking(value) {
      // console.log("飙升榜:", value);
      if (!value.name) return
      this.setData({ isRankingData: true })
      const newRankingInfos = { ...this.data.rankingInfos, upRanking: value }
      this.setData({ rankingInfos: newRankingInfos })
    },

    onUnload() {
      recommendStore.offState("recommendSongs", this.handleRecommendSongs)

    rankingStore.offState("newRanking", this.handleNewRanking)
    rankingStore.offState("originRanking", this.handleOriginRanking)
    rankingStore.offState("upRanking", this.handleUpRanking)

    }
})
