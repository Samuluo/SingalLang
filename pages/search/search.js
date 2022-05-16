// pages/search/search.js

Page({

  /**
   * 页面的初始数据
   */
  data: {
    value:'',
    nowValue:'',
    findWord:[],
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
   * 生命周期函数--监听页面加载i
   */
  toTheWord:function(e){
    console.log(e)
    wx.navigateTo({
      url: '/pages/word-detail/word-detail?id='+e.currentTarget.dataset.item.id,
    })
  },
  toTheWord2:function(e){
    wx.navigateTo({
      url: '/pages/word-detail/word-detail?id='+e.currentTarget.dataset.item.id,
    })
  },
  onLoad: function (options) {
    var that = this
    wx.request({
      url: 'http://bewcf.info:8081/dictionary/getAllWord',
      method:"get",
      data:{
        dictionaryId:3
      },
      success:(res)=>{
        that.setData({
          'WholeWordList':res.data
        })
      }
    })
  },
  onChange(e){
    var that = this
    if(e.detail!=''){
    wx.request({
      url: 'http://bewcf.info:8081/word/find',
      method:"get",
      data:{
        findWord:e.detail
      },
      success:(res)=>{
        that.setData({
          'findWord':res.data,
          'nowValue':e.detail
        })
        console.log(that.data.findWord)
      }
    })
    }else if(e.detail==''){
      that.setData({
        'nowValue':'',
        'value':''
      })
    }
  },
  onClear:function(e){
    var that = this
    that.setData({
      'nowValue':'',
      'value':''
    })
  },
  onBlur:function(e){
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