// pages/login/index.js
import {
  settoken
} from '../../utils/token.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    password: '',
    username: '',
    activeindex: '1',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  //修改下标
  changeindex(options) {
    this.setData({
      activeindex: options.currentTarget.dataset.index
    })
    this.setData({
      password: '',
    })
    this.setData({
      username: '',
    })
  },
  inputdata(e) {
    if (e.currentTarget.dataset.value === 'password') {
      this.setData({
        password: e.detail.value
      })
    } else if (e.currentTarget.dataset.value === 'username') {
      this.setData({
        username: e.detail.value
      })
    }
  },
  goback() {
    wx.switchTab({
      url: '/pages/my/index',
    })
  },
  senddata() {
    if (this.data.activeindex === '1') {
      this.login()
    } else if (this.data.activeindex === '2') {
      this.register()
    }
  },
  async login() {
    wx.$showToast()
    let {
      data
    } = await wx.$http({
      url: '/user/login',
      method: 'POST',
      data: {
        username: this.data.username,
        password: this.data.password
      }
    })
    if (data.status === 200 && data.description === '账号登录成功') {
      settoken(data.body.token)
      wx.switchTab({
        url: '/pages/my/index',
      })
    }
    wx.$hideToast()
  },
  //注册
  async register() {
    wx.$showToast()
    let {
      data
    } = await wx.$http({
      url: '/user/registered',
      method: 'POST',
      data: {
        username: this.data.username,
        password: this.data.password
      }
    })
    if(data.status === 200 && data.description === '创建成功'){
      settoken(data.body.token)
      wx.switchTab({
        url: '/pages/my/index',
      })
    }
    wx.$hideToast()
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