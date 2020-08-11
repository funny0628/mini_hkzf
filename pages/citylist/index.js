// pages/citylist/index.js
//获取城市名字
import {
  getcityname,
  setname
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
    //当前选择的城市
    currentcity: '',
    //组装好的全部城市数据
    allcitylist: [],
    //初始下标
    activeindex: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      currentcity: options.serchnme || getcityname().label
    })
    this.gethotlist()
    this.getyijilist();
  },
  /**
   * 获取热门城市
   */
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
  /**
   * 获取城市列表
   */
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
  /**
   * 组装全部list数据
   */
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
      let key = oldlist[i]
      allcityobj[key] = []
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
    Object.keys(allcityobj).map((item, index) => {
      citylistarr.push({
        title: item,
        children: allcityobj[item]
      })
    })
    this.setData({
      allcitylist: citylistarr
    })
  },

  /**
   * 点击左边每一个城市
   */
  async clickItem(query) {
    let currentKey = query.currentTarget.dataset.key
    let currentvalue = query.currentTarget.dataset.value
    console.log(currentvalue);
    
    //修改本地的城市
    let {
      data
    } = await wx.$http({
      url: '/area/info',
      method: 'GET',
      data: {
        name: currentvalue
      }
    })
    console.log(data);
    
    if (data.status === 200 && data.description === '请求成功') {
      setname(data.body)
      this.gobackindex()
    }
  },

  /**
   * 点击右边城市首字母导引
   */
  clicktabfirst(option) {
    /**
     * 1.点击了首字母之后,修改当前的背景色,
     * 2.修改左侧当前项在最顶部
     */
    let firstvalue = option.currentTarget.dataset.value
    let firstKey = option.currentTarget.dataset.key
    this.setData({
      activeindex: firstKey
    })
    if(firstvalue !== '#' && firstvalue !== '热'){
      wx.pageScrollTo({
          selector: `#${firstvalue}`,
        duration:300,
       })
    }else{
      wx.pageScrollTo({
        scrollTop:0
      })
    }
  },
  /**
   * 返回上一页
   */
  gobackindex(){
    wx.navigateBack({
      delta: 1
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