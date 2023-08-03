// pages/user/user.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo:null,
    shoucangList:[],
    hostryList:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(this.data.userInfo);
    //从缓存中获取用户信息
    var userInfo = wx.getStorageSync('userinfo');
    this.setData({
      userInfo:userInfo
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
//用户授权后获取用户信息
getUserProfile: function (e) {
console.log(e);
wx.getUserProfile({//使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认
  desc:'用于登陆',
  success: (res) => {
    console.log(res);
    const { userInfo } = res;
    wx.setStorageSync("userinfo", userInfo)
    wx.showToast({
      title: '登陆成功...',
      icon: 'success',
      duration: 1000//持续的时间
    })
    this.onLoad();//刷新
  },
  fail:(res)=>{
    //用户按了拒绝按钮
    wx.showToast({
      title: '登陆失败...',
      icon: 'error',
      duration: 1000//持续的时间
    })
  }
})
},
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    let shoucang=wx.getStorageSync('shoucang') || [];
    let hostry=wx.getStorageSync('hostry') || [];
    this.setData({
      shoucangList:shoucang,
      hostryList:hostry
    })
  }
})
