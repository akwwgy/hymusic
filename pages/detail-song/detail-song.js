// pages/detail-song/detail-song.js
import recommendStore from "../../store/recommendStore"
import rankingStore from "../../store/rankingStore"
import {getPlaylistDetail} from "../../services/music"
import playerStore from "../../store/playerStore"
Page({
  data:{
    type: "ranking",
    key: "newRanking",

    id: "",

    songInfo: {}
  },
  onLoad(options){
    //options是跳转时类似vue路由里面的东西 可以拿到跳转时的参数
    //1.确定获取数据的类型
    //type：ranking->榜单数据
    //type: recommend->推荐数据
    const type = options.type
  // this.data.type = type
    this.setData({ type })

   //获取store里面的榜单数据
   if(type==="ranking"){
    const key = options.key
    this.data.key = key
    rankingStore.onState(key,this.handleRanking)
   }else if (type === "recommend") {
    recommendStore.onState("recommendSongInfo", this.handleRanking)
   } else if (type === "menu") {
    const id = options.id
    this.data.id = id
    this.fetchMenuSongInfo()
   }
  },

  async fetchMenuSongInfo() {
    const res = await getPlaylistDetail(this.data.id)
    this.setData({ songInfo: res.playlist })
  },
  //事件监听=============
  onSongItemTap(){
    playerStore.onState("playSongList",this.data.songInfo.tracks)
  },
  //共享数据======================
  handleRanking(value){
    this.setData({songInfo:value})
  },
  onUnload(){
    if (this.data.type === "ranking") {
      rankingStore.offState(this.data.key, this.handleRanking)
    }else if (this.data.type === "recommend") {
      recommendStore.onState("recommendSongInfo", this.handleRanking)
    }
}
})