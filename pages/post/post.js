// pages/post/post.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    sellType: ["请选择物品类型", "电子产品", "生活用品", "二手书籍", "其他物品"],
    btnBgColor: "",
    btnColor: "",
    btnFlag: true,
    sellTypeIndex: 0,
    isSell: false,
    isFree: false,
    typeFlag: false,
    contentText: "",
    descriptionFlag: false,
    imagesFlag: false,
    priceFlag: false,
    price: "",
    images: [],
    imgCount: ''

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

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
    wx.setNavigationBarTitle({
      title: '发布二手物品',
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
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

  /**自定义函数专区 */

  /**
   * 用户点击二手物品按钮
   */
  chooseSell: function(event) {
    var typeFlag = false
    var priceFlag = true
    console.log("chooseSell");
    this.setData({
      isSell: true,
      isFree: false
    })

    if (this.data.sellTypeIndex != 0) {
      typeFlag = true;
    }
    if (this.data.price == "") {
      priceFlag = false
    }
    this.setData({
      typeFlag: typeFlag,
      priceFlag: priceFlag
    })
    console.log(this.data.typeFlag)
    this.setButtonState();
  },

  /**
   * 用户点击免费赠送按钮
   */
  chooseFree: function() {
    console.log("chooseFree");
    this.setData({
      isSell: false,
      isFree: true,
      typeFlag: true,
      priceFlag: true
    })
    this.setButtonState();
  },


  /**
   * 用户选择二手物品类型
   */
  bindSellTypeChange: function(event) {
    var typeFlag;


    console.log("bindSellTypeChange");
    this.setData({
      sellTypeIndex: event.detail.value
    })

    if (event.detail.value == 0) {
      typeFlag = false;
    } else {
      typeFlag = true;
    }
    this.setData({
      typeFlag: typeFlag
    })
    this.setButtonState();
  },

  /**
   * 用户输入内容触发
   */
  contentInput: function(event) {
    console.log("contentInput");
    var text = event.detail.value;
    console.log(text);
    if (text != "") {
      this.setData({
        descriptionFlag: true,
        contentText:text
      })

    } else {
      this.setData({
        descriptionFlag: false
      })
    }
    this.setButtonState();
  },


  /**
   * 用户输入价格
   */
  bintPriceInput: function(event) {
    console.log("bintPriceInput");
    var price = event.detail.value;
    if (price != "") {
      this.setData({
        price: price,
        priceFlag: true
      })

    } else {
      this.setData({
        price: "",
        priceFlag: false
      })
    }
    this.setButtonState();
  },




  /**
   * 判断所有内容是否已经输入 
   * 立即发布按钮可用
   */
  setButtonState() {
    console.log("setButtonState")
    if (this.data.typeFlag & this.data.descriptionFlag & this.data.priceFlag) {
      this.setData({
        btnBgColor: "rgb(236, 105, 105)",
        btnColor: 'white',
        btnFlag: false
      })
    } else {
      this.setData({
        btnFlag: true,
        btnBgColor: "",
        btnColor: ""
      })
    }

  },

  /**
   * 用户点击立即发布按钮
   */
  sendInfo: function() {
    console.log("sendInfo")
    var that = this;
    var loginStatus = wx.getStorageSync("loginStatus");
    if (loginStatus=="1"){
      if (that.data.images.length == 0) {
        wx.showModal({
          title: '未选择图片',
          content: '附加图片可以让同学更了解你的物品。',
          confirmText: "选择图片",
          cancelText: "不要图片",
          success(res) {
            if (res.confirm) {
              that.chooseLocalImg();
            } else if (res.cancel) {
              wx.showLoading({
                title: '发布中···',
              })
              that.postProduct();
            }
          }
        })
      } else {
        wx.showLoading({
          title: '发布中···',
        })
        that.postProductImgs();
      }

    }else{
      wx.showModal({
        title: '未登录',
        content: '您还没登陆呢！点击确定登陆。',
        success(res){
          if(res.confirm){
            wx.switchTab({
              url: '../my/my',
            })
          }
        }
      })
    }
    

  },
  /**
   * 开始上传用户发布的信息
   */
  postProduct: function (stringUrl) {
    console.log("postProduct");
    var openid = wx.getStorageSync("openid");
    var url = app.globalData.g_url;
    var that = this;
    var reqUrl;
    var imgUrl = stringUrl;
    var context = that.data.contentText.split('\n').join('[hc]');
    console.log(context);
    if (that.data.isFree) {
      reqUrl = url + '/postProduct?schoolCode=schoolCode&openid=' + openid + '&context=' + context + '&type=free&imgUrl=' + imgUrl;
    } else if (that.data.isSell) {
      var price = that.data.price;
      var sellType = that.data.sellType[that.data.sellTypeIndex];
      reqUrl = url + '/postProduct?schoolCode=schoolCode&openid=' + openid + '&context=' + context + '&type=double&imgUrl=' + imgUrl + '&price=' + price + '&sellType=' + sellType;
    }
    if (stringUrl == null) {
      imgUrl = "";
    }
    console.log(imgUrl);
    wx.request({
      method: 'POST',
      url: reqUrl,
      success(res) {
        console.log(res);
        if (res.data.resCode == 200) {
          wx.hideLoading();
          wx.showToast({
            title: '发布成功，快去看看吧 ^_^ ！！！',
            icon: 'none'
          })
          that.setData({
            btnBgColor: "",
            btnColor: "",
            btnFlag: true,
            sellTypeIndex: 0,
            isSell: false,
            isFree: false,
            typeFlag: false,
            contentText: "",
            descriptionFlag: false,
            imagesFlag: false,
            priceFlag: false,
            price: "",
            images: [],
            imgCount: ''
          })
        }
      }
    })
  },
  /**
   * 上传物品描述图片
   */
  postProductImgs: function() {
    var url = app.globalData.g_url;
    var that = this;
    var images = that.data.images;
    var imgUrl = [];
    for (var i = 0; i < images.length; i++) {
      wx.uploadFile({
        url: url + '/postProductImgs',
        filePath: images[i],
        name: 'imgUrl',
        success(res) {
          imgUrl.push(res.data);
          if (imgUrl.length == images.length) {
            var stringUrl="";
        
            for (var j = 0; j < imgUrl.length - 1; j++) {
              stringUrl = stringUrl + imgUrl[j] + ',';
            }
            var sellImgs = [];
            for(var u=0;u<imgUrl.length;u++){
            if (u < 4) {
              sellImgs.push(imgUrl[u]);

             }
            }
            that.setSellImgs(sellImgs);
            stringUrl += imgUrl[imgUrl.length-1];
            that.postProduct(stringUrl);
          }

        }

      })
    }



  },
  /**
   * 设置sellImgs
   */
  setSellImgs:function(imgUrl){
    var url = app.globalData.g_url;
    var that=this;
    var openid=wx.getStorageSync("openid");
    var userInfo=wx.getStorageSync("userInfo");
    var sellImgs=userInfo.sellImgs;
    var i=0;
    if(sellImgs!=null){
      while(imgUrl.length<4){
        imgUrl.push(sellImgs[i])
        i++;
      }
    }
    userInfo.sellImgs = imgUrl;
    var stringUrl="";
    for(var i=0;i<imgUrl.length-1;i++){
      stringUrl=stringUrl+imgUrl[i]+',';
    }
    stringUrl += imgUrl[imgUrl.length-1];
    wx.request({
      method:'POST',
      url: url + '/postSellImgs?schoolCode=schoolCode&openid=' + openid + '&sellImgs=' + stringUrl,
      success(res){
        if(res.data.resCode=200){
          wx.setStorageSync("userInfo", userInfo)
          wx.switchTab({
            url: '../my/my',
          })
        }
      }
    })
  

  },

  /**
   * 用户点击图片，选择本地图片发送
   */
  chooseLocalImg: function(event) {
    console.log('chooseLocalImg')
    var that = this;
    var imgCount = 9 - that.data.images.length;

    that.setData({
      imgCount: imgCount
    });

    if (that.data.images.length < 9) {
      wx.chooseImage({
        count: that.data.imgCount,
        sizeType: ['original', 'compressed'],
        success: function(res) {
          const images = that.data.images.concat(res.tempFilePaths);
          that.setData({
            images: images
          })

        },
      })
    } else {
      wx.showToast({
        title: '图片上限了',
        icon: "none"
      })
    }

  },

  /**
   * 用户预览本地图片
   */
  previewLocalImg: function(event) {
    var that = this;
    console.log(event);
    var imgUrl = event.target.dataset.imgurl;
    console.log(imgUrl);
    wx.previewImage({
      current: imgUrl,
      urls: that.data.images,
    })

  },

  /**
   * 用户长按图片事件
   */
  operaLocalImg: function(event) {
    var that = this;
    var images = [];
    var imgUrl = event.target.dataset.imgurl;
    console.log(imgUrl);
    var images = [];
    for (var i = 0; i < that.data.images.length; i++) {
      console.log(that.data.images[i]);
      if (imgUrl != that.data.images[i]) {;
        images.push(that.data.images[i])
      };
    }
    for (var i = 0; i < images.length; i++) {
      console.log(images[i]);
    }
    var index = that.data.images.indexOf(imgUrl);
    console.log(index)
    wx.showActionSheet({
      itemList: ['删除图片'],
      success(res) {
        that.setData({
          imgCount: that.data.imgCount - 1,
          images: images
        });
      }
    })
  }

})