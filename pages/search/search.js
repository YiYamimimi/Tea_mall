Page({
  //清除历史记录
  cleanhistory: function(e) {
    this.setData({
      history: false, //隐藏历史记录
      historyArray: [], //清空历史记录数组
      newArray: [],
      shoopingtext: "" //清空搜索框
    })
  },
  //搜索
  search: function(e) {
    var searchtext = this.data.shoopingtext; //搜索框的值
    var sss = true;
    if (searchtext != "") {
      //将搜索框的值赋给历史数组
      this.data.historyArray.push(searchtext);
      //模糊查询 循环查询数组中的goodsName字段
      for (var index in this.data.shoopingarray) {
        var num = this.data.shoopingarray[index].goodsName.indexOf(searchtext);
        let temp = 'shoopingarray[' + index + '].status';
        if (num != -1) { //不匹配的不显示
          this.setData({
            [temp]: 1,
          })
          sss = false //隐藏未找到提示
        }
      }
      this.setData({
        history: false, //隐藏历史记录
        noneview: sss, //隐藏未找到提示
        shoppinglist: true, //显示商品列表
        newArray: this.data.historyArray //给新历史记录数组赋值
      })
    } else {
      this.setData({
        noneview: true, //显示未找到提示
        shoppinglist: false, //隐藏商品列表
        history: false, //隐藏历史记录
      })
    }
  },
  data: {
    shoopingtext: "", //搜索框的值
    history: false, //显示历史记录
    noneview: false, //显示未找到提示
    shoppinglist: false, //显示商品列表
    historyArray: [], //历史记录数组,
    newArray: [], //添加历史记录数组
    shoopingarray: [{ //商品
      id: 0,
      url: 'https://s1.ax1x.com/2022/10/29/x5w3qI.jpg',
      goodsName: "绿茶",
      money: "32元/盒",
      sold: "78盒",
      status: 0
    }, {
      id: 1,
      url: 'https://s1.ax1x.com/2022/10/29/x5wuGD.jpg',
      goodsName: "白茶",
      money: "22元/盒",
      sold: "34盒",
      status: 0
    },
    {
      id: 2,
      url: 'https://s1.ax1x.com/2022/10/29/x5wJdP.jpg',
      goodsName: "鸭屎香茶",
      money: "25元/盒",
      sold: "34盒",
      status: 0
    },
    {
      id: 3,
      url: 'https://s1.ax1x.com/2022/10/29/x5wGZt.jpg',
      goodsName: "普洱茶",
      money: "22元/盒",
      sold: "34",
      status: 0
    },
    {
      id: 4,
      url: 'https://pic1.imgdb.cn/item/6359e82216f2c2beb15e391e.png',
      goodsName: "白露茶",
      money: "240元/斤",
      sold: "34",
      status: 0
    },
    {
      id: 5,
      url: 'https://pic1.imgdb.cn/item/6359e84716f2c2beb15e5685.jpg',
      goodsName: "绿茶",
      money: "23元/斤",
      sold: "34",
      status: 0
    },
    {//未
      id: 6,
      url: 'https://pic1.imgdb.cn/item/6359e86e16f2c2beb15e7ec6.jpg',
      goodsName: "红茶",
      money: "22",
      sold: "34包",
      status: 0
    },
    {
      id: 7,
      url: 'https://pic1.imgdb.cn/item/6359e88b16f2c2beb15e9aab.png',
      goodsName: "丹霞冰鲜茶",
      money: "150元/斤",
      sold: "50",
      status: 0
    },
    {
      id: 8,
      url: 'https://pic1.imgdb.cn/item/6359e8b616f2c2beb15eb891.jpg',
      goodsName: "白毛茶芽尖",
      money: "350元/斤",
      sold: "46",
      status: 0
    },
    {
      id: 9,
      url: 'https://pic1.imgdb.cn/item/6359e8db16f2c2beb15f0d30.jpg',
      goodsName: "白毫芽梗",
      money: "800元/斤",
      sold: "34",
      status: 0
    },
    {//未
      id: 10,
      url: 'https://pic1.imgdb.cn/item/6359e94b16f2c2beb15f54e8.jpg',
      goodsName: "春采芽尖",
      money: "500元/斤",
      sold: "34包",
      status: 0
    },
    {//未
      id: 11,
      url: 'https://pic1.imgdb.cn/item/635cd3f216f2c2beb193ac2c.jpg',
      goodsName: "白毫芽梗",
      money: "22",
      sold: "34包",
      status: 0
    },
    {
      id: 12,
      url: 'https://s1.ax1x.com/2022/10/29/x5KLRK.jpg',
      goodsName: "丹霞银白",
      money: "220元/盒",
      sold: "87盒",
      status: 0
    },
    {
      id: 13,
      url: 'https://pic1.imgdb.cn/item/635ccfb116f2c2beb18cf2f2.png',
      goodsName: "仁化毛尖",
      money: "250元/盒",
      sold: "66盒",
      status: 0
    },
    
  ]
  },
  //搜索框的值
  shoppinginput: function(e) {
    //当删除input的值为空时
    if (e.detail.value == "") {
      this.setData({
        history: true, //显示历史记录
        shoppinglist: false //隐藏商品列表
      });
      //所有商品列表的状态改为0
      for (var index in this.data.shoopingarray) {
        let temp = 'shoopingarray[' + index + '].status';
        this.setData({
          [temp]: 0,
        })
      }
    }
    this.setData({
      shoopingtext: e.detail.value
    })
  },
  //点击历史记录赋值给搜索框
  textfz: function(e) {
    this.setData({
      shoopingtext: e.target.dataset.text
    })
  }
})