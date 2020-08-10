// 封装自己的小程序请求方法
import {gettoken,removetoken} from '../../utils/token.js'
import {BASEURL} from '../../utils/city.js'
export function Request(options) {
  console.log("-----fasongqingqiu ");
  
  let baseURl = options.baseurl || BASEURL
  return new Promise((reslove, reject) => {
    wx.request({
      url: baseURl + options.url,
      method: options.method,
      data: options.data,
      method: options.method,
      header: {
        'Authorization': gettoken()
      },
      dataType: 'json',
      success(res) {
        // console.log(res);
        if(res.data.status === 400 ){
          wx.$hideToast()
          wx.showToast({
            title: res.data.description,
            icon:'none',
            duration: 2000
          })
          return removetoken()
        }
        reslove(res)
      },
      fail(error) {
        console.log(error);
        reject(error)
      }
    })
  })
}

//请求前的toast提示
export function showtoast() {
  wx.showToast({
    title: '请求中...',
    icon: 'loading',
  })
}
//请求后的toast提示
export function hidetoast() {
  wx.hideToast()
}