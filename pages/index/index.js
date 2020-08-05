//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    imagelist:[
      "https://m.360buyimg.com/mobilecms/s700x280_jfs/t1/36958/34/5025/100639/5cbf5749Ee9fcfb22/b6eb36331095813a.jpg!cr_1125x445_0_171!q70.jpg.dpg",
      "https://m.360buyimg.com/mobilecms/s700x280_jfs/t1/127375/9/8675/121651/5f27c527E65259e41/c3650862f52aef90.jpg!cr_1125x445_0_171!q70.jpg.dpg",
      "https://m.360buyimg.com/mobilecms/s700x280_jfs/t1/102832/35/18843/149795/5e97d041E8a5306e5/10a671dd9cc18c80.jpg!cr_1125x445_0_171!q70.jpg.dpg"
    ],
    arealist:[
      {
        clas:'iconfont icon-icon-home',
        text:"整租"
      },
      {
        clas:'iconfont icon-yunxuhezu',
        text:"合租"
      },
      {
        clas:'iconfont icon-ditu',
        text:"地图找房"
      },
      {
        clas:'iconfont icon-chuzu',
        text:"去出租"
      },
    ]
  },
  //事件处理函数
  
  onLoad: function () {
  },
})
