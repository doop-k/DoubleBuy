// pages/my/myNickname/myNickname.js
var app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    nickname:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var userInfo=wx.getStorageSync("userInfo");
    var openid=wx.getStorageSync("openid");
    this.setData({
      openid: openid,
      nickname:userInfo.nickname,
      userInfo: userInfo
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
   * 用户输入昵称
   */
  inputNickname:function(event){
    var text=event.detail.value;
    this.setData({
      nickname:text
    })
  },

  /**
   * 用户点击保存
   */
  changeNickname:function(){
    var that=this;
    var url = app.globalData.g_url;
    var userInfo=that.data.userInfo;
    wx.showLoading({
      title: '更改中···',
    })
    wx.request({
      method:"POST",
      url: url + '/postNickname?schoolCode=schoolCode&openid=' + that.data.openid + '&nickname=' + that.data.nickname,
      success(res){

        if(res.data.resCode==200){
          userInfo.nickname=that.data.nickname;
          wx.setStorageSync("userInfo", userInfo);
          wx.hideLoading();
          wx.showToast({
            title: '已更改',
            icon:'none'
          })
          wx.navigateBack();
        }
      }
    })
  }
})