// pages/myWords/myWords.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    types:["我的收藏","我的错词"],
    starList:[],
    wrongList:[],
    userId:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    var that = this
    wx.getStorage({
      key: 'userInfo',
      success(res){
        that.setData({
          'userId': res.data.id,
        })
        wx.request({
          url: 'https://bewcf.info/starWord/queryAll',
          method:"get",
          data:{
            userId:that.data.userId,
          },
          success:(res)=>{
            that.setData({
              'starList': res.data,
            })
          }
        })
        wx.request({
          url: 'https://bewcf.info/mistakeWord/queryAll',
          method:"get",
          data:{
            userId:that.data.userId,
          },
          success:(res)=>{
            that.setData({
              'wrongList': res.data,
            })
          }
        })
      },fail(){
      }
    })
  },
  toTheWord :function(e){
    wx.navigateTo({
      url: '/pages/word-detail/word-detail?id='+e.currentTarget.dataset.item.id,
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})