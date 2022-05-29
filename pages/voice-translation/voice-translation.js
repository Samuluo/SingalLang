// pages/voice-translation/voice-translation.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    styleA: 'transform:rotate(0deg);'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
  //点击卡片旋转
  circle: function() {
    if(this.data.styleA=='transform:rotate(180deg);transition: .5s;') {
      this.setData({
        styleA: 'transform:rotate(0deg);transition: .5s;'
      })
    }
    else
      this.setData({
        styleA: 'transform:rotate(180deg);transition: .5s;'
      })
  },
  tartRecord: function() {

    if (this.recorderManager == null) {
    
    this.recorderManager = wx.getRecorderManager();
    
    this.options = {
    
    duration: 10000,
    
    sampleRate: 16000,
    
    numberOfChannels: 1,
    
    encodeBitRate: 64000,
    
    format: 'mp3',
    
    frameSize: 50
    
    }
    
    }
    
    this.recorderManager.start(this.options);
    
    this.recorderManager.onStop((res) => {
    
    console.log(res)
    
    wx.uploadFile({
    
    url: 'https://https://bewcf.info/transform/speechRecognition',//将录音文件传到后台服务器
    
    filePath: res.tempFilePath,
    
    method:'POST',
    
    name: 'file',
    
    header: {
    
    'content-type': 'multipart/form-data'
    
    },
    
    success: function(res) {
    
    console.log(res);
    
    },
    
    fail: function() {
    
    console.log("语音识别失败");
    
    }
    
    })
    
    });
    
    },
    
    stopRecord: function() {
    
    this.recorderManager.stop()
    
    }
})