// pages/main/main.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isTiptrue: true,
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
  onLoad: function (query) {
    var that = this;
    let firstOpen = wx.getStorageSync("loadOpen")
    console.log("是否首次打开本页面==",firstOpen)
    if (firstOpen == undefined || firstOpen == '') { //根据缓存周期决定是否显示新手引导
      this.setData({
        isTiptrue: true,
      })
    } else {
      this.setData({
        isTiptrue: false,
      })
    }
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
   closeThis(e){
    console.log("s")
      wx.setStorage({
        key: 'loadOpen',
        data: 'OpenTwo'
      })
      this.setData({
        isTiptrue:false
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
    if(e.detail.title=="乡村"){
      that.setData({
        'typeColor':'#eeb173'
      })
    }
    if(e.detail.title=="护耳"){
      that.setData({
        'typeColor':'#87c38f'
      })
    }
    if(e.detail.title=="政策"){
      that.setData({
        'typeColor':'hsl(286, 54%, 50%);'
      })
    }
    if(e.detail.title=="公益"){
      that.setData({
        'typeColor':'red'
      })
    }
    if(e.detail.title=="招聘"){
      that.setData({
        'typeColor':'rgb(236, 173, 194);'
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