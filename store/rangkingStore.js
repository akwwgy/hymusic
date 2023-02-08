import { HYEventStore } from "hy-event-store"
import {getPlaylistDetail} from "../services/music"
const rankingsIds = {
  newRanking:3779629,
  originRanking:2884035,
  upRanking:19723756
}

const rankingStore = new HYEventStore({
  state:{
    newRanking:{},
    originRanking:{},
    upRanking:{}
  },
  actions:{
    fetchRankingDataAction(){
      for(const id of rankingsIds){
        getPlaylistDetail(id).then(res=>{
          console.log(res);
          
        })
      }
    }
  }
})

export default rangkingStore