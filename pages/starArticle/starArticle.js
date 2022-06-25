// pages/main/main.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    empty:'',
    userId:'',
    imgUrls: [

    ],
    currentIndex:0,
    types:[],
    typeColor:'#83c6c2',
    currentType:'首页',
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
    wx.getStorage({
      key: 'userInfo',
      success(res){
        that.setData({
          'userId': res.data.id,
        })
        wx.request({
          url: 'https://bewcf.info/article/queryAll',
          method:"get",
          data:{
            userId:that.data.userId,
            type:that.data.currentType,
            isStar:1
          },
          success:(res)=>{
            that.setData({
              'list':res.data,
              'typeColor':'#83c6c2'
            })
          }
        })
      },fail(){
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
        'currentType':e.detail.title,
        'typeColor':'#83c6c2'
      })
    }
    if(e.detail.title=="新闻"){
      that.setData({
         'currentType':e.detail.title,
        'typeColor':'#eeb173'
      })
    }
    if(e.detail.title=="护耳"){
      that.setData({
        'currentType':e.detail.title,
        'typeColor':'#87c38f'
      })
    }
    wx.request({
      url: 'https://bewcf.info/article/queryAll',
      method:"get",
      data:{
        userId:that.data.userId,
        isStar:1,
        type:e.detail.title
      },
      success:(res)=>{
        that.setData({
          'list':res.data,
        })
       if(res.data.length==0){
          that.setData({
            'empty':true
          })
        }else{
          that.setData({
            'empty':false
          })
        }
      }
    })
    console.log(that.data.empty)
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
    var that = this;
    wx.getStorage({
      key: 'userInfo',
      success(res){
        that.setData({
          'userId': res.data.id,
        })
        wx.request({
          url: 'https://bewcf.info/article/queryAll',
          method:"get",
          data:{
            userId:that.data.userId,
            type:that.data.currentType,
            isStar:1
          },
          success:(res)=>{
            that.setData({
              'list':res.data,
            })
           if(res.data.length==0){
              that.setData({
                'empty':true
              })
            }else{
              that.setData({
                'empty':false
              })
            }
          }
        })
      },fail(){
      }
    })
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