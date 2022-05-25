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
    currentIndex:0
  },
  swiperChange(e){
    console.log(e)
    this.setData({
      currentIndex:e.detail.current
    })
  },
  onLoad: function () {

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
        console.log("succeed");
      }
    })
  },
  onReady: function () {
    var _this = this;
    wx.request({
      url: 'https://apis.baidu.com/showapi_open_bus/channel_news/search_news',
      header:{
          'apikey':'b1f1085ab345cf84d10749501027697f'
      },// 设置请求的 header
      data: {},
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      success: function(res){
        
        var newsFocusImgUrls = [];
        var newsList = [];

        var contestList = res.data.showapi_res_body.pagebean.contentlist;
        console.log(contestList);
        contestList.forEach(function(item,indexd,array){
          
          if (item.imageurls.length!=0){
            
            if (newsFocusImgUrls.length <= 5){
              newsFocusImgUrls.push(item.imageurls[0].url);
            }
            newsList.push(item);
            
          }
        });
        console.log(newsFocusImgUrls);
        console.log(newsList);
       
        _this.setData({
            'newsFocusImgUrls':newsFocusImgUrls
        })
        _this.setData({
            'newsList':newsList
        })
      },
      fail: function() {
        // fail
      },
      complete: function() {
        // complete
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