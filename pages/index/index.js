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
    request({url:'https://api-hmugo-web.itheima.net/api/public/v1/home/swiperdata'})
    .then(result => {
      this.setData({
        swiperList: result.data.message
      })
    })
  },
  getCateList() {
    request({url:'https://api-hmugo-web.itheima.net/api/public/v1/home/catitems'})
    .then(result => {
      this.setData({
        catesList: result.data.message
      })
    })
  },
  getFloorList() {
    request({url:'https://api-hmugo-web.itheima.net/api/public/v1/home/floordata'})
    .then(result => {
      this.setData({
        floorList: result.data.message
      })
    })
  }
});
  