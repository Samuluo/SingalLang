// pages/search/search.js

Page({

  /**
   * 页面的初始数据
   */
  data: {
    oneWordList:[],
    WholeWordList:[],
    id:11,
    columns: [
      {
        values: 2,
        className: 'column1',
      },
      {
        values: 3,
        className: 'column2',
      }
    ], 
  },
  /**
   * 生命周期函数--监听页面加载
   */

  onLoad: function (options) {
    var that = this
    wx.request({
      url: 'http://bewcf.info:8081/plan/queryAllWord',
      method:"get",
      data:{
        id:this.data.id
      },
      success:(res)=>{
        console.log(res)
        that.setData({
          'WholeWordList':res.data
        })
      }
    })
  },

  onChoose(e) {
    console.log('onChoose', e)
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