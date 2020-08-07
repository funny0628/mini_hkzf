export function gettoken(){
  return wx.getStorageSync('HKZFTOOKEN')
}
export function settoken(value){
   wx.setStorageSync('HKZFTOOKEN',value)
}
export function removetoken(value){
   wx.removeStorageSync('HKZFTOOKEN')
}
export function istoken(){
  if(gettoken()){
    return true
  }else{
    return false
  }
}