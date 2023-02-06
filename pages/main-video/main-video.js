// pages/main-video/main-video.js
import { getTopMV } from "../../services/video"
Page({
  data:{
    videoList:[],
    offset:0,
    hasMore:true
  },
  //发送网络请求放在onLoad里面
  onLoad(){
   this.fetchTopMV()
  },
  //发送网络请求的方法
  async fetchTopMV(){
    // getTopMV().then(res=>{
    //   // 放入数组中
    //   console.log(res);
    //   this.setData({videoList:res.data})
    // })
    // 1.获取数据
    const res = await getTopMV(this.data.offset)
    // 2.将新的数据追加到后面
    const newVideoList = [...this.data.videoList,...res.data]

    //3.设置全新数据
    this.setData({videoList:newVideoList})
    //为什么下面不用setData 因为这个数据页面不需要跟着变化
    this.data.offset = this.data.videoList.length
    this.data.hasMore = res.hasMore


  },

  //监听上拉和下拉功能
  onReachBottom(){
    //1.如果没有更多数据 就return
    if(!this.data.hasMore) return
    this.fetchTopMV()
  },
  async onPullDownRefresh(){
    //1.清空之前数据
    this.setData({videoList:[]})
    this.data.offset = 0
    this.data.hasMore = true

    //2.重新请求新的数据(await就是这个执行完,才会执行下面的语句)
    await this.fetchTopMV()
    //3.拿到数据后,停止下拉刷新(只有下拉才调用这个方法)
    wx.stopPullDownRefresh()
  },

  //==========================界面事件监听方法==================================
  onVideoItemTap(event){
    const item = event.currentTarget.dataset.item
    wx.navigateTo({
      url: `/pages/detail-video/detail-video?id=${item.id}`,
    })
  }

})