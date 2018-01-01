// pages/add/add.js
var common = require('../../utils/common.js');
var xjCitys={};
Page({
  data:{
    hotCitys:[],
    chinaCitys:[]
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
    xjCitys=common.readXJCitys();
    this.setData({
      chinaCitys:xjCitys.province
    })
  },
  hotTaped: function(e){
    var itemId=e.target.id;
    var city=xjCitys.citys[itemId];
    wx.redirectTo({
      url: '../index/index?name=' + city.cityzh+'&zh='+city.cityzh+'&location='+city.location
    })
    //common.addCity(xjCitys.citys[itemId]);
  },
  chinaTaped: function(e){
    var itemId=e.target.id;
    var city=xjCitys.province[itemId];
    wx.redirectTo({
      url: '../index/index?name=' + city.cityzh+'&zh='+city.cityzh+'&location='+city.location
    })
    //common.addCity(xjCitys.citys[itemId]);
  },
  onReady:function(){
    // 页面渲染完成
  },
  onShow:function(){
    // 页面显示
  },
  onHide:function(){
    // 页面隐藏
  },
  onUnload:function(){
    // 页面关闭
  }
})