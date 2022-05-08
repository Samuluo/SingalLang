// pages/main-learn/main-learn.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    answerpool:[],
    todayword:{},
    color1:'',
    color2:'',
    color3:'',
    todayLearned:[],
    userId:[],
    planN:[],
    plans:[],
    Day:[],
    Year:[],
    Month:[],
    continuday:[],
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
    finish:[]
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
  getTime: function(){
    var that =this
    var timestamp = Date.parse(new Date());
    timestamp = timestamp / 1000;
    //获取当前时间
    var n = timestamp * 1000;
    var date = new Date(n);
    //年
    var Y = date.getFullYear();
    //月
    var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);
    //日
    var D = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
    that.setData({
      'Year':Y,
      'Month':M,
      'Day':D
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
    that.getTime();
    wx.request({
      url: 'http://bewcf.info:8081/word/getRandomOne',
      method:"GET",
      success:(res)=>{
        console.log(res.data);
        this.setData({
          todayword:res.data
        })
        let answer = [res.data.answer,res.data.answer2,res.data.answer3,res.data.answer4];
        console.log(answer)
        answer = this.shuffle(answer);
        this.setData({
          answerpool: answer
        })
       
      }
    })
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
        console.log(that.data.plan.todayAmount)
        console.log(that.data.todayLearned)
        if(that.data.plan.todayAmount==that.data.todayLearned){
          that.setData({
            'finish':1
          })
        }else{
          that.setData({
            'finish':0
          })
        }
      }
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var that = this
    console.log(that.data.plan.todayAmount)
    console.log(that.data.todayLearned)

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
          if(that.data.plan.todayAmount==that.data.todayLearned){
            that.setData({
              'finish':1
            })
          }else{
            that.setData({
              'finish':0
            })
          }
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

  },
  fighteveryday: function() {
    this.setData({
      color1: '#46CA53',
      color2: '#F1FBF2',
      color3: '#F1FBF2'
    })
  },
  wordtrain: function() {
    this.setData({
      color1: '#F1FBF2',
      color2: '#46CA53',
      color3: '#F1FBF2'
    })
  },
  vocabularytext: function() {
    this.setData({
      color1: '#F1FBF2',
      color2: '#F1FBF2',
      color3: '#46CA53'
    })
  },
/**
 * 数组排序算法
 */
shuffle: function(arr){
  var l = arr.length
  var index, temp
  while(l>0){
      index = Math.floor(Math.random()*l)
      temp = arr[l-1]
      arr[l-1] = arr[index]
      arr[index] = temp
      l--
  }
  return arr
}
})