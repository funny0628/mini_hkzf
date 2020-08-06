//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    //图片基地址
    daseUrl:'',
    //轮播图列表
    imagelist: [],
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
    ]
  },
  //事件处理函

  onLoad: function (options) {
    this.setData({
      baseUrl:wx.$baseurl
    })
    this.getdata()
  },

  async getdata() {
    wx.$showToast()
    let {data} = await wx.$http({
      url: '/home/swiper',
      method: 'GET',
    })
    if(data.status === 200 && data.description === '请求成功'){
      this.setData({
        imagelist:data.body
      })
      wx.$hideToast()
    }
  },
})