// pages/main-music/main-music.js
import {gegetMusicBannert, getMusicBanner} from '../../services/music'
import querySelect from "../../utils/query_select"
import throttle from "../../utils/throttle"

const querySelectThrottle = throttle(querySelect)

Page({
  data:{
    searchValue:"",
    banners:[],
    bannerHeight:150
  },
  onLoad(){
   this.fetchMusicBanner()
  },
  async fetchMusicBanner(){
    const res = await getMusicBanner()
    this.setData({banners:res.banners})
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
    console.log(111);
  }
})