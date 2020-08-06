// 封装自己的小程序请求方法
export function Request (options){
  let baseURl = options.baseurl || 'http://huangjiangjun.top:8088'
  return new Promise((reslove,reject)=>{
    wx.request({
      url: baseURl + options.url,
      method: options.method,
      data: options.data,
      method: options.method,
      dataType:'json',
      success(res){
        reslove(res)
      },
      fail(error){
        reject(error)
      }
    })
  })
}

//请求前的toast提示
export function showtoast(){
  wx.showToast({
    title: '请求中...',
  })
}
//请求后的toast提示
export function hidetoast(){
  wx.hideToast()
}