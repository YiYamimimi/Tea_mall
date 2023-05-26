// pages/addressList/addressList.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        addressList:[],
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
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
        if(addressList.length!=0){
            addressList[0].state=true;
        }
        this.setData({
            addressList:addressList
        })
    },
    /**默认地址被修改 */
    radioChange(e){
        let addr=this.data.addressList;
        for(let i=0;i<this.data.addressList.length;i++){
            addr[i].statu=false;
        }
        addr[e.detail.value].statu=true;
        wx.setStorageSync('address', addr)
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