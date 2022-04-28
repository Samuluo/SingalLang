// pages/main-learn/main-learn.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    todayLearned:[],
    userId:[],
    planN:[],
    plans:[],
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
        dictionary:[],
        dictionaryName:[],
        dictionaryImg:[],
    },
    dictionary:{
      name:'HSK-1级',
      picture:"/images/loadpicture.png",
      condition:"1",
      des:'一本初级词典',
      finish:'0',
    }
  },
  addplan: function(e){
    wx.navigateTo({
      url: '/pages/add-plan/add-plan?userId='+this.data.userId
    })
  },
  beginLearn:function(e){
    wx.navigateTo({
      url: '/pages/learn-word/learn-word?userId='+this.data.userId
    })
  },
  adjust: function(e){
      wx.navigateTo({
        url: '/pages/adjustPlan/adjustPlan?plan='+JSON.stringify(e.currentTarget.dataset.item),
      })
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
          url: 'http://bewcf.info:8081/plan/queryAll',
          method:"get",
          data:{
            userId:that.data.userId
          },
          success:(res)=>{
            that.setData({
              'plans':res.data,
              'planN':res.data.length
            })
          }
        })
        wx.request({
          url: 'http://bewcf.info:8081/plan/queryNow',
          method:"get",
          data:{
            userId:that.data.userId
          },
          success:(res)=>{
            that.setData({
              'plan.id':res.data.id,
              'plan.amount':res.data.amount,
              'plan.completed':res.data.completed,
              'plan.dictionaryId':res.data.dictionaryId,
              'plan.dictionary': res.data.dictionary,
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

      }
    })

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    var that = this
    wx.request({
      url: 'http://bewcf.info:8081/word/getTodayLearned',
      method:"get",
      data:{
        userId:that.data.userId
      },
      success:(res)=>{
        that.setData({
          'todayLearned':res.data
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var that = this
    setTimeout(function() {
      wx.request({
        url: 'http://bewcf.info:8081/word/getTodayLearned',
        method:"get",
        data:{
          userId:that.data.userId
        },
        success:(res)=>{
          console.log(res.data)
          that.setData({
            'todayLearned':res.data
          })
        }
        })
    }, 100);
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