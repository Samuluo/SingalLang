// pages/learn-word/learn-word.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    nowword:[],
    words:[],
    wordIds:[],
    completeN:[],
    toCompletedN:[],
    userId:[],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  new(e){
    var that = this
    that.setData({
      'completeN':e.detail,
    })
  },
  new2(e){
    var that = this
    that.setData({
      'toCompletedN':e.detail,
    })
  },
  new3(e){
    var that = this
    that.setData({
      'nowword':e.detail,
    })
  },
  star: function(e){
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
  },
  detail:function(e){
    var that = this;
    wx.navigateTo({
      url: '/pages/word-detail/word-detail?id='+that.data.nowword.wordId,
    })
  },
  prev:function(e){

  },
  onLoad: function (options) {
    var that = this
    wx.getStorage({
      key: 'userInfo',
      success(res){
        that.setData({
          'userId':res.data.id
        })
        wx.request({
          url: 'http://bewcf.info:8081/word/getTodayWord',
          method:"get",
          data:{
            userId:that.data.userId
          },
          success:(res)=>{
            that.setData({
              'words':res.data,
            })
          }
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
    var that = this
    wx.getStorage({
      key: 'wordIds',
      success(res){
        console.log(res)
        wx.request({
          url: 'http://bewcf.info:8081/word/completeWord',
          method:"post",
          data:{
            userId:that.data.userId,
            wordIds:res.data
          },
          header: {
            "content-type": "application/x-www-form-urlencoded" 
          },
          success:(res)=>{
            wx.removeStorage({
              key: 'wordIds',
              success: function(res) {
              },
            })
            console.log("完成了一些")
          }
        })
      }
    })
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