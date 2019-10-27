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
    var openid=wx.getStorageSync("openid");
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
            if (contact.qqNumber == null & contact.wechatNumber == null & contact.telephoneNumber==null){
                wx.showModal({
                  title: '联系方式',
                  content: '设置联系方式供他人快速联系到你购买物品，最少必须设置一个联系方式，往后可在"设置"里进行更改',
                  showCancel:false
                })
            }
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
   * 用户输入QQ
   */
  inputQQ:function(event){
    console.log(event)
    var number=event.detail.value;
    this.setData({
      qqNumber: number
    })
  },
  /**
  * 用户输入微信号
  */
  inputWechat: function (event) {
    var number = event.detail.value;
    this.setData({
      wechatNumber: number
    })
  },
  /**
  * 用户输入电话号码
  */
  inputTel: function (event) {
    var number = event.detail.value;
    this.setData({
      telephoneNumber: number
    })
  },
  /**
   * 点击保存按钮
   */
  save:function(event){
    var that=this;
    var url = app.globalData.g_url;
    var openid=wx.getStorageSync("openid");
    var qqNumber=that.data.qqNumber;
    var wechatNumber=that.data.wechatNumber;
    var telephoneNumber=that.data.telephoneNumber;
    if (qqNumber == null & wechatNumber == null & telephoneNumber == null) {
      wx.showModal({
        title: '联系方式',
        content: '最少设置一个，设置了再来点我吧^_^',
        showCancel: false
      })
    } else if (qqNumber==""){
      qqNumber=null
    }else if(wechatNumber==""){
      wechatNumber=null
    }else if(telephoneNumber==""){
      telephoneNumber=null
    }
    
    else{
      wx.request({
        method:'post',
        url: url + '/postContact?schoolCode=schoolCode&openid=' + openid + '&qqNumber=' + qqNumber + '&wechatNumber=' + wechatNumber + '&telephoneNumber=' + telephoneNumber,
        success(res){
          if(res.data.resCode==200){
            wx.switchTab({
              url: '../../my',
            })
          }
        }
      })
    }
  }
})