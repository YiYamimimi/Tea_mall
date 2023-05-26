// pages/collect/collect.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        tabList:['收藏商品','我的足迹'],
        curr:0,
        GoodsList:[]
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        console.log(options);
        this.onShow(options.curr)
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function (curr) {
        var goodslist=[];
        console.log(curr);
        //收藏
        if(curr==0){
            goodslist=wx.getStorageSync('shoucang') || [];
            this.setData({
                curr:0
            })
        }else if(curr==3){  //浏览足迹
            goodslist=wx.getStorageSync('hostry') || [];
            this.setData({
                curr:3
            })
        }
        this.setData({
            GoodsList:goodslist
        })
    },
    /*导航栏点击事件,tab组件传来的 */
    _where(e){
        var goodslist=[];
        //收藏
        if(e.detail.index==0){
            goodslist=wx.getStorageSync('shoucang') || [];
             console.log(wx.getStorageSync('shoucang') || []);
        }else{  //浏览足迹
            goodslist=wx.getStorageSync('hostry') || [];
            console.log(wx.getStorageSync('hostry') || []);
        }
        this.setData({
            GoodsList:goodslist,
            curr:e.detail.index
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