 [接口地址](http://huangjiangjun.top:8088)
 [示例代码地址](http://huangjiangjun.top/hkzf)
 * 原示例代码是使用react实现的,本项目是使用原生小程序重构的
 > npm i 

 > npm run dev

 > 用户名和密码暂时都是使用的test2

 > 逆地址解析:
 根据当前未知的经纬度获取当前位置所处的城市,
 根据微信小程序的接口获取当前的位置的经纬度,再利用百度地图的地址解析有经纬度获取城市

 处理城市列表数据
 先把所有的城市名称添加一个拼音的字段,然后按照数组的排序.进行分类在组成对应的字母的对象,将所有的数据进行合并,在一次性遍历,这右边的定位的字母也可以通过字母的名字进行锚点定位

 点击每一个子城市名字,修改当前选择的本地的城市,并且在跳转到index页面,点击锚点,是的左边的城市列表对应的字母显示在最上面
 