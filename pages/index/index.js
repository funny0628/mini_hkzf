//index.js
import {getcityname} from '../../utils/city.js'
//获取应用实例
const app = getApp()
// 引用百度地图微信小程序JSAPI模块 
let bmap = require('../../libs/bmap-wx.js');
let local = ''
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
  //事件处理函
  getcityname() {
    var BMap = new bmap.BMapWX({
      ak: 'x6QfgHjg6kdB0trGeIdu67Chzwxl2adT'
    });

    let success = (data) => {
      this.setData({
        cityname: data.currentWeather[0].currentCity
      })
      
    }
    let fail = function (data) {
      console.log(data);
    }
    BMap.weather({
      location: local,
      success: success,
      fail: fail
    })
  },

  onLoad: function (options) {
    this.setData({
      baseUrl: wx.$baseurl
    })
    this.getswiper();
    this.getgroup();
    this.getnews();
    //获取当前位置的经纬度
    // this.getLocation()
    this.setData({
      cityname:getcityname()
    })
  },

  //获取当前的的位置
  getLocation() {
    let that = this
    wx.getLocation({
      type: 'wgs84',
      success(res) {
        local = res.longitude + ',' + res.latitude
        //由当前位置的经纬度获取城市名字
        // that.getcityname()
      }
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