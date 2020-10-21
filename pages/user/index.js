// pages/user/index.js
Page({
  data:{
    userinfo: {},
    collectNums: 0
  },
  
  onShow() {
    const userInfo = wx.getStorageSync('userinfo')
    const collect = wx.getStorageSync('collect')||[]
    this.setData({
      userinfo: userInfo,
      collectNums:collect.length
    })
  }
 
})