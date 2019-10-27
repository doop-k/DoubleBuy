var app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    loginStatus: '',
    backgroundUrl: '',
    avatarUrl: '',
    nickname: '',
    signature: '',
    sellImgs: [],
    collImgs: [],
    openid: ''

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
    var loginStatus = wx.getStorageSync("loginStatus");
    var openid = wx.getStorageSync("openid");
    if (loginStatus) {
      console.log('获取到loginStatus缓存');
      console.log(loginStatus);
      var userInfo = wx.getStorageSync("userInfo");
      that.setData({
        backgroundUrl: userInfo.backgroundUrl,
        avatarUrl: userInfo.avatarUrl,
        nickname: userInfo.nickname,
        signature: userInfo.signature,
        sellImgs: userInfo.sellImgs,
        collImgs: userInfo.collImgs,
        openid: openid,
        loginStatus: true
      })
    } else {
      console.log('没有获取到loginStatus缓存');
      this.setData({
        loginStatus: false
      })
    }

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
    var userInfo = wx.getStorageSync("userInfo");
    var that = this;
    var data = that.data;
    console.log(data);
    if (data.signature != userInfo.signature) {
      that.setData({
        signature: userInfo.signature
      })
    } else if (data.sellImgs != userInfo.sellImgs) {
      that.setData({
        sellImgs: userInfo.sellImgs
      })
    } else if (data.collImgs != userInfo.collImgs) {
      that.setData({
        collImgs: userInfo.collImgs
      })
    } else if (data.nickname != userInfo.nickname) {
      that.setData({
        nickname: userInfo.nickname
      })
    }
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
   * 用户点击设置和帮助
   */
  openSetting: function() {
    wx.navigateTo({
      url: './setting/setting',
    })
  },

  /**
   * 用户点击我正在出售的选项
   */
  previewMySelling: function() {
    wx.navigateTo({
      url: './mySelling/mySelling',
    })
  },

  /**
   * 用户点击我的收藏选项
   */
  previewMyColl: function(event) {
    wx.navigateTo({
      url: './myColl/myColl',
    })
  },
  /**
   * 用户更改个性签名
   */
  updateMyLabel: function() {
    wx.navigateTo({
      url: './myLabel/myLabel',
    })
  },
  /**
   * 用户点击资料页的背景图片
   */
  operaBgImg: function(event) {
    var photoPath;
    var that = this;
    var list = ["查看大图", "拍摄", "相册"];
    var imgUrl = event.target.dataset.bgurl;
    wx.showActionSheet({
      itemList: list,
      success(res) {
        switch (res.tapIndex) {
          case 0:
            wx.previewImage({
              urls: [imgUrl],
            })
            break;
          case 1:
            wx.chooseImage({
              count: 0,
              sourceType: ['camera'],
              success: function(res) {
                photoPath = res.tempFilePaths[0];
                wx.showLoading({
                  title: '更改中···',
                })
                that.updateIndexImgs("backgroundUrl", photoPath);
              },
            })
            break;
          case 2:
            wx.chooseImage({
              count: 0,
              sourceType: ['album'],
              success: function(res) {
                photoPath = res.tempFilePaths[0];
                wx.showLoading({
                  title: '更改中···',
                })
                that.updateIndexImgs("backgroundUrl", photoPath);
              },
            })
            break;
        }


      }
    })
  },

  /**
   * 用户点击资料页的头像
   */
  operaAvatar: function(event) {
    var photoPath;
    var that = this;
    var imgUrl = event.target.dataset.avatarurl;
    var list = ["查看大图", "拍摄", "相册"];
    wx.showActionSheet({
      itemList: list,
      success(res) {
        switch (res.tapIndex) {
          case 0:
            wx.previewImage({
              current: imgUrl,
              urls: [imgUrl]
            })
            break;
          case 1:
            wx.chooseImage({
              count: 0,
              sourceType: ['camera'],
              success: function(res) {
                photoPath = res.tempFilePaths[0];
                wx.showLoading({
                  title: '更改中···',
                })
                that.updateIndexImgs("avatarUrl", photoPath);
              },
            })
            break;
          case 2:
            wx.chooseImage({
              count: 0,
              sourceType: ['album'],
              success: function(res) {
                photoPath = res.tempFilePaths[0];
                wx.showLoading({
                  title: '更改中···',
                })
                that.updateIndexImgs("avatarUrl", photoPath);
              },
            })
            break;
        }


      }
    })
  },
  /**
   * 用户点击资料页的昵称
   */
  operaNickname: function(evnet) {
    var list = ["更改昵称"]
    wx.showActionSheet({
      itemList: list,
      success(res) {
        wx.navigateTo({
          url: './myNickname/myNickname',
        })
      }
    })
  },
  /**
   * 用户更改主页的头像或者背景图片
   */
  updateIndexImgs: function(photoType, photoPath) {
    console.log(photoType);
    console.log(photoPath);
    var url = app.globalData.g_url;
    var userInfo = wx.getStorageSync("userInfo");
    console.log(userInfo);
    var that = this;
    wx.uploadFile({
      url: url + '/postIndexImgs?openid=' + that.data.openid + '&photoType=' + photoType,
      filePath: photoPath,
      name: photoType,
      success(res) {
        console.log(res);
        if (res.statusCode == 200) {
          wx.hideLoading();
          wx.showToast({
            title: '已更改',
            icon: "none"
          })
          if (photoType == "backgroundUrl") {
            userInfo.backgroundUrl = res.data;
            that.setData({
              backgroundUrl: res.data
            })
          } else if (photoType == "avatarUrl") {
            userInfo.avatarUrl = res.data;
            that.setData({
              avatarUrl: res.data
            })
          }
          console.log(userInfo);
          wx.setStorageSync("userInfo", userInfo);
        }
      }
    })


  },
  /**
   * 用户授权登陆
   */
  userLogin: function(event) {
    var that = this;
    var url, openid, nickname, gender, avatarUrl, city, province, country, backgroundUrl, signature, contactFlag;
    var sellImgs = [];
    var collImgs = [];
    url = app.globalData.g_url;
    contactFlag = false;
    var authText = event.detail.errMsg.split(':')[1];
    console.log(authText);
    if (authText == "ok") {

      var userInfo = event.detail.userInfo;
      console.log(userInfo)
      nickname = userInfo.nickName;
      gender = userInfo.gender;
      city = userInfo.city;
      province = userInfo.province;
      country = userInfo.country;
      avatarUrl = userInfo.avatarUrl;

      wx.login({
        success(res) {
          console.log(res);
          wx.request({
            url: url + '/wx/onlogin?code=' + res.code,
            success(res) {
              console.log(res);
              var openid = res.data.openid;
              wx.request({
                url: url + '/getUserInfo?schoolCode=schoolCode&dataType=indexInfo&openid="' + openid + '"',
                success(res) {
                  console.log(res)
                  if (res.data.resCode == 200) {
                    var indexInfo = res.data.indexInfo;
                    backgroundUrl = indexInfo.backgroundUrl;
                    avatarUrl = indexInfo.avatarUrl;
                    nickname = indexInfo.nickname;
                    signature = indexInfo.signature;

                    if (indexInfo.sellImgs != null && indexInfo.sellImgs.length > 5) {
                      for (var i = 0; i < 4; i++) {
                        sellImgs.push(indexInfo.sellImgs[i]);
                      }
                    } else {
                      sellImgs = indexInfo.sellImgs;

                    }
                    if (indexInfo.collImgs != null && indexInfo.collImgs.length > 5) {
                      for (var i = 0; i < 4; i++) {
                        collImgs.push(indexInfo.collImgs[i]);
                      }
                    } else {
                      collImgs = indexInfo.collImgs;
                    }

                    if (indexInfo.qqNumber != null | indexInfo.wechatNumber != null | indexInfo.telephoneNumber != null) {
                      contactFlag = true;
                    }

                  } else {
                    wx.request({
                      method: 'POST',
                      url: url + '/postUserInfo?schoolCode=schoolCode&openid=' + openid + '&nickname=' + nickname + '&gender=' + gender + '&avatarUrl=' + avatarUrl + '&city=' + city + '&province=' + province + '&country=' + country,
                      success(res) {
                        console.log(res);
                        if (res.data.resCode == 200) {
                          backgroundUrl = avatarUrl;
                          sellImgs = [];
                          collImgs = [];
                        }
                      }
                    })
                  }
                  that.setData({
                    backgroundUrl: backgroundUrl,
                    avatarUrl: avatarUrl,
                    nickname: nickname,
                    signature: signature,
                    sellImgs: sellImgs,
                    collImgs: collImgs,
                    loginStatus: true,
                    openid: openid
                  })
                  if (!contactFlag) {
                    wx.showModal({
                      title: '跳转提醒',
                      content: '设置联系方式才能发布二手物品，我们会对你的隐私进行保护，非注册用户无法看到你的联系方式。',
                      showCancel: false,
                      success(res) {
                        if (res.confirm) {
                          wx.redirectTo({
                            url: './setting/contact/contact'
                          })
                        }
                      }
                    })
                  }
                  var sotragePack = {
                    "backgroundUrl": backgroundUrl,
                    "avatarUrl": avatarUrl,
                    "nickname": nickname,
                    "signature": signature,
                    "sellImgs": sellImgs,
                    "collImgs": collImgs
                  }

                  wx.setStorage({
                    key: 'loginStatus',
                    data: '1',
                  })
                  wx.setStorage({
                    key: 'userInfo',
                    data: sotragePack,
                  });
                  wx.setStorage({
                    key: 'openid',
                    data: openid,
                  })
                }
              })


            }
          })
        }
      })
    }

  }

})