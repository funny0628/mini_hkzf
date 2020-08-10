// pages/citylist/index.js
import {
  getcityname,
} from '../../utils/city.js'
import pinyin from "wl-pinyin"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    maoidan: ['#', '热', 'A', 'B', 'C', 'D', 'E', 'F', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'],
    //热门城市
    hotcity: [],
    //城市列表
    yijicity: [],
    currentcity: '',
    allcitylist: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      currentcity: options.serchnme
    })
    console.log(options);
    this.gethotlist()
    this.getyijilist();
  },
  async gethotlist() {
    let {
      data
    } = await wx.$http({
      url: '/area/hot',
      method: 'GET',
    })
    if (data.status === 200 && data.description === '请求成功') {
      this.setData({
        hotcity: data.body
      })
    }
  },
  async getyijilist() {
    let {
      data
    } = await wx.$http({
      url: '/area/city',
      method: 'GET',
      data: {
        level: 1
      }
    })
    if (data.status === 200 && data.description === '请求成功') {
      this.setData({
        yijicity: data.body
      })
      this.getnewyijilist()
    }
  },
  //组装全部list数据
  getnewyijilist() {
    let newyijicity = this.data.yijicity.concat()
    //给城市添加一个拼音字段
    newyijicity.map((item) => {
      item.firstcode = pinyin.getFirstLetter(item.label)[0]
    })
    //遍历按照左右的首字母得到城市
    let allcityobj = {}
    let oldlist = this.data.maoidan
    for (let i = 0; i < oldlist.length; i++) {
      // let allcityobjitem = {
      //   title: '',
      //   children: []
      // };
      // let obj = {};
      let key = oldlist[i]
      console.log(oldlist[i]);
      allcityobj[key]  = []
      for (let j = 0; j < newyijicity.length; j++) {
        if (oldlist[i] === newyijicity[j].firstcode) {
          allcityobj[key].push(newyijicity[j].label)
      }
    }
  }
    this.data.hotcity.map((item) => {
      allcityobj['热'].push(item.label)
    })
    allcityobj['#'].push(this.data.currentcity)
    let citylistarr = []
  Object.keys(allcityobj).map((item,index)=>{
    citylistarr.push({
      title:item,
      children:allcityobj[item]
    })
  })
  console.log(citylistarr);
    this.setData({
      allcitylist: citylistarr
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