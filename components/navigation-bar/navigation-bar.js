const app = getApp()
Component({
    properties: {
        // defaultData（父页面传递的数据-就是引用组件的页面）
        defaultData: {
            type: Object,
            value: {
                title: "我是默认标题"
            },
            observer: function(newVal, oldVal) {}
        },
        show: {
            type: Boolean,
            value: {
                title: "我是默认标题"
            },
            observer:'loadFirst'
        },
    },

    data: {
      ashow:'',
      // 状态栏高度
      statusBarHeight: wx.getStorageSync('statusBarHeight') + 'px',
      // 导航栏高度
      navigationBarHeight: wx.getStorageSync('navigationBarHeight') + 'px',
      // 胶囊按钮高度
      menuButtonHeight: wx.getStorageSync('menuButtonHeight') + 'px',
      // 导航栏和状态栏高度
      navigationBarAndStatusBarHeight:
        wx.getStorageSync('statusBarHeight') +
        wx.getStorageSync('navigationBarHeight') +
        'px'
  },
  methods: {
    loadFirst(v) {
        var that = this
        console.log(v)
        that.setData({
            'ashow':v
        })
        console.log(that.data.ashow)

     },
    // 返回上一页面
      goback() {
        wx.navigateBack()
      },
    //返回到首页
      gohome() {
        wx.switchTab({
          url: '/pages/main/main',
        })
      }
    }
  
})