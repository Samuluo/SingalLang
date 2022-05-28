// pages/main/main.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrls: [
      "https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=2512412073,484693686&fm=27&gp=0.jpg",
      "https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=231620273,2622968107&fm=27&gp=0.jpg",
      "https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=281531042,273318123&fm=27&gp=0.jpg",
      "http://img4.imgtn.bdimg.com/it/u=2731345960,2613387946&fm=26&gp=0.jpg"
    ],
    currentIndex:0,
    types:[],
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
          'list':res.data
        })
      }
    })
   },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  showDetails:function(event){
    console.log(event);
    var data = JSON.stringify(event.currentTarget.dataset.content);
    wx.navigateTo({
      'url':'../news_details/news-details?newsDetails='+data,
      'success':function(){
      }
    })
  },
  typeChange:function(e){
    var that = this;
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