// components/menu-area/menu-area.js
const app = getApp()
Component({
  properties:{
    title:{
      type:String,
      value:"默认歌单"
    },
    menuList:{
      type:Array,
      value:[]
    }
  },
  data:{
    screenWidth:375
  },
  //在组件的生命周期里面获取高度
  lifetimes:{
    created(){
      this.setData({screenWidth:app.globalData.screenWidth})
    }
  }
})
