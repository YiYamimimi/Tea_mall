// pages/carts/carts.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    state: false,
    num: 0,  //结算数量
    cartsList: [], //0:{goodsName: "红茶5" id: "5" money: "22" num: 1 selected: true url: "/statics/images/home_top.png"}
    sum: 0,  //总价钱
    shu: [],   //数量
    selcarts: []//被选中的商品
  },
  //复选框选中取消选中触发
  handleCheck(e) {
    console.log("复选框选中取消选中触发",e);
    let id = e.detail.value;
    console.log("选了复选框后的",id);
    if (id != undefined) {
      console.log("选了复选框后的id",id);
      var price = id;
      var nowpic = [];
      this.data.cartsList.map(item => {
        price.map(item1 => { 
          if (item.id == item1) {
            nowpic.push(item.money)
           
          }
        })
      })
      console.log("现在价格",nowpic);
      var money = 0;
      var zong = 0;
      var sumindex = [];//存放选中的下标
      var arr = this.data.cartsList;
      for (var i = 0; i < price.length; i++) {
        var index = this.data.cartsList.findIndex((item) => {
          return item.id == price[i];
        })
        sumindex.push(index);
        console.log('index=' + index);
      }
      console.log(sumindex);
      for (let k = 0; k < this.data.cartsList.length; k++) {
        arr[k].checked = false;
      }
      if (sumindex.length != 0 && price != undefined) {
        for (var j = 0; j < sumindex.length; j++) {
          zong += this.data.shu[sumindex[j]]
          arr[sumindex[j]].checked = true;
          this.setData({
            cartsList: arr
          })
        }
        for (let i = 0; i < nowpic.length; i++) {
          console.log('当前money=' + nowpic[i] + '数量:' + this.data.shu[sumindex[i]]);
          money += parseInt(nowpic[i] * this.data.shu[sumindex[i]]);
        }
      }
      this.setData({
        num: zong,
        sum: money,
        selcarts: sumindex
      })
    }
  },
  //全选反选
  checkboxChange(e) {
    console.log("选中全选",e.detail.value.length);
    if (e.detail.value.length == 1) {
      var price = 0;
      var zong = 0;
      var sumindex = [];
      for (let i in this.data.cartsList) {
        this.data.cartsList[i].checked = true;
        price += this.data.cartsList[i].money * this.data.shu[i]
        zong += this.data.shu[i]
        sumindex.push(i);
      }
      this.setData({
        state: true,
        num: zong,
        sum: price,
        selcarts: sumindex
      })
    } else {
      for (let i in this.data.cartsList) {
        this.data.cartsList[i].checked = false;
      }
      this.setData({
        state: false,
        num: 0,
        sum: 0,
        selcarts: []
      })
    }
  },
  //结算
  over() {
    if (this.data.selcarts.length != 0) {
      var sz = [];
      var orderCode = 0;
      // 6位随机数(加在时间戳后面)
      for (var i = 0; i < 6; i++) {
        orderCode += Math.floor(Math.random() * 10);
      }
      // 时间戳(用来生成订单号)
      orderCode = 'D' + new Date().getTime() + orderCode;

      // 打印
      console.log("标记",orderCode)// D1601545805958923658

      for (let i = 0; i < this.data.selcarts.length; i++) {
        console.log('selcarts', this.data.selcarts[i]);
        console.log(this.data.cartsList[this.data.selcarts[i]], '对应数量:' + this.data.shu[this.data.selcarts[i]], '总价钱:' + this.data.sum, '总数量:' + this.data.num);
        let good = {
          goods: this.data.cartsList[this.data.selcarts[i]],
          shu: this.data.shu[this.data.selcarts[i]],
          sum: this.data.sum,
          num: this.data.num,
          orderid: orderCode
        }
        sz.push(good);
        wx.setStorageSync('payList', sz);
      }
      var carts = wx.getStorageSync('carts');
      // carts.splice(this.data.selcarts[i],1);
      this.data.selcarts.sort(function (a, b) { return b - a });//将数组倒过来防止splice删除自动往前排
      this.data.selcarts.forEach(function (index) { carts.splice(index, 1) })
      console.log('carts', carts);
      wx.setStorageSync('carts', carts);
      wx.showToast({
        title: '正在生成订单',
        icon: "loading",
        duration: 800//持续的时间
      })
      wx.navigateTo({
        url: '/pages/pay/pay',
      })
    } else {
      wx.showToast({
        title: '请至少选择一件商品',
        icon: "error",
        duration: 1000//持续的时间
      })
    }
  },
  //获取商品数量，计算总价
  // setCart(cart){
  //   let allchecked=true;
  //   let totalprice=0;
  //   let totalnum=0;
  //   cart.forEach(v=> {
  //     if(v.checked){
  //       totalprice+=v.num*v.money;
  //       totalnum+=v.num;
  //     }else{
  //       allchecked=false;
  //     }
  //   });
  //   allchecked=cart.length!=0?allchecked:false;
  //   this.setData({
  //     cart,
  //     allchecked,
  //     totalprice,
  //     totalnum
  //   })
  //   wx.setStorageSync("cart",cart);
  // },
  //这个函数数量增加删除合并在一起，以operation作为判断增还是删
  // handleitemnumedit(e){
  //   const{operation,id}=e.currentTarget.dataset;

  //   let {cart}=this.data;
  //   const index=cart.findIndex(v=>v.id===id);
  //   if(cart[index].num===1&&operation===-1){
  //     wx.showModal({
  //       title:'提示',
  //       content: '您是否要删除?',
  //       success:(res)=>{
  //         if(res.confirm){
  //           cart.splice(index,1);
  //           this.setCart(cart);
  //         }else if(res.cancel){
  //           console.log("用户取消操作");
  //         }
  //       }
  //     })
  //   }else{
  //   cart[index].num+=operation;
  //   this.setCart(cart);
  //   }
  // },

  //-数量
  removenum(e) {
    let {cartsList}=this.data;
    console.log("这里的money是什么,没传对？",e.currentTarget.dataset.money);
    let index=e.currentTarget.dataset.index;
    let qian=this.data.cartsList[index].money;
    if (this.data.shu[index] == 1) {
      wx.showModal({
        title: '提示',
        content: '您是否要删除?',
        success: (res) => {
          if (res.confirm) {
            cartsList.splice(index, 1);
            
            this.setData({
              cartsList
            })
            wx.setStorageSync("cartsList",cartsList);
            wx.setStorageSync("carts",cartsList);
            // state=this.data.shu[index]!=0?state:false;
          } else if (res.cancel) {
            console.log("用户取消操作");
          }
        }
      })
    }else{
      let arr=this.data.shu;
      let carts = wx.getStorageSync('carts') || [];
      arr[index]-=1;
      carts[index].num=arr[index];
      wx.setStorageSync('carts', carts)

      console.log(this.data.cartsList[index].checked);
      if(this.data.cartsList[index].checked){
          this.setData({
              sum:this.data.sum-qian,
              num:this.data.num-1
          })
      }
      this.setData({
          shu:arr,
      })
  }
  },
  //+数量
  addnum(e) {
    let index = e.currentTarget.dataset.index;
    let qian = e.currentTarget.dataset.money;
    let arr = this.data.shu;

    // 购物车改变数量之后，赋值回carts
    arr[index] += 1;
    let carts = wx.getStorageSync('carts') || [];
    carts[index].num=arr[index];
    wx.setStorageSync('carts', carts)

    console.log(this.data.cartsList[index]);
    if (this.data.cartsList[index].checked) {
      this.setData({
        sum: this.data.sum + qian,
        num: this.data.num + 1
      })
    }
    this.setData({
      shu: arr
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
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
    let carts = wx.getStorageSync('carts') || [];
    let arr = [];
    console.log("chuang", carts);
    //{goodsName: "红茶5" id: "5" money: "22" num: 1 selected: true url: "/statics/images/home_top.png"}
    if (carts != '[]') {
      for (let i = 0; i < carts.length; i++) {
        arr[i]=carts[i].num;
      }
    }
    this.setData({
      cartsList: carts,
      shu: arr,
      state: false,
      sum: 0,
      num: 0
    })
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