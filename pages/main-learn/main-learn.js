// pages/main-learn/main-learn.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    todayLearned:[],
    userId:1000,
    plan:{
        id:[],
        userId:[],
        dictionaryId:[],
        amount:[],
        porder:[],
        startTime:[],
        completed:[],
        totalNumber:[],
        learnedNumber:[],
        state:[],
        needday:[],
        todayAmount:[],
    },
    dictionary:{
      name:'HSK-1级',
      picture:"/images/loadpicture.png",
      condition:"1",
      des:'一本初级词典',
      finish:'0',
    }
  },
  adjust: function(e){
      console.log(e.currentTarget.dataset.item)
      wx.navigateTo({
        url: '/pages/adjustPlan/adjustPlan?plan='+JSON.stringify(e.currentTarget.dataset.item),
      })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
     var that = this
     wx.request({
      url: 'http://bewcf.info:8081/plan/queryNow',
      method:"get",
      data:{
        userId:this.data.userId
      },
      success:(res)=>{
        that.setData({
          'plan.id':res.data.id,
          'plan.amount':res.data.amount,
          'plan.completed':res.data.completed,
          'plan.dictionaryId':res.data.dictionaryId,
          'plan.learnedNumber':res.data.learnedNumber,
          'plan.porder':res.data.porder,
          'plan.startTime':res.data.startTime,
          'plan.state':res.data.state,
          'plan.totalNumber':res.data.totalNumber,
          'plan.userId':res.data.userId,
          'plan.todayAmount':res.data.todayAmount,
        })
      }
    })
    wx.request({
      url: 'http://bewcf.info:8081/word/getTodayLearned',
      method:"get",
      data:{
        userId:this.data.userId
      },
      success:(res)=>{
        console.log(res)
        that.setData({
          'todayLearned':res.data
        })
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