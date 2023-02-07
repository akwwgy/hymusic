import {hyRequest} from './index'
export function getMusicBanner(type=0){
  return hyRequest.get({
    url:"/banner",
    data:{
      type
    }
  })
}