// components/song-item-v1/song-item-v1.js
Component({
  properties:{
    itemData:{
      type:Object,
      value:{}
    }
  },
  //切记是methods,不是method
  methods:{
    onSongItemTap(){ 
      const id = this.properties.itemData.id
      // console.log(id);
      wx.navigateTo({
        url: '/pages/music-player/music-player?id=' + id,
      })
    }
  }
})