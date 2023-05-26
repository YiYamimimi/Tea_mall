// pages/home/home.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    Hei:"",          //这是swiper要动态设置的高度属性
    Hei1:"",
    nvabarData: {
      showCapsule: 1, //是否显示左上角图标   1表示显示    0表示不显示
      title: '我的', //导航栏 中间的标题
    },
    height: app.globalData.statusBarHeight + app.globalData.navBarHeight+14,
  },
  // 不同轮播图不能使用同一个高度变量，否则会相互影响
  imgH:function(e){
    var winWid = wx.getSystemInfoSync().windowWidth;//获取当前屏幕的宽度
    var imgh=e.detail.height;//图片高度
    var imgw=e.detail.width;
    var swiperH=winWid*imgh/imgw + "px"
    //等比设置swiper的高度  
    //即 屏幕宽度 / swiper高度 = 图片宽度 / 图片高度  
    //即 swiper高度 = 屏幕宽度 * 图片高度 / 图片宽度
    this.setData({
        Hei:swiperH//设置高度
    })
  },
  imgH1:function(e){
    var winWid = wx.getSystemInfoSync().windowWidth;//获取当前屏幕的宽度
    var imgh=e.detail.height;//图片高度
    var imgw=e.detail.width;
    var swiperH=winWid*imgh/imgw + "px"
    //等比设置swiper的高度  
    //即 屏幕宽度 / swiper高度 = 图片宽度 / 图片高度  
    //即 swiper高度 = 屏幕宽度 * 图片高度 / 图片宽度
    this.setData({
        Hei1:swiperH//设置高度
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    // wx.loadFontFace({
    //   family: 'myfont_Light',
    //   source: 'url("https://at.alicdn.com/wf/webfont/d6bMau5LvmbP/TDDiSVwZSIfyOcckFIcm_.woff2")',
    //   success: console.log
    // })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var userInfo = wx.getStorageSync('userInfo')
    if (userInfo) {
      this.setData({
        userInfo: userInfo,
        hasUserInfo: true
      })
    }
    var phoneNumber = wx.getStorageSync('phoneNumber')
    if (phoneNumber) {
      this.setData({
        phoneNumber: phoneNumber,
      })
    }
    var loginInfo = wx.getStorageSync('loginInfo')
    if (loginInfo) {
      this.setData({
        loginInfo: loginInfo
      })
    }
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})