// pages/index/index.js
var app = getApp();
var util = require("../../utils/util.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    swiperImg: null,
    hot_text: "最热",
    new_text: "最新",
    productImg: [],
    start: 0,
    count: 10,
    onload: false,
    updateFlag: false

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
      url: url + '/productType?schoolCode=schoolCode&type=double&start=' + start + '&count=' + count,
      success(res) {
        if (res.data.resCode == 200) {
          that.processData(res.data.product);
          that.setData({
            onload: true
          })
        }
      }
    })



    that.setData({
      swiperImg: [
        'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1565784360048&di=afab343852c5727c4e14ea7919706cac&imgtype=0&src=http%3A%2F%2Fdianying.fm%2Fmedia%2Fbackdrops%2FxB%2FxBKGJQsAIeweesB79KC89FpBrVr.jpg',
        'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1565784350243&di=22de6decf424ea2e48cb0dde4b5a998c&imgtype=0&src=http%3A%2F%2Fwx2.sinaimg.cn%2Fcrop.0.0.722.406.1000%2F005KwSoogy1fiabihfgj1j30p00bagn7.jpg',
        'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1565784309476&di=ddcb4b6dc664a26520da88203bcc97d2&imgtype=0&src=http%3A%2F%2Fimg4q.duitang.com%2Fuploads%2Fitem%2F201505%2F19%2F20150519134629_kWsyT.jpeg',
        'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1565784286022&di=96d5134bb0d49709971122534ead30fd&imgtype=0&src=http%3A%2F%2Fuploads.5068.com%2Fallimg%2F160406%2F65-1604061H132.jpg'

      ]
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
    var start = that.data.start;
    var count = that.data.count;
    if (start == 0) {

      if (that.data.onload) {
        wx.request({
          url: url + '/productType?schoolCode=schoolCode&type=double&start=' + start + '&count=' + count,
          success(res) {
            if (res.data.resCode == 200) {
              that.processData(res.data.product);
            }
          }
        })
      }
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
    var url = app.globalData.g_url;
    wx.startPullDownRefresh();
    var that = this;
    that.setData({
      start:0
    })
    var start = that.data.start;
    var count = that.data.count;
    wx.request({
      url: url + '/productType?schoolCode=schoolCode&type=double&start=' + start + '&count=' + count,
      success(res) {
        if (res.data.resCode == 200) {
          that.processData(res.data.product);
          that.setData({
            onload: true
          })
        }
      }
    })
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
   * 清洗数据，过滤数据
   */
  processData: function(odata) {
    var that = this;
    for (var i = 0; i < odata.length; i++) {
      odata[i].time = util.timeConversionString(odata[i].time);
      odata[i].context = odata[i].context.split('[hc]').join('\n');
    }

    if (that.data.updateFlag) {
      odata = that.data.product.concat(odata);

    }
    console.log(odata);
    var start = that.data.start + 10;
    this.setData({
      product: odata,
      start: start,
      updateFlag: false
    })
  },
  updateData: function(event) {
    var url = app.globalData.g_url;
    var that = this;
    var start = that.data.start;
    var count = that.data.count;
    that.setData({
      updateFlag: true
    })
    wx.request({
      url: url + '/productType?schoolCode=schoolCode&type=double&start=' + start + '&count=' + count,
      success(res) {
        if (res.data.resCode == 200) {
          that.processData(res.data.product);
        } else if (res.data.resCode = 404) {
          that.setData({
            updateFlag: false
          })
          wx.showToast({
            title: '客官，到底了~~~~',
            icon: "none"
          })
        }


      }
    })
  },

  /**
   * 用户点击商品详情 跳转
   */
  openDetailPage: function(event) {
    var pid = event.currentTarget.dataset.pid;
    wx.navigateTo({
      url: './detailInfo/detailInfo?pid=' + pid,
    })
  },
  /**
   * 用户点击物品类型详情页 跳转
   */
  openThisType: function(event) {
    console.log(event);
    var sellType = event.currentTarget.dataset.selltype;
    wx.navigateTo({
      url: './detailType/detailType?sellType=' + sellType,
    })
  },


  /**
   * 点击主页的头像栏
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
        url: './userPage/userPage?openid=' + openid,
      })
    }

  },

  /**
   * 用户点击主页产品的图片
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
   * 用户点击swiper组件中的新闻
   */
  seeNews: function(event) {
    // wx.navigateTo({
    //   url: './newsDetail/newsDetail',
    // })
  }
})