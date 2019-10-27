// pages/my/mySelling/mySelling.js
var app = getApp();
var util = require('../../../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    product: [],
    start: 0,
    count: 10,
    updateFlag: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var url = app.globalData.g_url;
    var that = this;
    var start = that.data.start;
    var count = that.data.count;
    var openid=options.openid;
    that.setData({
      openid: openid
    })
    wx.request({
      url: url + '/getSelling?schoolCode=schoolCode&openid=' + openid + '&start=' + start + '&count=' + count,
      success(res) {
        console.log(res);
        if (res.data.resCode == 200) {
          that.processData(res.data.product);
        }

      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },


  /**
   * 自定义函数专区
   */


  /**
   * 用户点击商品详情 跳转
   */
  openDetailPage: function (event) {
    var pid=event.currentTarget.dataset.pid;
    wx.navigateTo({
      url: '/pages/index/detailInfo/detailInfo?pid='+pid,
    })
  },


  /**
   * 点击头像栏
   */
  openUserPage: function (event) {
    console.log(event);
    wx.navigateBack();
  },

  /**
   * 用户点击产品的图片
   */
  previewImg: function (event) {
    console.log(event);
    var imgs = event.target.dataset.imgs;
    var img = event.target.dataset.img;
    wx.previewImage({
      current: img,
      urls: imgs,
    })
  },

  /**
   * 用户点击右上角更多选项
   */
  operation: function (event) {
    var that = this;
    var url = app.globalData.g_url;
    var openid = wx.getStorageSync("openid");
    var userInfo = wx.getStorageSync("userInfo");
    var pid = event.target.dataset.pid;
   
  },

  /** 
   * 过滤数据
   */
  processData: function (odata) {
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
  /**
   * 去除数据
   * product 源数据
   * pid  需要去除数据的pid
   */
  clearProduct: function (pid) {
    var data = this.data.product;
    var newData = [];
    for (var i = 0; i < data.length; i++) {
      if (data[i].pid != pid) {
        newData.push(data[i])
      }
    }
    return newData;
  },

  updateData: function (event) {
    console.log('updateData')
    var that = this;
    var url = app.globalData.g_url;
    var start = that.data.start;
    var count = that.data.count;
    var openid=that.data.openid;
    that.setData({
      updateFlag: true
    })

    wx.request({
      url: url + '/getSelling?schoolCode=schoolCode&openid=' + openid + '&start=' + start + '&count=' + count,
      success(res) {
        console.log(res);
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
  }



})