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

## 2.实现自定义导航

```json
{
  "navigationStyle": "custom",
  "navigationBarTextStyle": "white",
  "usingComponents": {
    "nav-bar": "/components/nav-bar/nav-bar"
  }
}
```

## 3.毛玻璃关键样式

```css
<image class="bg-image" mode="aspectFill" src="{{currentSong.al.picUrl}}"></image>
<view class="bg-cover"></view>


.bg-image, .bg-cover {
  position: fixed;
  left: 0;
  right: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
}
/* 在image上盖上一个bg-cover */
.bg-cover {
  background-color: rgba(0,0,0,.5);
  backdrop-filter: blur(30px);
}
```

