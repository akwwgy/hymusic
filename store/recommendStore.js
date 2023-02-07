import { HYEventStore } from "hy-event-store"
import {getPlaylistDetail} from "../services/music"
const recommendStore = new HYEventStore({
  state:{
    recommendSongs:[]
  },
  actions:{
    //ctx context
    fetchRecommendSongsAction(ctx){
      getPlaylistDetail(3778678).then(res=>{
        ctx.recommendSongs = res.playlist.tracks
      })
    }
  }
})

export {recommendStore}