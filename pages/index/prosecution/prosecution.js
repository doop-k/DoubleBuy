// pages/index/prosecution/prosecution.js
var app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    index: 0,
    array: null,
    pid:12,
    context:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var pid=options.pid;
   var array= ['暴力、淫秽色情', '虚假信息', '侵害他人名誉、隐私和其他合法权益的'
     , '互联网相关法律法规禁止的内容', ];
    this.setData({
      array: array,
      pid:pid
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
  bindPickerChange:function(event){
    var index=event.detail.value;
    console.log(index);
    this.setData({
      index: index
    })
  },
  inputContext:function(event){
    var context=event.detail.value;
    this.setData({
      context:context
    })
    console.log(context);

  },
  btnOk:function(){
    var that=this;
    var url = app.globalData.g_url;
    var pid=that.data.pid;
    var index=that.data.index;
    var array=that.data.array;
    var type=array[index];
    var context=that.data.context;
    wx.showModal({
      title: '物品编号 '+pid,
      content: '确定举报该物品"' + type+'"吗？ ',
      success(res){
        if(res.confirm){
          wx.request({
            url: url+'/prosecution?schoolCode=schoolCode&pid='+pid+'&openid='+openid+'&type='+type+'&context='+context,
            success(res){
              if(res.data.resCode==200){
                wx.showToast({
                  title: '我们会很快的处理您的检举， 谢谢！',
                  icon: "none"
                })
                wx.navigateBack();
              }
            }
          })


         
         
        }
      }
    })
  }
})