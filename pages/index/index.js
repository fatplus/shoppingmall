//Page Object
import { request } from '../../request/index.js'

Page({
  data: {
    swiperList: [],
    catesList: [],
    floorList: []
  },
  //options(Object)
  onLoad: function(options) {
    this.getSwiperList()
    this.getCateList()
    this.getFloorList()
  },
  getSwiperList() {
    request({url:'/home/swiperdata'})
    .then(res => {
      this.setData({
        swiperList: res
      })
    })
  },
  getCateList() {
    request({url:'/home/catitems'})
    .then(res => {
      this.setData({
        catesList: res
      })
    })
  },
  getFloorList() {
    request({url:'/home/floordata'})
    .then(res => {
      this.setData({
        floorList: res
      })
    })
  }
});
  