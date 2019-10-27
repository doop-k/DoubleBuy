// pages/my/setting/contact/contact.js
var app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    qqNumber:null,
    wechatNumber:null,
    telephoneNumber:null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var url = app.globalData.g_url;
    var that=this;
    var openid=options.openid;
      wx.request({
        url: url+'/getContact?schoolCode=schoolCode&openid='+openid,
        success(res){
          console.log(res);
          if(res.data.resCode==200){
            var contact=res.data.contact;
            that.setData({
              qqNumber: contact.qqNumber,
              wechatNumber: contact.wechatNumber,
              telephoneNumber:contact.telephoneNumber
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
  copyData:function(event){
    var value =event.target.dataset.value;
    wx.setClipboardData({
      data: value,
      success(res){
        wx.showToast({
          title: '已复制',
          icon:"none"
        })
      }
    })
  }
  
})