// pages/learn-word/learn-word.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    words:[],
    wordIds:[],
    completeN:[],
    toCompletedN:[],
    userId:[],
    dictionary:[{
      name:'HSK-1级',
      picture:"/images/loadpicture.png",
      condition:"1",
      des:'一本初级词典'
    },{
      name:'HSK-2级',
      picture:"/images/loadpicture.png",
      condition:"1",
      des:'一本中级词典'
    },{
      name:'HSK-2级',
      picture:"/images/loadpicture.png",
      condition:"2",
      des:'一本高级词典'
    },{
      name:'HSK-2级',
      picture:"/images/loadpicture.png",
      condition:"2",
      des:'一本高级词典'
    }]
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
    console.log("res")
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