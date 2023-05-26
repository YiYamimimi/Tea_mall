// pages/pay/pay.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        payList:[],
        addressList:[],
        sum:0,
        num:0,
        orderid:0,
        statu:'待付款',
        address:[]
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        let order1=wx.getStorageSync('orderList')||[];
        console.log("首次传过来呢？也没有！！",order1);
        var newpaylist=[];
        console.log(options.orderid);
        let sum=0;
        let num=0;
        let orid=0;
        let zt='待付款';
       
        if(options.orderid!=undefined){
            newpaylist=order1.filter((item)=>{
                return item.orderid==options.orderid;
            })
           
            sum=newpaylist[0].goods[0].sum;
            num=newpaylist[0].goods[0].num;
            orid=options.orderid;
            zt=newpaylist[0].statu;
            this.setData({
                payList:newpaylist[0].goods
            })
        }else{
            newpaylist=wx.getStorageSync('payList')||[];
            sum=newpaylist[0].sum;
            num=newpaylist[0].num;
            orid=newpaylist[0].orderid;
            this.setData({
                payList:newpaylist
            })
           console.log()
        }
        
        console.log(orid);
        this.setData({
            sum:sum,
            num:num,
            orderid:orid,
            statu:zt
        })
        console.log(this.data.payList);
        var order=wx.getStorageSync('orderList')||[];
        if(order.length==0){
            let ord=[];
            order={
                goods:this.data.payList,
                statu:'待付款',
                orderid:this.data.orderid
            };
            console.log(order);
            ord.push(order)
            wx.setStorageSync('orderList',ord)
        }else{
            
            let flag=order.findIndex((item)=>{
                return item.orderid==this.data.payList[0].orderid;
            })
            if(flag==-1){
                let ord={
                    goods:this.data.payList,
                    statu:'待付款',
                    orderid:this.data.orderid
                }
                order.push(ord)
                wx.setStorageSync('orderList',order)
            }else{
                console.log('已存在该订单');
            }
        } console.log("生成订单是有无给sum总价格传参,居然没有！！",order);
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
        let addressList=wx.getStorageSync('address')||[];
        this.setData({
            addressList:addressList
        })
        let address=wx.getStorageSync('orderList')||[];
        console.log(this.data.orderid);
        let index=address.findIndex((item)=>{
            return item.orderid==this.data.orderid;
        })
        this.setData({
            address: address[index]
        })
    },
    //支付
    payshop(){
        let order=wx.getStorageSync('orderList')||[];
        let addressList=wx.getStorageSync('address')||[];
        let flag=order.findIndex((item)=>{
            return item.orderid==this.data.payList[0].orderid;
        })
        var address=addressList[0];
        for(let i=0;i<addressList.length;i++){
            if(addressList[i].statu==true){
                console.log(addressList);
                address=addressList[i];
            }
        }
        var sz=[];
        
        wx.showModal({
            title: '提示:先添加收货地址',
            content: '确认支付?',
            success (res) {
              if (res.confirm) {
                if(address.address==undefined){
                    for(let j=0;j<order.length;j++){
                        let new1={
                        goods:order[j].goods,
                        orderid:order[j].orderid,
                        statu:'待发货',
                        address:address
                        }
                        sz.push(new1)
                    }
                }else{
                    order[flag].address=address;
                    order[flag].statu='待发货'
                    console.log(order[flag]);
                    sz=order;
                }
                // sz[flag].statu='待发货';
                wx.setStorageSync('orderList', sz);//更新状态
                wx.showToast({
                    title: '正在支付',
                    icon:"loading",
                    duration: 800//持续的时间
                })
                wx.showToast({
                    title: '支付成功',
                    icon:"success",
                    duration: 800//持续的时间
                })
                wx.redirectTo({
                  url: '/pages/order/order',
                })
              } else if (res.cancel) {
                wx.showToast({
                    title: '支付失败',
                    icon:"error",
                    duration: 800//持续的时间
                })
              }
            }
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