// pages/detail-song/detail-song.js
import recommendStore from "../../store/recommendStore"
import rankingStore from "../../store/rankingStore"
Page({
  data:{
    type: "ranking",
    key: "newRanking",

    songInfo: {}
  },
  onLoad(options){
    //options是跳转时类似vue路由里面的东西 可以拿到跳转时的参数
    //1.确定获取数据的类型
    //type：ranking->榜单数据
    //type: recommend->推荐数据
    const type = options.type

   //获取store里面的榜单数据
   if(type==="ranking"){
    const key = options.key
    this.data.key = key
    rankingStore.onState(key,this.handleRanking)
   }
  },
  handleRanking(value){
    this.setData({songInfo:value})
  },
  onUnload(){
    if (this.data.type === "ranking") {
      rankingStore.offState(this.data.key, this.handleRanking)
  }
}

})