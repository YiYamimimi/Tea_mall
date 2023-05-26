// pages/feedback/feedback.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        tabs:['体验问题'],
        curr:0,
        //文本的值
    textValue: "",
    //被选中的图片数组
    chooseimg: [],
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

    },
//选择图片事件
handleimg(e) {
    console.log(e);
    //调用api
    wx.chooseImage({
      count: 9, //最多可选择几张照片
      sizeType: ["original", "compressed"], //图片格式 原图/压缩
      sourceType: ["album", "camera"], //图片来源
      success: (result) => {
        console.log(result.tempFilePaths);
        this.setData({
          //图片数组进行拼接
          chooseimg: [...this.data.chooseimg, ...result.tempFilePaths],
        });
      },
      fail: () => {},
      complete: () => {},
    });
  },
  //删除图片元素
  handleremoveimg(e) {
    console.log(e);
    //获取传递过来的索引值
    const { index } = e.currentTarget.dataset;
    //获取图片数组
    let { chooseimg } = this.data;
    //删除元素
    chooseimg.splice(index, 1);
    //将修改后的值重新赋值
    this.setData({
      chooseimg,
    });
  },
  //文本输入
  handleTextInput(e) {
    this.setData({
      textValue: e.detail.value,
    });
  },
  //提交按钮单击事件
  handlefrom(e) {
    //获取文本的值
    const { textValue, chooseimg } = this.data;
    //验证合法性
    if (!textValue.trim()) {
      //不合法
      wx.showToast({
        title: "输入有误",
        icon: "none",
        mask: true,
      });
      return;
    }
    //显示正在上传中
    wx.showToast({
      title: "提交成功",
      icon:"success",
      duration:1000
    });
    setTimeout(() => {
      wx.switchTab({
        url: '/pages/home/home'
      })
    }, 1000);
    
    /*
    //判断有没有需要上传的图片数组
    if (chooseimg.length != 0) {
      //遍历数组
      chooseimg.forEach((v, i) => {
        //验证通过，上传图片==》图片服务器 api
         
        wx.uploadFile({
          //不支持多个文件同时上场==》遍历数组 挨个上传
          url: "https://imgchr.com/", //图片上传到哪里
          filePath: v, //路径
          name: "file", //图片名称
          formData: {}, //文本信息
          success: (result) => {
            console.log(result);
            //let url = HTML.parse(result.data).url;
            //this.upLoadImg.push(url)
            if (i === chooseimg.length - 1) {
              console.log("提交给后台，将回到上一界面");
              //关闭弹窗
              wx.hideLoading();
              //重置页面
              this.setData({
                textValue: "",
                chooseimg: [],
              });
              //返回上一个页面
              wx.navigateBack({
                delta: 1,
              });
            }
          },
        });
        wx.getNetworkType({
          success: (result) => {
            console.log(result)
          },
          fail: () => {},
          complete: () => {}
        });
      });
    } else {
      wx.hideLoading();
      console.log("只提交了文本");
      wx.navigateBack({
        delta: 1,
      });
    }
    */
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

    }
})