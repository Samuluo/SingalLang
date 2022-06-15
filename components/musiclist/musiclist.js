// components/musiclist/musiclist.js
const app = getApp()
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    musiclist: {
      type:Array,
      observer:'loadFirst'
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    playingId: -1
  },
  pageLifetimes: {
    show() {

    }
  },

  /**
   * 组件的方法列表
   */
  methods: {
    loadFirst(v){
      console.log(v)
      var that = this
      that.setData({
        'musiclist':v
      })
    }
  }
})
