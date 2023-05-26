
App({
  onLaunch() {
    // 展示本地存储能力
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    //自定义导航栏 获取设备顶部窗口的高度（不同设备高度不一样，根据这个来设置自定义导航栏的高度）
    wx.getSystemInfo({
      success: (res) => {
        let custom = wx.getMenuButtonBoundingClientRect()
        this.globalData.statusBarHeight = res.statusBarHeight
        this.globalData.navBarHeight = custom.height + (custom.top - res.statusBarHeight) * 2
      }
    })
    
    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })

  },
  globalData: {
    userInfo: null,
    statusBarHeight: 0,
    navBarHeight: 0,
  },
  onShow: function () {
    
  }
})
