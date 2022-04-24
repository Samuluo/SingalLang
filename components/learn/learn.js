// components/learn.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
      words:Array
  },

  /**
   * 组件的初始数据
   */
  data: {
    userId:1000,
    index:0
  },

  /**
   * 组件的方法列表
   */
  methods: {
    answer:function(){
      var that = this
      that.setData({
          'index':that.data.index+1,
      })
      console.log(that.data.index)
    }
  },
  lifetimes:{
    ready: function () {
    },
  }
})
