// pages/detail-video/detail-video.js
import {getMVUrl} from '../../services/video'
Page({
  data:{
    id:0,
    mvUrl:"",
    danmuList:[
    {
      text:"哈哈哈哈哈,真好听",
      color:"#ff0000",
      time:3
    },
    {
      text:"对呀对呀",
      color:"#ff0000",
      time:4
    },
  ]
  },
  onLoad(options){
    //1.请求id
    //组件跳转是navigateTo,里面的参数按如下方式拿到
    const id = options.id
    this.setData({id})

    //2.请求数据
    this.fetchMVUrl()
  },
  async fetchMVUrl(){
    const res=await getMVUrl(this.data.id)
    this.setData({mvUrl:res.data.url})
  }
})