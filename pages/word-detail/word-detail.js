// pages/word-detail/word-detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isLearning:'',
    userId:[],
    word:{

    }
  },
//    <-{{nowword.isStar==false?'../../images/star.png':'../../images/star-y.png'}}->
  star: function(e){
    console.log(e)
  var that = this

  if(that.data.word.isStar==false){
    wx.request({
      url: 'https://bewcf.info/starWord/add',
      method:"post",
      data:{
        userId:that.data.userId,
        wordId:that.data.word.id
      },
      header: {
        "content-type": "application/x-www-form-urlencoded" 
      },
      success:(res)=>{
        that.setData({
          'word.isStar':true,
        })
      }
    })
  }else if(that.data.word.isStar==true){
    wx.request({
      url: 'https://bewcf.info/starWord/removeOne',
      method:"post",
      data:{
        userId:that.data.userId,
        wordId:that.data.word.id
      },
      header: {
        "content-type": "application/x-www-form-urlencoded" 
      },
      success:(res)=>{
        that.setData({
          'word.isStar':false,
        })
      }
    })
  }
},
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    console.log(options)
    if(options.isLearning==1||2){
      console.log(that.data.isLearing)
      that.setData({
        'isLearning':options.isLearning,
      })
    }
    wx.getStorage({
      key: 'userInfo',
      success(res){
        that.setData({
          'userId': res.data.id,
        })
        wx.request({
          url: 'https://bewcf.info/word/queryOne',
          method:"get",
          data:{
            id:options.id,
            userId:that.data.userId
          },
          success:(res)=>{
            that.setData({
              'word':res.data,
            })
            console.log(that.data.word)
          }
        })
      }
    })
  },
  go: function(e){
    wx.navigateBack()
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
    wx.hideHomeButton({
      success: function() {},
    })
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

  }
})