//app.js
App({
  onLaunch: function () {
    var title = this.globalData.g_apptitle;
    console.log(title);
    wx.setNavigationBarTitle({
      title:title,
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  },
  
  globalData: {
    g_apptitle: "电科院二手物品交易",
    g_schoolCode:'DKY',
    g_url:'https://www.famyun.com/inwx'
  }
})

