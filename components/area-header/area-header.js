// pages/area-header/area-header.js
Component({
  properties:{
    title:{
      type:String,
      value:"默认标题"
    },
    hasMore:{
      type:Boolean,
      value:true
    }
  },
  methods:{
    onMoreTap(){
      //子组件点击事件传递到父组件
      this.triggerEvent("moreclick")
    }
  }
})