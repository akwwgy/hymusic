联系方式1476351240@qq.com

# 注意点

dispathc是异步，commit是同步

## 1.数据共享

使用coderwhy编写的hy-event 库

![image-20230207164806498](D:\coderwhy\小程序\hymusic\ReadMe.assets\image-20230207164806498.png)

```shell
npm install hy-event-store
```

```js
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
```

```js
 //发起action
  recommendStore.dispatch("fetchRecommendSongsAction")
  recommendStore.onState("recommendSongs",(value)=>{
    this.setData({recommendSongs:value.slice(0,6)})
  })
```

