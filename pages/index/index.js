//index.js
//获取城市名字
import {getcityname} from '../../utils/city.js'
//获取应用实例
const app = getApp()

Page({
  data: {
    //图片基地址
    daseUrl: '',
    //轮播图列表
    imagelist: [],
    //租房小组
    grouplist: [],
    //最新资讯
    newslist: [],
    //城市名字
    cityname: '',
    arealist: [{
        clas: 'iconfont icon-icon-home',
        text: "整租"
      },
      {
        clas: 'iconfont icon-yunxuhezu',
        text: "合租"
      },
      {
        clas: 'iconfont icon-ditu',
        text: "地图找房"
      },
      {
        clas: 'iconfont icon-chuzu',
        text: "去出租"
      },
    ],
    //地图数据

  },
  onLoad: function (options) {
    this.setData({
      baseUrl: wx.$baseurl
    })
    this.getswiper();
    this.getgroup();
    this.getnews();
    this.setData({
      cityname:getcityname()
    })
  },

  //请求轮播图数据
  async getswiper() {
    wx.$showToast()
    let {
      data
    } = await wx.$http({
      url: '/home/swiper',
      method: 'GET',
    })
    if (data.status === 200 && data.description === '请求成功') {
      this.setData({
        imagelist: data.body
      })
      wx.$hideToast()
    }
  },
  //请求租房小组数据
  async getgroup() {
    wx.$showToast()
    let {
      data
    } = await wx.$http({
      url: '/home/groups',
      method: 'GET',
    })
    if (data.status === 200 && data.description === '请求成功') {
      this.setData({
        grouplist: data.body
      })
      wx.$hideToast()
    }
  },
  //请求最新资讯数据
  async getnews() {
    wx.$showToast()
    let {
      data
    } = await wx.$http({
      url: '/home/news',
      method: 'GET',
    })
    if (data.status === 200 && data.description === '请求成功') {
      this.setData({
        newslist: data.body
      })
      wx.$hideToast()
    }
  },
})