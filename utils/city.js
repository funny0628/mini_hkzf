// 引用百度地图微信小程序JSAPI模块 
import {Request} from '../static/request/index.js'
let bmap = require('../libs/bmap-wx.js');
let local = '';
let city = ""

function getname() {
  return wx.getStorageSync('CITY')
}

function setname(name) {
  wx.setStorageSync('CITY', name)
}

export function getcityname() {
  city = getname()
  if (!city) {
    //先拿到本地的经纬度
    wx.getLocation({
      type: 'wgs84',
      success(res) {
        local = res.longitude + ',' + res.latitude
      }
    })
    //实例化地图,地址解析
    var BMap = new bmap.BMapWX({
      ak: 'x6QfgHjg6kdB0trGeIdu67Chzwxl2adT'
    });

    let success = (data) => {
      setname(data.currentWeather[0].currentCity)
      city = data.currentWeather[0].currentCity
    }
    let fail = function (data) {
      console.log(data);
      return data
    }
    BMap.weather({
      location: local,
      success: success,
      fail: fail
    })
  }
  return city;
}