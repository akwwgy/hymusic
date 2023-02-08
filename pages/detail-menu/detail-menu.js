// pages/detail-menu/detail-menu.js
import {getSongMenuTag,getSongMenuList} from "../../services/music"
Page({
  data: {
    songMenus:[]
  },
  onLoad(options) {
    this.fetchAllMenuList()
  },
  //发送网络请求
  async fetchAllMenuList(){
   const tagRes = await getSongMenuTag()
   const tags = tagRes.tags

   const allPromises = []
   //根据tags获取对应歌单
   for(const tag of tags){
     const promise = getSongMenuList(tag.name)
     allPromises.push(promise)
   }
   //获取到所有数据后，调用一次setData 利用promise.all方法
   Promise.all(allPromises).then(res=>{
     this.setData({songMenus:res})
   })
  }
  
})