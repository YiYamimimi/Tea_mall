// components/Tabs.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        tabList:Array,
        GoodsList:Array,
        curr:Number
    },

    /**
     * 组件的初始数据
     */
    data: {
    },

    /**
     * 组件的方法列表
     */
    methods: {
        tapwhere(e){
            this.triggerEvent('tapwhere',{
                index:e.target.dataset.index
            })
            console.log(this.properties.GoodsList);
        }
    }
})
