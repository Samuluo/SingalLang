// pages/word-detail/word-detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    word:{

    }
  },
//    <-{{nowword.isStar==false?'../../images/star.png':'../../images/star-y.png'}}->
  /*star: function(e){
  var that = this
  console.log(that.data.nowword)
  if(that.data.nowword.isStar==false){
    wx.request({
      url: 'http://bewcf.info:8081/starWord/add',
      method:"post",
      data:{
        userId:that.data.userId,
        planId:that.data.nowword.planId,
        wordId:that.data.nowword.wordId
      },
      header: {
        "content-type": "application/x-www-form-urlencoded" 
      },
      success:(res)=>{
        that.setData({
          'nowword.isStar':true,
        })
      }
    })
  }else if(that.data.nowword.isStar==true){
    wx.request({
      url: 'http://bewcf.info:8081/starWord/removeOne',
      method:"post",
      data:{
        userId:that.data.userId,
        planId:that.data.nowword.planId,
        wordId:that.data.nowword.wordId
      },
      header: {
        "content-type": "application/x-www-form-urlencoded" 
      },
      success:(res)=>{
        that.setData({
          'nowword.isStar':false,
        })
      }
    })
  }
},*/
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    wx.request({
      url: 'http://bewcf.info:8081/word/queryOne',
      method:"get",
      data:{
        id:options.id
      },
      success:(res)=>{
        that.setData({
          'word':res.data,
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