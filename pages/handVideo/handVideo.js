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
    var videoList = [
      {
        id: "1",
        title: '第一篇 小美式装修风格案例客餐厅',
        content: '第一篇 小美式装修风格案例客餐厅小美式效果小美式装修风格案例客餐厅小美式效果',
        coverUrl: '/images/main/20200904044737661.jpg',
        startIcon: '/images/music/video.png',
        videoUrl: 'http://wxsnsdy.tc.qq.com/105/20210/snsdyvideodownload?filekey=30280201010421301f0201690402534804102ca905ce620b1241b726bc41dcff44e00204012882540400&bizid=1023&hy=SH&fileparam=302c020101042530230204136ffd93020457e3c4ff02024ef202031e8d7f02030f42400204045a320a0201000400',
      },{
        id: "2",
        title: '第一篇 小美式装修风格案例客餐厅',
        content: '第一篇 小美式装修风格案例客餐厅小美式效果小美式装修风格案例客餐厅小美式效果',
        coverUrl: '/images/main/20200904044737661.jpg',
        startIcon: '/images/music/video.png',
        videoUrl: 'http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4',
      },{
        id: "3",
        title: '第一篇 小美式装修风格案例客餐厅',
        content: '第一篇 小美式装修风格案例客餐厅小美式效果小美式装修风格案例客餐厅小美式效果',
        coverUrl: '/images/main/20200904044737661.jpg',
        startIcon: '/images/music/video.png',
        videoUrl: 'http://vjs.zencdn.net/v/oceans.mp4',
      }
    ];
 
    console.log(videoList);
    //数据显示
    that.setData({
      videoList: videoList,
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