// pages/test/test.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userId:1000,
    picture:"/images/loadpicture.png",
    plans:[],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    wx.request({
      url: 'http://bewcf.info:8081/plan/queryAll',
      method:"get",
      data:{
        userId:this.data.userId
      },
      success:(res)=>{
        that.setData({
          'plans':res.data,
        })
        console.log(this.data.plans)
      }
    })
  },
  add: function(e){
    wx.navigateTo({
      url: '/pages/add-plan/add-plan'
    })
  },
  switch: function(e){
  
    var that = this
    wx.request({
      url: 'http://bewcf.info:8081/plan/switchPlan',
      method:"post",
      data:{
        id:e.currentTarget.dataset.item
      },
      success:(res)=>{
        console.log(res)
        wx.reLaunch({
          url: '/pages/main-learn/main-learn'
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