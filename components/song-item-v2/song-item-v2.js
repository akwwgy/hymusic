// components/song-item-v2/song-item-v2.js
import playerStore from "../../store/playerStore"
Component({
  properties: {
    itemData: {
      type: Object,
      value: {}
    },
    index: {
      type: Number,
      value: -1
    }
  },
  methods: {
    onSongItemTap() {
      const id = this.properties.itemData.id
      wx.navigateTo({
        url: '/pages/music-player/music-player?id=' + id,
      })
      playerStore.dispatch("playMusicWithSongId", id)
    }
  }
})
