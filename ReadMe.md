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

## 4.插槽

name对应slot

vue用template

```html
<view class="status" style="height: {{statusHeight}}px;"></view>

<view class="nav-bar">
  <view class="left" bindtap="onLeftTap">
    <view class="slot"><slot name="left"></slot></view>
    <view class="default"><van-icon class="icon" name="arrow-left" /></view>
  </view>
  <view class="center">
    <view class="slot"><slot name="center"></slot></view>
    <view class="default">
      <view class="title">{{title}}</view>
    </view>
  </view>
  <view class="right"></view>
</view>
```

```html
<nav-bar bind:leftclick="onBackTap">
  <view slot="center" class="tab">
    <view class="{{currentPage === 0 ? 'active': ''}}">歌曲</view>
    <view class="divider">|</view>
    <view class="{{currentPage === 1 ? 'active': ''}}">歌词</view>
  </view>
</nav-bar>
```

你想使用多个插槽必须在组件的js中定义

```json
 options: {
    multipleSlots: true
  },
```

小程序没有插槽默认内容设置

所以只能定义css样式来控制

```css
.slot:empty + .default {
  display: block;
}
```

```html
  <view class="left" bindtap="onLeftTap">
    <view class="slot"><slot name="left"></slot></view>
    <view class="default">
      <van-icon class="icon" name="arrow-left" />
    </view>
  </view>
```

