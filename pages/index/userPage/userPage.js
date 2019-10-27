// pages/index/userPage/userPage.js
var app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo:null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var url = app.globalData.g_url;
    var openid=options.openid;
    var that=this;
    wx.request({
      url: url+'/userPage?schoolCode=schooCode&openid='+openid,
      success(res){
        if(res.data.resCode==200){
          var userInfo=res.data.userInfo;
          that.setData({
            userInfo: userInfo
          })
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
   * 点击别人资料页的背景图片
   */
  previewBgImg:function(event){
    var url=event.target.dataset.bgurl;
    wx.previewImage({
      urls: [url],
    })
  },
  
  /**
   * 点击别人资料页的头像
   */
  previewAvatar:function(event){
    var url = event.target.dataset.avatarurl;
    wx.previewImage({
      urls: [url],
    })
  },
  /**
   * 点击对方正在出售的物品选项卡
   */
  previewhisSelling:function(event){
    console.log(event);
    var openid = event.currentTarget.dataset.openid;
    wx.navigateTo({
      url: './hisSelling/hisSelling?openid='+openid,
    })
  }
})