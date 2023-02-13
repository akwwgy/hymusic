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

## 5.歌曲的获取和解析

```js
    getSongLyric(id).then(res => {
      const lyricString = res.lrc.lyric
      const lyricInfos = parseLyric(lyricString)
      this.setData({ lyricInfos })
      console.log(this.data.lyricInfos);
    })
```

```js
//ES6中，新增了for-of遍历方法。它被设计用来遍历各种类数组集合，
//for-in循环是为了遍历对象而设计的

// 正则(regular)表达式(expression): 字符串匹配利器

// [00:58.65]
const timeRegExp = /\[(\d{2}):(\d{2})\.(\d{2,3})\]/

export function parseLyric(lyricString) {
  const lyricStrings = lyricString.split("\n")

  const lyricInfos = []
  for (const lineString of lyricStrings) {
    // [00:58.65]他们说 要缝好你的伤 没有人爱小丑
    const timeResult = timeRegExp.exec(lineString)
    if (!timeResult) continue
    // 1.获取时间
    const minute = timeResult[1] * 60 * 1000
    const second = timeResult[2] * 1000
    const millsecondTime = timeResult[3]
    const millsecond = millsecondTime.length === 2 ? millsecondTime * 10: millsecondTime * 1
    const time = minute + second + millsecond

    // 2.获取歌词文
    const text = lineString.replace(timeRegExp, "")
    lyricInfos.push({ time, text })
  }

  return lyricInfos
}
```

## 6.歌词的页面距离

```html
 <view 
          class="item {{index === currentLyricIndex ? 'active': ''}}"
          style="padding-top: {{index === 0 ? (contentHeight/2-80): 0}}px; padding-bottom: {{ index === (lyricInfos.length - 1) ? (contentHeight/2+80): 0 }}px;"
        >
          {{item.text}}
</view>
```

```js
scroll-top="{{lyricScrollTop}}"

// 改变scrollTop
console.log(this.data.currentLyricText);
this.setData({ lyricScrollTop: index * 35 })
```

7。传递参数

```html
data-item

event

event.currentTarget.dataset.item
```

