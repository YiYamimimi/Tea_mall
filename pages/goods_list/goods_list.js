Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodsObj: [],
    shoucang_text:'收藏'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log("展示出商品，底部加入购物车", options)
    console.log(options);
    this.setData({
      goodsObj: options
    })
    console.log(this.data.goodsObj);
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    this.getdetail(this.data.id);//更新浏览记录+收藏
    console.log(this.data.shoucang_text);
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
  shop: function (e) {
    wx.switchTab({
      url: '/pages/shop/shop'
    })
  },
  home: function (e) {
    wx.rswitchTab({
      url: '/pages/shop/home'
    })
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  },
  addShop(){//加入购物车
    let carts = wx.getStorageSync('carts')||[];//获取储存中的购物车
    console.log(carts);
    let index=carts.findIndex((item)=>{
        return item.id==this.data.goodsObj.id;
    })
    console.log(index);
    console.log(carts);
    //findIndex() 方法返回传入一个测试条件（函数）符合条件的数组第一个元素位置。
    //如果储存里的商品id=本地数据商品id 则返回此元素位置
    if(index===-1){//购物车为空
      this.data.goodsObj.num=1;//添加一个数量属性
      this.data.goodsObj.selected=true;//添加一个判断是否勾选的属性
      carts.push(this.data.goodsObj)//把本地商品添加进购物车
      wx.setStorageSync('carts', carts)//添加成功后储存购物车
      console.log(wx.getStorageSync('carts')||[]);
    }else{//购物车不为空
      carts[index].num++;//一样的商品数量叠加
      wx.setStorageSync('carts', carts)//重新储存购物车
    }
    wx.showToast({//加入后的提示弹框
      title: '加入成功',
      icon:'success',
      mask:true,
    })
    console.log(wx.getStorageSync('carts')||[])
  },
  shoucang(){//加入收藏
    var that = this//保留全局对象
    let userinfo=wx.getStorageSync("userinfo");
    if(userinfo==''){
        wx.showToast({
            title: '请先登录...',
            icon: 'error',
            duration: 1000//持续的时间
        })
    }else{ 
      let shoucang = wx.getStorageSync('shoucang')||[];//获取储存中的购物车
      console.log(shoucang);
      let index;
      if(shoucang.length==0){
        index=-1;
      }//注！如果数组为空，使用item.id会报错...
      else{
        index=shoucang.findIndex((item)=>{
          return item.id==this.data.goodsObj.id;
      })
      }
      if(index==-1){//没有收藏过该商品
          shoucang.push(this.data.goodsObj)//把本地商品收藏
          wx.setStorageSync('shoucang', shoucang)//添加成功后保存
          wx.showToast({//加入后的提示弹框
            title: '收藏成功',
            icon:'success',
            mask:true,
          })
          console.log(shoucang)
          that.setData({
            shoucang_text:'取消收藏'
          })
      }
      else{
        shoucang.splice(index,1);//取消收藏进行删除
        wx.setStorageSync('shoucang', shoucang);
        wx.showToast({
            title: '取消收藏成功',
            icon: 'success',
            duration: 1000//持续的时间
        })
        that.setData({
          shoucang_text:'收藏'
        })
      }
     
    }
  },
  getdetail(){//更新浏览记录+更新收藏状态
    var that = this//保留全局对象
    let userinfo=wx.getStorageSync("userinfo");
    if(userinfo==''){
        wx.showToast({
            title: '请先登录...',
            icon: 'error',
            duration: 1000//持续的时间
        })
    }else{ 
      let hostry = wx.getStorageSync('hostry')||[];//获取浏览记录
      console.log(hostry);

      let index,flag=0;
      hostry.forEach(function(item, index){
        if(item!=null){
            flag=1//判断数组不为空
        }else{
          hostry.splice(index);//删除数组中所有null元素
        }       
      })
      console.log("flag:"+flag);
      console.log(hostry);
      if(hostry.length==0 || flag == 0){
        index=-1;
      }//注！如果数组为空，使用item.id会报错...
      else{
        index=hostry.findIndex((item)=>{
          return item.id==this.data.goodsObj.id;
      })
      }
      if(index==-1){//没有浏览过
        hostry.push(this.data.goodsObj)
          wx.setStorageSync('hostry', hostry)//添加成功后保存
          console.log(hostry)         
      } 
    }

    //收藏
    if(userinfo!=''){ 
        let shoucang = wx.getStorageSync('shoucang')||[];//获取储存中的购物车
        console.log(shoucang);
        let index;
        if(shoucang.length==0){
          index=-1;
        }//注！如果数组为空，使用item.id会报错...
        else{
          index=shoucang.findIndex((item)=>{
            return item.id==this.data.goodsObj.id;
        })
        }
        if(index==-1){//没有收藏过该商品
            console.log(shoucang)
            that.setData({
              shoucang_text:'收藏'
            })
        }
        else{         
          that.setData({
            shoucang_text:'取消收藏'
          })
        }
       
      }
    
  }
})