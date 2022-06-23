const app = getApp()

// views/index/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    setTimeout(() => {
      // 打开主页面
      this.openPage()
    }, 2000)
  },

  /**
   * 导航到主页面
   */
  openPage (replace) {
    let options = { url: '../main/main' }
    // 导航
    wx.switchTab(options)
  }
})