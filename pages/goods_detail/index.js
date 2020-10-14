import { request } from "../../request/index.js";
import regeneratorRuntime from '../../lib/runtime/runtime';

Page({
  data: {
    goodsObj: {}
  },

  GoodsInfo: {},

  onLoad: function (options) {
    const { goods_id } = options
    this.getGoodsDetail(goods_id)
  },

  async getGoodsDetail(goods_id) {
    const goodsObj = await request({url:'/goods/detail', data: {goods_id}})
    this.GoodsInfo = goodsObj
    this.setData({
      goodsObj: {
        goods_name: goodsObj.goods_name,
        goods_price: goodsObj.goods_price,
        goods_introduce: goodsObj.goods_introduce.replace(/\.webp/g, '.jpg'),
        pics: goodsObj.pics
      }
    })
  },

  handlePrevewImage(e) {
    const urls = this.GoodsInfo.pics.map(x => x.pics_mid)
    const current = e.currentTarget.dataset.url
    wx.previewImage({
      urls,
      current
    })
  },

  handleCartAdd() {
    let cart = wx.getStorageSync('cart')||[]
    let index = cart.findIndex(x => x.goods_id === this.GoodsInfo.goods_id)
    if(index === -1) {
      this.GoodsInfo.num = 1
      this.GoodsInfo.checked = true
      cart.push(this.GoodsInfo)
    } else {
      cart[index].num++
    }
    wx.setStorageSync('cart', cart)

    wx.showToast({
      title: '加入购物车成功',
      icon: 'success',
      mask: true
    });
  }
})