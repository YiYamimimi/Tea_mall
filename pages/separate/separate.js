var app = getApp();
//声明全局变量
let proListToTop = [],
  menuToTop = [],
  MENU = 0,
  windowHeight, timeoutId;
// MENU ==> 是否为点击左侧进行滚动的，如果是，则不需要再次设置左侧的激活状态
Page({

  data: {
    staticImg: app.globalData.staticImg,
    currentActiveIndex: 0,
    // 接口返回的商品数组
    navList: [{
        c_id: "01",
        c_name: '功夫茶包',
        list: [{
            id: 1,
            url: 'https://s1.ax1x.com/2022/10/29/x5w3qI.md.jpg',
            goodsName: '绿茶',
            money:'32元/盒',
          },
          {
            id: 2,
            url: 'https://s1.ax1x.com/2022/10/29/x5wuGD.md.jpg',
            goodsName: '白茶',
            money:'22元/盒',
          },
          {
            id: 3,
            url: 'https://s1.ax1x.com/2022/10/29/x5wJdP.jpg',
            goodsName: '鸭屎香茶',
            money:'25元/盒',
          },
          {
            id: 4,
            url: 'https://s1.ax1x.com/2022/10/29/x5wGZt.md.jpg',
            goodsName: '普洱茶',
            money:'22元/盒',
          },
        ]
      },
      {
        c_id: "02",
        c_name: '功夫口粮',
        list: [{
            id: 5,
            url: 'https://pic1.imgdb.cn/item/6359e82216f2c2beb15e391e.png',
            goodsName: '白露茶',
            money:'40元/斤',
          },
          {
            id: 6,
            url: 'https://pic1.imgdb.cn/item/6359e84716f2c2beb15e5685.jpg',
            goodsName: '绿茶',
            money:'23元/斤',
          },
          {//未
            id: 7,
            url: 'https://pic1.imgdb.cn/item/6359e86e16f2c2beb15e7ec6.jpg',
            goodsName: '红茶',
            money:'22',
          },
          {
            id: 8,
            url: 'https://pic1.imgdb.cn/item/6359e88b16f2c2beb15e9aab.png',
            goodsName: '丹霞冰鲜茶',
            money:'150元/斤',
          },
        ]
      },
      {
        c_id: "03",
        c_name: '私房清饮',
        list: [{
            id: 9,
            url: 'https://pic1.imgdb.cn/item/6359e8b616f2c2beb15eb891.jpg',
            goodsName: '白毛茶牙尖',
            money:'350元/斤',
          },
          {
            id: 10,
            url: 'https://pic1.imgdb.cn/item/6359e8db16f2c2beb15f0d30.jpg',
            goodsName: '白毫芽梗',
            money:'800元/斤',
          },
          {
            id: 11,
            url: 'https://pic1.imgdb.cn/item/635cd3f216f2c2beb193ac2c.jpg',
            goodsName: '春采芽尖',
            money:'500元/斤',
          },
          {//未
            id: 12,
            url: 'https://pic1.imgdb.cn/item/6359e94b16f2c2beb15f54e8.jpg',
            goodsName: '白毫芽梗',
            money:'22',
          },
        
        ]
      },
      {
        c_id: "04",
        c_name: '限定茶礼',
        list: [{
            id: 13,
            url: 'https://s1.ax1x.com/2022/10/29/x5KLRK.jpg',
            goodsName: '丹霞银白',
            money:'220元/盒（150g）',
          },
          {
            id: 14,
            url: 'https://pic1.imgdb.cn/item/635ccfb116f2c2beb18cf2f2.png',
            goodsName: '仁化毛尖',
            money:'250元/盒（50g）',
          },
        ]
      }
    
    ],


  },
  onLoad: function (e) {
    // console.log("222ll")
    // 确保页面数据已经刷新完毕~
    setTimeout(() => {
      this.getAllRects()
    }, 20)
  },
  goodsName:function(e){
    wx.navigateTo({
 
      url: '/pages/search/search',
 
      })
    },
  changeMenu(e) {
    console.log(proListToTop);
    // 改变左侧tab栏操作
    if (Number(e.target.id) === this.data.currentActiveIndex) return
    MENU = 1
    this.setData({
      currentActiveIndex: Number(e.target.id),
      rightProTop: proListToTop[Number(e.target.id)]
    })
    this.setMenuAnimation(Number(e.target.id))
  },
  scroll(e) {
    console.log(e);
    for (let i = 0; i < proListToTop.length; i++) {
      if (e.detail.scrollTop < proListToTop[i] && i !== 0 && e.detail.scrollTop > proListToTop[i - 1]) {
        return this.setDis(i)
      }
    }
    // 找不到匹配项，默认显示第一个数据
    if (!MENU) {
      this.setData({
        currentActiveIndex: 0
      })
    }
    MENU = 0
  },
  setDis(i) {
    // 设置左侧menu栏的选中状态
    if (i !== this.data.currentActiveIndex + 1 && !MENU) {
      this.setData({
        currentActiveIndex: i - 1
      })
    }
    MENU = 0
    this.setMenuAnimation(i)
  },
  setMenuAnimation(i) {
    // 设置动画，使menu滚动到指定位置。
    let self = this
    console.log(33)
    if (menuToTop[i].animate) {
      console.log(11111)
      // 节流操作
      if (timeoutId) {
        clearTimeout(timeoutId)
      }
      timeoutId = setTimeout(() => {
        console.log(12138)
        self.setData({
          leftMenuTop: (menuToTop[i].top - windowHeight)
        })
      }, 50)
    } else {
      console.log(11)
      if (this.data.leftMenuTop === 0) return
      console.log(22)
      this.setData({
        leftMenuTop: 0
      })
    }
  },
  getActiveReacts() {
    wx.createSelectorQuery().selectAll('.menu-active').boundingClientRect(function (rects) {
      return rects[0].top
    }).exec()
  },
  getAllRects() {

    // 获取商品数组的位置信息
    wx.createSelectorQuery().selectAll('.pro-item').boundingClientRect(function (rects) {
      rects.forEach(function (rect) {
        console.log(rect)
        // 这里减去44是根据你的滚动区域距离头部的高度，如果没有高度，可以将其删去
        proListToTop.push(rect.top - 44)
      })
    }).exec()

    // 获取menu数组的位置信息
    wx.createSelectorQuery().selectAll('.menu-item').boundingClientRect(function (rects) {
      wx.getSystemInfo({
        success: function (res) {
          console.log(res);
          windowHeight = res.windowHeight / 2
          // console.log(windowHeight)
          rects.forEach(function (rect) {
            menuToTop.push({
              top: rect.top,
              animate: rect.top > windowHeight
            })
          })
        }
      })
    }).exec()
  },
  // 获取系统的高度信息
  getSystemInfo() {
    let self = this
    wx.getSystemInfo({
      success: function (res) {
        windowHeight = res.windowHeight / 2
      }
    })
  }

})
