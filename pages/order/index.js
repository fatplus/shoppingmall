import { request } from "../../request/index.js";
import regeneratorRuntime from '../../lib/runtime/runtime';

Page({
  data: {
    orders: [],
    tabs: [
      {
        id: 0,
        value: "全部",
        isActive: true
      },
      {
        id: 1,
        value: "待付款",
        isActive: false
      },
      {
        id: 2,
        value: "待发货",
        isActive: false
      },
      {
        id: 3,
        value: "退款/退货",
        isActive: false
      }
    ]
  },

  onShow(options) {
    const token = wx.getStorageSync('token')
    if(!token){
      wx.navigateTo({
        url: '/pages/auth/index'
      });
      return;
    }

    let pages = getCurrentPages()
    let currenPage = pages[pages.length - 1]
    const {type} = currenPage.options
    this.changeTitleByIndex(type-1)
    this.getOrders(type)
  },

  async getOrders(type) {
    const res = await request({ 
      url: "/my/orders/all", 
      data: { type } 
    })
    this.setData({
      orders: res.orders.map(v => ({...v,create_time_cn:(new Date(v.create_time*1000)).toLocaleString()}))
    })
  },

  changeTitleByIndex(index) {
    // 2 修改源数组
    let { tabs } = this.data;
    tabs.forEach((v, i) => i === index ? v.isActive = true : v.isActive = false);
    // 3 赋值到data中
    this.setData({
      tabs
    })
  },
  handleTabsItemChange(e) {
    const {index} = e.detail
    this.changeTitleByIndex(index)
    this.getOrders(index+1)
  }

})