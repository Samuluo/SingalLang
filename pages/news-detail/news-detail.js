// pages/news-detail/news-detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userId:[],
    isStar:[],
    articleId:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  star:function(e){
    var that = this
    if(that.data.isStar==false){
      wx.request({
        url: 'https://bewcf.info/article/addStarArticle',
        method:"post",
        data:{
          userId:that.data.userId,
          articleId:that.data.articleId
        },
        header: {
          "content-type": "application/x-www-form-urlencoded" 
        },
        success:(res)=>{
          that.setData({
            'isStar':true,
          })
        }
      })
    }else if(that.data.isStar==true){
      wx.request({
        url: 'https://bewcf.info/article/cancelStarArticle',
        method:"post",
        data:{
          userId:that.data.userId,
          articleId:that.data.articleId
        },
        header: {
          "content-type": "application/x-www-form-urlencoded" 
        },
        success:(res)=>{
          that.setData({
            'isStar':false,
          })
        }
      })
    }
  },
  onLoad: function (options) {
    var that = this
    wx.getStorage({
      key: 'userInfo',
      success(res){
        that.setData({
          'userId': res.data.id,
          'articleId':options.id
        })
        wx.request({
          url: 'https://bewcf.info/article/queryStar',
          method:"get",
          data:{
            userId:that.data.userId,
            articleId:options.id
          },
          success:(res)=>{
            that.setData({
              'isStar': res.data,
            })
          }
        })
      },fail(){
      }
    })
    wx.request({
      url: 'https://bewcf.info/article/queryOne',
      method:"get",
      data:{
        articleId:options.id
      },
      success:(res)=>{
        that.setData({
          'des':res.data
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

  }
})