// pages/my/index.js
import {
  istoken,removetoken
} from '../../utils/token.js'
Page({
  isuser: istoken(),
  baseurl:'',
  /**
   * 页面的初始数据
   */
  data: {
    userinfo: {
      avatar: "",
      gender: "",
      id: -1,
      nickname: "",
      phone: null,
    },
    list: [{
        icon: 'iconfont icon-shoucang',
        text: '我的收藏'
      },
      {
        icon: 'iconfont icon-icon-home',
        text: '我要出租'
      },
      {
        icon: 'iconfont icon-jilu',
        text: '看房记录'
      },
      {
        icon: 'iconfont icon-card',
        text: '成为房主'
      },
      {
        icon: 'iconfont icon-gerenziliao',
        text: '个人资料'
      },
      {
        icon: 'iconfont icon-lianxiwomen',
        text: '联系我们'
      },
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  },

  //获取用户信息
  async getuser() {
    wx.$showToast()
    let {
      data
    } = await wx.$http({
      url: '/user',
      method: 'GET'
    })
    if (data.status === 200 && data.description === '请求用户数据成功') {
      this.setData({
        userinfo: data.body
      })
      wx.$hideToast()
    }
  },
  //退出登录
  async tologinout(){
    wx.$showToast()
    let {data} = await wx.$http({
      url:"/user/logout",
      method:'POST',
    })
    if(data.status === 200 && data.description === '退出成功'){
      removetoken()
      this.setData({
        isuser:false
      })
      wx.$hideToast()
    }
  },

  //去登陆
  tologin() {
    wx.navigateTo({
      url: '/pages/login/index',
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.setData({
      isuser:istoken(),
    })
    this.setData({
      baseurl:wx.$baseurl
    })
    if (istoken()) {
      //发送获取用户信息
      this.getuser()
    } else {
      //没有登录显示默认的
    }
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})