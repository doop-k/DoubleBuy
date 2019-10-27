// pages/index/newsDetail/newsDetail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    newsCode:''
  }, 

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var newsCode = '<view style="display: flex; flex-direction: column; padding: 10rpx 40rpx 40rpx 40rpx; " ><text style=" font-size: 38rpx; width: 100 %; text-align: center; ">爱到最深是寂寞</text><text style="margin-top: 40rpx; font-size: 28rpx; color: rgb(82, 75, 75); ">时光荏苒，岁月如梭。转瞬间我也奔四了，时光太快太快，快的我还没有贪恋够这青春年华，就开始想陀螺一样旋转!\n2013——2019，七个年头了，我的爱恋仿佛还在昨天，那温暖还在甜在心尖，如梦如幻。就像最近的梦境，我都分不清哪是梦那是现实的，如若是梦好想永远都不醒，让梦境里的你和我们的宝贝永远都在我身边。\n来沈阳市，也许我是最后一回了。往后的余生恐怕我在也没有勇气踏上这个城市，只有梦里她才能再次出线。踏上这片土地第一步的那一刻，我就知道，我们是两个世界的人，就像轨道永远永远都不能到一起，只能奔着一个方向行驶。\n这次看到的你，很美很美，是我心里面的女神，而我!只能做你那鲜花下的沃土。宝贝，谢谢你的爱，谢谢你这七个年头对我的包容、忍耐、无微不至的爱。我知道!你也不想这样，可是现实毕竟是现实，我们无法左右现实。\n以后余生，陪伴我更多的也就是我们的回忆，我们的回忆是美好的，快乐甜蜜的。我会好好珍藏，会偶尔拿出来晒晒。对你痴情我永远无怨无悔，我心依然只属于你一个人，永远永远。\n你每天黎明忙到黄昏，依然能找到时间看看我，这让我十分感激。我们的情感就像歌里唱那样，《爱的越深越寂寞》，这句话我深有体会，你忙的不可开交的时候，只有我自己，我很寂寞很孤独，那种孤独蚀骨噬心。我望着无边的人群，看不到熟悉的身影，看着茫茫网络没有你的痕迹，我就像大海里的一片枯叶，随着浪花拍打，像一叶孤舟随着海水推向任何方向。\n宝贝，没了你，我就像没了方向。偌大的世界，又剩孤独的我一个，我不会像以前那样在把酒言欢，只能沉默中咀嚼着回忆过活。\n明天，我就要离开沈阳了，宝贝，你要保重，虽然忙碌也要注意休息，每天太累就不要醒太早和我说话了，好好睡觉。每天晚上，依然给我晚安，因为，每时每刻，我都在想你……</text><image mode="aspectFit" catchtap="previewImg" data-imgUrl=" https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1564568448689&di=0bf78dd9bc1d669279d2ccf2bbacfd7e&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201412%2F08%2F20141208134630_RfHKF.jpeg  " src="{https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1564568448689&di=0bf78dd9bc1d669279d2ccf2bbacfd7e&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201412%2F08%2F20141208134630_RfHKF.jpeg" /></view>';
    this.setData({
      newsCode: newsCode
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
   * 用户点击图片
   */
  previewImg:function(event){
    console.log(event);
    var imgUrl=event.target.dataset.imgurl;
    wx.previewImage({
      urls: [imgUrl],
    })
  }
})