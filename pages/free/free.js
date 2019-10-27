// pages/free/free.js
var app = getApp();
var util = require("../../utils/util.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    start:0,
    count:10,
    product:'',
    onload:false,
    updateFlag:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var url = app.globalData.g_url;
    var that = this;
    var start = that.data.start;
    var count = that.data.count;
    wx.request({
      url: url + '/productType?schoolCode=schoolCode&type=free&start=' + start + '&count=' + count,
      success(res) {
        if (res.data.resCode == 200) {
          that.processData(res.data.product);
          that.setData({
            onload:true
          })
        }
      }
    })
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    var url = app.globalData.g_url;
    var that = this;
    that.setData({
      start:0
    })
    var start = that.data.start;
    var count = that.data.count;
    if (that.data.onload){
      wx.request({
        url: url + '/productType?schoolCode=schoolCode&type=free&start=' + start + '&count=' + count,
        success(res) {
          if (res.data.resCode == 200) {
            that.processData(res.data.product);
          }
        }
      })
    }
   
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {
    console.log('--------------')
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },


  /**
   * 自定义函数区
   */


  /**
   * 用户点击商品详情 跳转
   */
  openDetailPage: function(event) {
    var pid = event.currentTarget.dataset.pid;
    wx.navigateTo({
      url: '../index/detailInfo/detailInfo?pid='+pid,
    })
  },


  /**
   * 点击免费页商品头像栏
   */
  openUserPage: function(event) {

    var myopenid = wx.getStorageSync("openid");
    var openid = event.currentTarget.dataset.openid;
    if (myopenid == openid) {
      wx.switchTab({
        url: '../my/my',
      })
    } else {
      wx.navigateTo({
        url: '../index/userPage/userPage?openid=' + openid,
      })
    }


      
  },
  /**
   * 用户点击免费页商品的图片
   */
  previewImg: function(event) {
    console.log(event);
    var imgs = event.target.dataset.imgs;
    var img = event.target.dataset.img;
    wx.previewImage({
      current: img,
      urls: imgs,
    })
  },
   /**
   * 清洗数据，过滤数据
   */
  processData: function (odata) {
    var that=this;
    for (var i = 0; i < odata.length; i++) {
      odata[i].time = util.timeConversionString(odata[i].time);
      odata[i].context = odata[i].context.split('[hc]').join('\n');
    }
    if(that.data.updateFlag){
      odata=that.data.product.concat(odata);

    }
    console.log(odata);
    var start=that.data.start+10;
    this.setData({
      product: odata,
      start: start,
      updateFlag: false
    })
  },
  updateData:function(event){
    var url = app.globalData.g_url;
    var that = this;
    var start = that.data.start;
    var count = that.data.count;
    that.setData({
      updateFlag:true
    })
      wx.request({
        url: url + '/productType?schoolCode=schoolCode&type=free&start=' + start + '&count=' + count,
        success(res) {
          if (res.data.resCode == 200) {
            that.processData(res.data.product);
          }else if(res.data.resCode=404){
            that.setData({
              updateFlag: false
            })
            wx.showToast({
              title: '客官，到底了~~~~',
              icon:"none"
                          })
          }
        

        }
      })
    }
  
})