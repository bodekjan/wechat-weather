//index.js
//获取应用实例
var app = getApp()
var bmap = require('../../utils/bmap-wx.js');
var common = require('../../utils/common.js'); 
Page({
  onShareAppMessage: function () {
    return {
      title: '微信天气',
      desc: '',
      path: '/pages/index/index'
    }
  },
  data: {
    motto: 'Hello World',
    gogoleft:0,
    gogoright:-50,
    gogostatus:false,
    pagesize:100,
    pagetop:0,
    userInfo: {},
    animationW: {},
    animationM: {},
    theWeather: {
      weatherIcon: "/images/w/w01",
      date: 22,
      currentCity: "南京",
      weatherDesc: "多云",
      pm25: 67,
      temperature: "24 ~ 14",
      wind: " 无风 "
    },
    cityMenus: [],
    today : "2017-05-01",
    wall:"/images/clearday"
  },
  setMenuNatural: function(){
    var that=this;
    var animationW = wx.createAnimation({
      duration: 100
    });
    var animationM = wx.createAnimation({
      duration: 100
    });
    var menuStatus=false;
    if(this.data.gogostatus){
      animationW.width("100%").height("100vh").top("0vh").left("0%").step();
      animationM.right("40%").step();
      menuStatus=false;
    }else{
      animationW.width("90%").height("90vh").top("5vh").left("-40%").step();
      animationM.right("0%").step();
      menuStatus=true;
    }
    this.setData({
      animationW:animationW.export(),
      animationM:animationM.export(),
      gogostatus:menuStatus,
      cityMenus: common.getCityList()
    })
  },
  setAdd: function(){
    wx.navigateTo({
      url: '../add/add'
    })
  },
  donateTab: function(e){
    wx.navigateTo({
      url: '../payment/donate'
    })
  },
  menuTab: function(e){
    wx.showLoading();
    var itemId=e.target.id;
    var that=this;
    if(itemId==""){
      console.log("id 空着");
      return;
    }
    var theCity=common.getCity()[itemId];
    var BMap = new bmap.BMapWX({ 
        ak: '你的key' 
    });
    var fail = function(data) { 
        console.log(data);
        wx.hideLoading();
        return null;
    }; 
    var success = function(data) {
        wx.hideLoading();
        var weatherData = data.currentWeather[0]; 
        weatherData.fullData = data.originalData.results[0];
        console.log(weatherData);
        var date = weatherData.date;
        date = date.substring(date.indexOf("：")+1,date.indexOf("℃"))
        weatherData.date = date
        var days=weatherData.fullData.weather_data;
        for (var i=0;i<days.length;i++){
          if(i==0){
            var todayText=days[i].date;
            todayText = todayText.substring(todayText.indexOf("周"),todayText.indexOf("周")+2);
            days[i].date = todayText;
          }
          days[i].weather= common.iconChanger(days[i].weather).icon; 
        }
        weatherData.fullData.weather_data = days;
        weatherData.xy=theCity.xy;
        var tudayStatus=common.iconChanger(weatherData.weatherDesc);
        weatherData.weatherIcon=tudayStatus.icon;
        weatherData.weatherDesc=tudayStatus.status;
        weatherData.wind=common.windHelper(weatherData.wind);
        weatherData.pmpm=common.pmText(weatherData.pm25);
        that.setData({
          theWeather: weatherData,
          today: common.getToday(),
          wall: tudayStatus.wall
        });
        that.setMenuNatural();
    } 
    // 发起weather请求 
    BMap.weather({
        location: theCity.xy,
        fail: fail, 
        success: success 
    });
  },
  onPullDownRefresh: function(){
    console.log("wakakakak"); // scroll上无效
    // wx.stopPullDownRefresh 是他的停止函数
  },
  onLoad: function (options) {
    wx.showLoading();
    common.init();
    var that = this;
    if(options.name==null){
      var BMap = new bmap.BMapWX({ 
            ak: 'UnMeMmKOwfL2jYjTq1VU3TAgCIsqb6Gf' 
        });
      var fail = function(data) { 
            console.log(data);
            wx.hideLoading();
        }; 
      console.log("正在添加新城市");
      //调用应用实例的方法获取全局数据
      var success = function(data) {
          wx.hideLoading();
          var weatherData = data.currentWeather[0]; 
          weatherData.fullData = data.originalData.results[0];
          
          var date = weatherData.date;
          date = date.substring(date.indexOf("：")+1,date.indexOf("℃"));
          weatherData.date = date;
          var days=weatherData.fullData.weather_data;
          for (var i=0;i<days.length;i++){
            if(i==0){
              var todayText=days[i].date;
              todayText = todayText.substring(todayText.indexOf("周"),todayText.indexOf("周")+2);
              days[i].date = todayText;
            }
            days[i].weather= common.iconChanger(days[i].weather).icon; 
          }
          weatherData.fullData.weather_data = days;
          weatherData.xy=options.location;
          var tudayStatus=common.iconChanger(weatherData.weatherDesc);
          weatherData.weatherIcon=tudayStatus.icon;
          weatherData.weatherDesc=tudayStatus.status;
          weatherData.wind=common.windHelper(weatherData.wind);
          weatherData.pmpm=common.pmText(weatherData.pm25);
          
          common.refreshCity(weatherData);
          that.setData({
            theWeather: weatherData,
            today: common.getToday(),
            wall: tudayStatus.wall
          });
        } 
        // 发起weather请求 
        BMap.weather({
          fail: fail, 
          success: success 
      });
    }else{
      var BMap = new bmap.BMapWX({ 
            ak: 'UnMeMmKOwfL2jYjTq1VU3TAgCIsqb6Gf' 
        });
      var fail = function(data) { 
            console.log(data);
            wx.hideLoading();
        }; 
      console.log("正在添加新城市");
      //调用应用实例的方法获取全局数据
      var success = function(data) {
          wx.hideLoading();
          var weatherData = data.currentWeather[0]; 
          weatherData.fullData = data.originalData.results[0];
          //console.log(weatherData);
          var date = weatherData.date;
          date = date.substring(date.indexOf("：")+1,date.indexOf("℃"));
          weatherData.date = date;
          var days=weatherData.fullData.weather_data;
          for (var i=0;i<days.length;i++){
            if(i==0){
              var todayText=days[i].date;
              todayText = todayText.substring(todayText.indexOf("周"),todayText.indexOf("周")+2);
              days[i].date = todayText;
            }
            days[i].weather= common.iconChanger(days[i].weather).icon; 
          }
          weatherData.fullData.weather_data = days;
          weatherData.xy=options.location;
          var tudayStatus=common.iconChanger(weatherData.weatherDesc);
          weatherData.weatherIcon=tudayStatus.icon;
          weatherData.weatherDesc=tudayStatus.status;
          weatherData.wind=common.windHelper(weatherData.wind);
          weatherData.pmpm=common.pmText(weatherData.pm25);
          common.addCity(weatherData);
          that.setData({
            theWeather: weatherData,
            today: common.getToday(),
            wall: tudayStatus.wall
          });
        } 
        // 发起weather请求 
        BMap.weather({
          location: options.location,
          fail: fail, 
          success: success 
      });
    }
  }
})
