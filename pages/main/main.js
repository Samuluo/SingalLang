// pages/main/main.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrls: [

    ],
    currentIndex:0,
    types:[],
    typeColor:[],
    list:[]
  },
  swiperChange(e){
    console.log(e)
    this.setData({
      currentIndex:e.detail.current
    })
  },
  onLoad: function () {
    var that = this;
    wx.request({
      url: 'https://bewcf.info/article/queryAll',
      method:"get",
      data:{
        type:'首页'
      },
      success:(res)=>{
        that.setData({
          'list':res.data,
          'typeColor':'#83c6c2'
        })
      }
    })
   },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  showDetails:function(event){

    wx.navigateTo({
      url:'/pages/news-detail/news-detail?id='+event.currentTarget.dataset.id,
    })
  },
  typeChange:function(e){
    console.log(e)
    var that = this
    if(e.detail.title=="首页"){
      that.setData({
        'typeColor':'#83c6c2'
      })
    }
    if(e.detail.title=="新闻"){
      that.setData({
        'typeColor':'#eeb173'
      })
    }
    if(e.detail.title=="护耳"){
      that.setData({
        'typeColor':'#87c38f'
      })
    }
    wx.request({
      url: 'https://bewcf.info/article/queryAll',
      method:"get",
      data:{
        type:e.detail.title
      },
      success:(res)=>{
        that.setData({
          'list':res.data
        })
      }
    })
  },
  onReady: function () {
    var that = this;
    wx.request({
      url: 'https://bewcf.info/article/getAllType',
      method:"get",
      data:{
      },
      success:(res)=>{
        that.setData({
          'types':res.data
        })
      }
    })
    wx.request({
      url: 'https://bewcf.info/swiper/getIndex',
      method:"get",
      data:{
      },
      success:(res)=>{
        that.setData({
          'imgUrls':res.data
        })
      }
    })
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