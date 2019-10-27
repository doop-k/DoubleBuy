var app = getApp();
var util = require('../../../utils/util.js');
// pages/index/detailInfo/detailInfo.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

    productInfo: null,
    opList: {},
    showOpFlag: false,
    start: 0,
    count: 10,
    updateFlag: false,
    leaveMsgValue: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var url = app.globalData.g_url;
    var pid = options.pid;
    var openid = wx.getStorageSync("openid");
    var that = this;
    var collFlag = false;
    var start = that.data.start;
    var count = that.data.count;
    that.setData({
      collFlag: collFlag,
      pid: pid
    })
    wx.request({
      url: url + '/detailProduct?schoolCode=schoolCode&pid=' + pid,
      success(res) {
        if (res.data.resCode == 200) {
          that.processData(res.data.productInfo);
        }
      }
    });
    wx.request({
      url: url + '/collection?schoolCode=schoolCode&openid=' + openid + '&pid=' + pid,
      success(res) {
        if (res.data.resCode == 200) {
          collFlag = res.data.collFlag;
        }
        that.setData({
          collFlag: collFlag
        })
      }
    });
    
    that.requestLeaveMsg();

    var opList = ['复制文本', '回复', '举报'];
    this.setData({
      pid: pid,
      opList: opList
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
   * 用户自定义函数专区
   */


  /**
   * 用户长按评论
   */
  showOperation: function(event) {
    var that=this;
    var url = app.globalData.g_url;
    var text = event.currentTarget.dataset.text;
    var openid = event.currentTarget.dataset.openid;
    var lid = event.currentTarget.dataset.lid;
    var mopenid = wx.getStorageSync("openid");
    var productInfo = that.data.productInfo;
    productInfo.leaveMsgCount = productInfo.leaveMsgCount - 1;
    var list = ['复制文本', '举报'];
    if (openid == mopenid) {
      list = ['复制文本', '举报', '删除'];
    }

    wx.showActionSheet({
      itemList: list,
      success(res) {
        switch (res.tapIndex) {
          case 0:
              wx.setClipboardData({
                data: text,
              })
            break;
          case 1:
          
            break;
          case 2:
            wx.request({
              method: 'post',
              url: url + '/deleteLeaveMsg?schoolCode=schoolCode?pid='+pid+'&lid='+lid,
              success(res){
                if(res.data.resCode=200){
                  that.setData({
                    productInfo: productInfo,
                    start:0
                  })
                  that.requestLeaveMsg();
                } 
              }
            })
            break;
        }
      }
    })


  },
  /**
   * 用户长按评论之后点击空白处
   */
  hideOperation: function(text) {
    this.setData({
      showOpFlag: false
    })
  },
  /**
   * 用户点击长按评论出现的子选项
   */
  operationThis: function(event) {

    var text = event.target.dataset.name;
    console.log(text);
  },

  /**
   * 用户点击右上角更多按钮
   */
  showMoreMenu: function(event) {
    var that = this;
    var mopenid = wx.getStorageSync("openid");
    var openid = event.currentTarget.dataset.openid;
    if (mopenid != null) {
      var collFlag = this.data.collFlag;
      var list = ['收藏', '查看联系方式', '举报']
      if (collFlag) {
        list = ['取消收藏', '查看联系方式', '举报']
      }

      wx.showActionSheet({
        itemList: list,
        success(res) {
          console.log(res)
          switch (res.tapIndex) {
            case 0:
              that.collProduct();
              break;
            case 1:
              wx.navigateTo({
                url: './contact/contact?openid=' + openid,
              })
              break;
            case 2:
              wx.navigateTo({
                url: '../prosecution/prosecution?pid=' + that.data.pid,
              })
              break;
          }
        }
      })

    } else {
      wx.showModal({
        title: '请登录',
        content: '您还没登录呢！点我跳转登录哦 ~ ^_^',
        confirmText: '立即登录',
        cancelText: '暂不登录',
        success(res) {
          if (res.confirm) {
            wx.switchTab({
              url: '../../my/my',
            })
          }
        }
      })
    }

  },
  requestLeaveMsg:function(){
    var that=this;
    var url = app.globalData.g_url;
    var pid=that.data.pid;
    var start=that.data.start;
    var count=that.data.count;
      wx.request({
      url: url + '/productMsg?schoolCode=schoolCode&pid=' + pid + '&start=' + start + '&count=' + count,
      success(res) {
        if (res.data.resCode == 200) {
          that.processLeave(res.data.leaveMsg);
        }

      }
    })
  },
  collProduct: function() {
    var that = this;
    var url = app.globalData.g_url;
    var openid = wx.getStorageSync("openid");
    var pid = this.data.pid;
    var collFlag = that.data.collFlag;
    wx.request({
      method: 'post',
      url: url + '/collProduct?schoolCode=schoolCode&openid=' + openid + '&pid=' + pid + '&collFlag=' + collFlag,
      success(res) {
        if (res.data.resCode == 200) {
          that.setData({
            collFlag: !collFlag
          })
        }
      }
    })
  },

  /**
   * 点击商品详情页的头像栏
   */
  openUserPage: function(event) {
    var openid = event.currentTarget.dataset.openid;
    var mopenid = wx.getStorageSync("openid");
    if (mopenid == openid) {
      wx.switchTab({
        url: '/pages/my/my',
      })
    } else {
      wx.navigateTo({
        url: '../userPage/userPage?openid=' + openid,
      })
    }

  },

  /**
   * 用户点击详情页产品的图片
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
   * 清洗数据，过滤数据
   */
  processData: function(odata) {

    var that = this;

    odata.time = util.timeConversionString(odata.time);
    odata.context = odata.context.split('[hc]').join('\n');
    console.log(odata.imgUrl);
    if (odata.imgUrl) {
      odata.imgUrl = [];
    }


    console.log(odata)
    this.setData({
      productInfo: odata,
    })
  },
  updateData: function(event) {
    var url = app.globalData.g_url;
    var that = this;
    var start = that.data.start;
    var count = that.data.count;
    var pid = that.data.pid;
    that.setData({
      updateFlag: true
    })
    wx.request({
      url: url + '/productMsg?schoolCode=schoolCode&pid=' + pid + '&start=' + start + '&count=' + count,
      success(res) {
        if (res.data.resCode == 200) {
          that.processLeave(res.data.leaveMsg);
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
  processLeave: function(odata) {
    var that = this;
    for (var i = 0; i < odata.length; i++) {
      odata[i].time = util.timeConversionString(odata[i].time);
      odata[i].msg = odata[i].msg.split('[hc]').join('\n');
    }
    if (that.data.updateFlag) {
      odata = that.data.leaveMsg.concat(odata);
    }
    var start = that.data.start + 10;
    this.setData({
      leaveMsg: odata,
      start: start,
      updateFlag: false
    })
  },
  leaveMsginput: function(event) {
    this.setData({
      leaveMsgValue: event.detail.value
    })
  },
  leaveMsg: function() {
    var that = this;
    var url = app.globalData.g_url;
    var msg = that.data.leaveMsgValue
    var pid = that.data.pid;
    var openid = wx.getStorageSync("openid");
    var productInfo = that.data.productInfo;
    productInfo.leaveMsgCount = productInfo.leaveMsgCount + 1;
 
    if (mopenid != null) {
    if (msg != "") {
      msg = msg.split('\n').join('[hc]');
      wx.request({
        method: 'post',
        url: url + '/leaveMsg?schoolCode=schoolCode&pid=' + pid + '&openid=' + openid + '&msg=' + msg,
        success(res) {
          if (res.data.resCode == 200) {

            that.setData({
              productInfo: productInfo,
              start: 0,
              leaveMsgValue:''

            })
            that.requestLeaveMsg();
          }
        }
      })
    } else {
      wx.showToast({
        title: '请输入留言内容',
        icon: "none"
      })
    }
    } else {
      wx.showModal({
        title: '未登录',
        content: '您还木有登陆哎 ^_^  ~~~',
        confirmText:'立即登陆',
        cancelText:'暂不登陆',
        success(res){
          if(res.confirm){
            wx.switchTab({
              url: '/pages/my/my',
            })
          }
        }
      })
    }
  }
 
})