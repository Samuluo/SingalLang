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
    wx.getStorage({
     key: 'userInfo',
     success(res){
       that.setData({
         'userId': res.data.id,
       })
       wx.request({
        url: 'http://bewcf.info:8081/plan/queryAll',
        method:"get",
        data:{
          userId:that.data.userId
        },
        success:(res)=>{
          that.setData({
            'plans':res.data,
          })
          console.log(res)
        }
      })
     }
   })
  },
  add: function(e){
    wx.navigateTo({
      url: '/pages/add-plan/add-plan?userId='+this.data.userId
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
  deleteplan: function(e) {
    var item = e.currentTarget.dataset.item
    wx.request({
      url: 'http://bewcf.info:8081/plan/removeOne?id='+item.id,
      method:"POST",
    })
  },
  changeplan: function(e) {
    var item = e.currentTarget.dataset.item
    console.log(item)
    wx.request({
      url: 'http://bewcf.info:8081/plan/switchPlan?id='+item.id,
      method:"POST",
      success:(res)=>{
        this.onLoad();
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