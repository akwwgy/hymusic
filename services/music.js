import {hyRequest} from './index'
export function getMusicBanner(type=0){
  return hyRequest.get({
    url:"/banner",
    data:{
      type
    }
  })
}
export function getPlaylistDetail(id){
  return hyRequest.get({
    url:"/playlist/detail",
    data:{
      id
    }
  })
}