// pages/search/search.js

Page({

  /**
   * 页面的初始数据
   */
  data: {
    title:'分类词典',
    dictionaries:[],
    kindList:[],
    historySearch:[],
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
  choseDictionary:function(e){
    var that = this
    console.log(e)
    that.setData({
      'title':e.currentTarget.dataset.item.name
    })
    wx.request({
      url: 'https://bewcf.info/dictionary/getAllWord',
      method:"get",
      data:{
        dictionaryId:e.currentTarget.dataset.item.id
      },
      success:(res)=>{
        console.log(res)
        that.setData({
          'kindList':res.data
        })
      }
    })
  },
  titleChange:function(e){
    var that = this
    that.setData({
      'title':"分类词典"
    })
  },
  toTheWord:function(e){
    console.log(e)
    wx.navigateTo({
      url: '/pages/word-detail/word-detail?id='+e.currentTarget.dataset.item.id,
    })
  },
  toTheWord2:function(e){
    var that = this
    wx.navigateTo({
      url: '/pages/word-detail/word-detail?id='+e.currentTarget.dataset.item.id,
    })
    wx.getStorage({
      key: 'historySearch',
      success(res){
        let historySearch=[]
        for(var i = 0; i<res.data.length;i++){
          if(res.data[i].id!=e.currentTarget.dataset.item.id){
            historySearch.push(res.data[i])
          }
        }
        historySearch.push(e.currentTarget.dataset.item)
        console.log(historySearch)
        wx.setStorage({
          key: 'historySearch' ,
          data: historySearch,
          success(res){
            that.setData({
              'historySearch':historySearch
            })
          }
        })
      },fail(res){
        let historySearch=[]
        historySearch.push(e.currentTarget.dataset.item)     
        wx.setStorage({
          key: 'historySearch' ,
          data: historySearch
        })
        that.setData({
          'historySearch':historySearch
        })
      }
    })
  },
  removeHistory:function(e){
    var that = this
    wx.removeStorage({
      key: 'historySearch',
      success: function(res) {
        that.setData({
          'historySearch':[]
        })
      },
    })
  },
  onLoad: function (options) {
    var that = this
    wx.getStorage({
      key: 'historySearch',
      success(res){
        that.setData({
          'historySearch':res.data
        })
      },fail(res){
      }
    })
    wx.request({
      url: 'https://bewcf.info/dictionary/getAllWord',
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
    wx.request({
      url: 'https://bewcf.info/dictionary/queryAll',
      method:"get",
      data:{
      },
      success:(res)=>{
        that.setData({
          'dictionaries':res.data
        })
      }
    })
  },
  onChange(e){
    var that = this
    if(e.detail!=''){
    wx.request({
      url: 'https://bewcf.info/word/find',
      method:"get",
      data:{
        findWord:e.detail
      },
      success:(res)=>{
        that.setData({
          'findWord':res.data,
          'nowValue':e.detail
        })
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