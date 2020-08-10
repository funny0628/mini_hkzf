// //index.js
// const dayjs = require('./miniprogram_npm/dayjs/index')
// console.log(dayjs());

//获取城市名字
import {
  getcityname
} from '../../utils/city.js'
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
    //城市信息
    cityinfo: {},
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
    this.setData({
      cityname: getcityname().label
    })
    this.getswiper();
    this.getgroup();
    this.getnews();
<<<<<<< HEAD
  },
  //跳转到城市列表页面
  tocitylist(query){
    let searchvalue = query.currentTarget.dataset.serchnme
    wx.navigateTo({
      url:`/pages/citylist/index?value=${searchvalue}`,
    })
  },

=======
    this.getcityvalue()
    this.setData({
      cityname: getcityname()
    })
  },
  //由城市名获取城市信息
  async getcityvalue() {
    //bug来源于,复制的/area/info,源文本内部有不知名的字符
    let {
      data
    } = await wx.$http({
      url: "/area/info",
      method: 'GET',
      data: {
        name: getcityname()
      }
    })
    if (data.status === 200 && data.description === '请求成功') {
      this.setData({
        cityinfo: data.body
      })
    }
  },
>>>>>>> 5a22ba8cea00536e108bd2efab2ae1e25a7c7aa5
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
      url: `/home/groups/?area=${this.data.cityname}`,
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
      url: `/home/news?area=${this.data.cityname}`,
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