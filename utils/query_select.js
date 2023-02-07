export default function querySelect(selector){
  //想把最里面的数据给到别的地方，就用promise！！！！
  return new Promise(reslove=>{
   const query = wx.createSelectorQuery()
   //拿到所选组件的矩形框
   query.select(selector).boundingClientRect()
   query.exec(res=>{
    reslove(res)
   })
  })
}