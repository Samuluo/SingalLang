// pages/activity/historyList/historyList.js
Page({
 
  /**
   * 页面的初始数据
   */
  data: {
    playIndex: null,
    videoList: [],
    indexCurrent:null
  },
 
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.request({
      url: 'https://bewcf.info/song/getSong',
      method:"get",
      data:{
        songListId:6,
      },
      success:(res)=>{
        that.setData({
          'videoList':res.data
        })
      }
    })
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
 
  },
 
  videoContext:null,
  // 点击cover播放，其它视频结束,
  doPlay:function(e){

  },
  videoPlay: function (e) {
    var id = e.currentTarget.id
    console.log(id)
    console.log(this.data.playIndex)
    //console.log(this.data.playIndex, id) // 当前播放与当前点击
    if (!this.data.playIndex) { // 当前没有正在播放的视频时
      console.log(1)
      this.setData({
        playIndex: id
      })
      console.log(this.data.playIndex)
      videoContext = wx.createVideoContext('index' + id)
      videoContext.play()
    } else {                 // 当前有正在播放的视频先将prev暂停到0s，再播放当前点击的current
      console.log(2)
      this.setData({
        playIndex: id
      })
      videoContext= wx.createVideoContext('index' + this.data.playIndex)
      videoContext.play()
    }
  },

 
})
 
/*else {                    // 当前有正在播放的视频先将prev暂停到0s，再播放当前点击的current
      var videoContextPrev = wx.createVideoContext('index' + this.data.playIndex)
      videoContextPrev.seek(0)
      videoContextPrev.pause()
      this.setData({
        playIndex: id
      })
      var videoContextCurrent = wx.createVideoContext('index' + this.data.playIndex)
      videoContextCurrent.play()
    }*/

    /*
  videoPlay: function (e) {
    var id = e.currentTarget.id
    console.log(id)
    console.log(this.data.playIndex)
    //console.log(this.data.playIndex, id) // 当前播放与当前点击
    if (!this.data.playIndex) { // 当前没有正在播放的视频时
      console.log(1)
      this.setData({
        playIndex: id
      })
      console.log(this.data.playIndex)
      videoContext = wx.createVideoContext('index' + id)
      videoContext.play()
    } else {                 // 当前有正在播放的视频先将prev暂停到0s，再播放当前点击的current
      console.log(2)
      this.setData({
        playIndex: id
      })
      videoContext= wx.createVideoContext('index' + this.data.playIndex)
      videoContext.play()
    }
  },

    */