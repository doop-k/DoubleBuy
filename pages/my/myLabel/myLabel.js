// pages/my/myLabel/myLabel.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    labelText: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
    var openid = wx.getStorageSync("openid");
    var userInfo = wx.getStorageSync("userInfo");
    var signature = userInfo.signature;
    that.setData({
      signature: signature,
      userInfo: userInfo,
      openid: openid
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
   * 用户点击保存个性签名
   */
  changeSignature: function() {
    var that = this;
    var url = app.globalData.g_url;
    var signature = that.data.signature;
    console.log(signature)
    var userInfo = that.data.userInfo;
    userInfo.signature = signature;
    wx.setStorage({
      key: 'userInfo',
      data: userInfo,
    });
    wx.request({
      method: 'POST',
      url: url + '/postSignature?schoolCode=schoolCode&openid=' + that.data.openid + '&signature=' + signature,
      success(res) {
        console.log(res);
        if (res.data.resCode == 200) {
          wx.showToast({
            title: '个性签名更新成功',
          })
          wx.navigateBack();
        }
      }
    })
  },

  /**
   * 用户输入个性签名
   */
  changeTextarea: function(event) {
    console.log(event);
    var text = event.detail.value;
    this.setData({
      signature: text
    })

  }



})