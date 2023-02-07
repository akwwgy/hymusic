// pages/detail-song/detail-song.js
import {recommendStore} from "../../store/recommendStore"
Page({
  data:{
    songs:[]
  },
  onLoad(){
    //说明一下，当返回的时候，这个页面就不需要再监听这个页面的数据了
    recommendStore.onState("recommendSongs",this.handleRecommendSongs)
  },
  handleRecommendSongs(value){
    this.setData({songs:value})
  },
  onUnload(){
    recommendStore.offState("recommendSongs",this.handleRecommendSongs)
  }

})