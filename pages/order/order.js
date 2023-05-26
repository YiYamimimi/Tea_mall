// pages/order/order.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        tabList:['全部','待付款','待发货','退款/退货'],
        orderList:Array,
        curr:0
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.onShow(options.curr);
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    // 直接用curr,不要传入option
    onShow: function (curr) {
        console.log(curr);
        let order=wx.getStorageSync('orderList')||[]
        console.log(order);
        let fahuo=order.findIndex((item)=>{
            return item.statu=='待发货';
        })
        let fukuan=order.findIndex((item)=>{
            return item.statu=='待付款';
        })
        if(curr!=undefined){
        if(curr==0){
        this.setData({
            orderList:order,
            curr:0
        })
        }else if(curr==1){
            this.setData({
                orderList:fukuan,
                curr:1
            })
        }else if(curr==2){
            this.setData({
                orderList:fahuo,
                curr:2
            })
        }else{
            this.setData({
                orderList:fukuan,
                curr:3
            })
        }
        }
    },
     /*导航栏点击事件,tab组件传来的 */
     _where(e){
         console.log(e.detail.index);
        let order=wx.getStorageSync('orderList')||[];
        var fahuo=order.filter((item)=>{
            return item.statu=='待发货';
        })
        
        var fukuan=order.filter((item)=>{
            return item.statu=='待付款';
        })
        
        //收藏
        if(e.detail.index==0){
            this.setData({
                orderList:order,
                curr:0
            })
        }else if(e.detail.index==1){  //待付款
            console.log(fukuan);
            this.setData({
                orderList:fukuan,
                curr:1
            })
        }else if(e.detail.index==2){  //待发货
            console.log(fahuo);
            this.setData({
                orderList:fahuo,
                curr:2
            })
        }else{
            this.setData({
                orderList:[],
                curr:3
            })
        }
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