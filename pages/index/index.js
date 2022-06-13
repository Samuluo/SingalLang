const utils = require('../../utils/utils.js')
Page({
  onLoad () {
    let timer = setTimeout(() => {
      clearTimeout(timer)
      this.direct()
    }, 8000)
  },
  direct () {
    let auth = utils.ifLogined()
    let url = '/pages/main/main'
    if (auth) {
      url = '/pages/index/index'
    }
    wx.switchTab({
      url,
    })
  },
})