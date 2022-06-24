// pages/test/test.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userId:1000,
    plans:[],
    empty:false,
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
        url: 'https://bewcf.info/plan/queryAll',
        method:"get",
        data:{
          userId:that.data.userId
        },
        success:(res)=>{
          that.setData({
            'plans':res.data,
          })
          if(res.data.length==0){
            that.setData({
              'empty':true,
            })
          }
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
      url: 'https://bewcf.info/plan/switchPlan',
      method:"post",
      data:{
        id:e.currentTarget.dataset.item
      },
      header: {
        "content-type": "application/x-www-form-urlencoded" 
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
    var that = this
    var item = e.currentTarget.dataset.item
    wx.showModal({
      title: '提示',
      content: '确认删除该计划么',
      success (res) {
        if (res.confirm) {
          wx.request({
            url: 'https://bewcf.info/plan/removeOne?id='+item.id,
            method:"POST",
            data:{
              id:e.currentTarget.dataset.item
            },
            header: {
              "content-type": "application/x-www-form-urlencoded" 
            },
            success:(res)=>{
              that.onShow()
              that.setData({
                everyday:that.data.amount
              })
              wx.showToast({
                title: '删除成功',
                icon: 'none',
                duration: 1000,
                success: function () {

                  }
                })
            }
          })
        }else if (res.cancel) {
        }
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
    var that = this
    wx.request({
      url: 'https://bewcf.info/plan/queryAll',
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