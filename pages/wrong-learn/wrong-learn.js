// pages/learn-word/learn-word.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id:[],
    prevId:-1,
    nowword:[],
    words:[],
    wordIds:[],
    completeN:[],
    toCompletedN:[],
    userId:[],
    empty:false
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
        url: 'https://bewcf.info/starWord/add',
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
        url: 'https://bewcf.info/starWord/removeOne',
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
    var that = this;
    that.setData({
      'prevId':e.detail,
    })
  },
  toPrev:function(e){
    var that = this;
    console.log(that.data.prevId)
    if(that.data.prevId==-1){

    }else{
    wx.navigateTo({
      url: '/pages/word-detail/word-detail?id='+that.data.prevId,
    })
  }
  },
  onLoad: function (options) {
    console.log(options)
    console.log(options.wrongwords)
    console.log(options.wrongwords.length)
    var that = this
    if(options.wrongwords.length==2){
      that.setData({
        'empty':true,
      })
    }
 
    wx.getStorage({
      key: 'userInfo',
      success(res){
        that.setData({
          'userId':res.data.id
        })
        wx.request({
          url: 'https://bewcf.info/plan/queryNow',
          method:"get",
          data:{
            userId:that.data.userId
          },
          success:(res)=>{
            that.setData({
              'id':res.data.id,
              'words':JSON.parse(options.wrongwords)
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
        wx.request({
          url: 'https://bewcf.info/mistakeWord/removeSeveral',
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