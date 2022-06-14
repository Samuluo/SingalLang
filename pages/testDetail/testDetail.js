// pages/testDetail/testDetail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    testListL2:[],
    testListR2:[],
    testIndex:0,
    DBIndex:0,
    earIndex:0,
    resultList:[],
    processList:['通知','调音','测试','结果'],
    iconIndex:2,
    gradientColor: {
      '0%': '#c1f4f4',
      '100%': '#83c6c2',
    },
    item:0,
    play:{
      // 当前时间
      currentTime:'00.00',
      // 歌曲总时间
      duration:'00.00',
      // 播放进度
      percent:0,
      Hz:"",
      DB:""
    },
  },
  catchTouchMove:function(res){

    return false
  
  },
  nextStep:function(res){
    var that = this
    that.setData({
      item:that.data.item+1
    })
  },
  goText:function(){
    var that = this
    that.setData({
      item:that.data.item+1
    })
    this.audioCtx=wx.createInnerAudioContext()
    // 播放失败检测
    this.audioCtx.onError(function(){
      console.log("播放失败:"+that.audioCtx.src)
    })
    this.setMusic2()
  },
  audioCtx:null,
  setMusic2:function(){
    var that = this
    var music=this.data.testListL2[2][2].url
    console.log(this.data.testListL2[2][2].url)
   this.audioCtx.src=music
   that.setData({
     "play.currentTime":'00:00',
     "play.duration":'00:00',
     "play.percent":0,
   })
   this.play()
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady:function(){
    var that = this
    //获取音频播放对象
        wx.request({
      url: 'https://bewcf.info/listen/getListeningTest',
      method:'GET',
      success: (res) => {
        for (var i in res.data) {
          if(i=='250'||i=='500'||i=='1000'||i=='2000'||i=='3000'||i=='4000'){
            that.data.testListR2.push(res.data[i])
          }
          if(i=='250R'||i=='500R'||i=='1000R'||i=='2000R'||i=='3000R'||i=='4000R'){
            that.data.testListL2.push(res.data[i])
          }
        }
        console.log(that.data.testListL2)
        console.log(that.data.testListR2)
      }
    })
  },
  beginTest:function(){
    var that = this
    that.setData({
      item:that.data.item+1
    })
    this.audioCtx=wx.createInnerAudioContext()
    // 播放失败检测
    this.audioCtx.onError(function(){
      console.log("播放失败:"+that.audioCtx.src)
    })
    this.setMusic()
  },
 setMusic:function(){
   var that = this
   if(this.data.earIndex==0){
     var music=this.data.testListL2[this.data.testIndex][this.data.DBIndex].url
   }else{
    var music=this.data.testListR2[this.data.testIndex][this.data.DBIndex].url
   }
   if(that.data.testIndex==0){
     var Hz = 250
   }else if(that.data.testIndex==1){
    var Hz = 500
  }else if(that.data.testIndex==2){
    var Hz = 1000
  }else if(that.data.testIndex==3){
    var Hz = 2000
  }else if(that.data.testIndex==4){
    var Hz = 3000
  }
  else if(that.data.testIndex==5){
    var Hz = 4000
  }
   var DB = that.data.DBIndex*10+10
  this.audioCtx.src=music
  that.setData({
    "play.currentTime":'00:00',
    "play.duration":'00:00',
    "play.percent":0,
    "play.Hz":Hz,
    "play.DB":DB
  })
  this.play()
 },
  play:function(){
    var that = this
    this.audioCtx.onCanplay(() => {
          that.audioCtx.play() // play()方法看上去能重新触发onTimeUpdate()回调
    })
    function formatTime(time){    
      var minute=Math.floor(time/60)%60;
      var second=Math.floor(time)%60;
      return(minute<10? '0'+minute:minute)+":"+
      (second<10?'0'+second:second)
    }
    this.audioCtx.onPlay(function(){})
      this.audioCtx.onTimeUpdate(function(){
        that.setData({
          //获取总时间
          'play.duration':formatTime(that.audioCtx.duration-that.audioCtx.currentTime),
          //当前歌曲播放的时长
          'play.currentTime':formatTime(that.audioCtx.currentTime),
          'play.percent':that.audioCtx.currentTime/that.audioCtx.duration*100
        })
      })
  },
  canHear:function(e){
    var that = this
    if(that.data.testIndex==5){
        if(that.data.earIndex==0){
          that.data.resultList.push(that.data.DBIndex)
          that.setData({
          //获取总时间
          'earIndex':1,
          'testIndex':0,
          'DBIndex':0,
          })
        }else{
          that.data.resultList.push(that.data.DBIndex)
          console.log(that.data.resultList)
          this.nextStep()
        }
      }else{
        that.data.resultList.push(that.data.DBIndex)
        that.setData({
        //获取总时间
        'testIndex':that.data.testIndex+1,
        'DBIndex':0,
        })
      }
      this.setMusic()
    },
  cantHear:function(e){
    var that = this
    if(that.data.DBIndex==8){
      if(that.data.testIndex==5){
        if(that.data.earIndex==0){
          that.data.resultList.push(that.data.DBIndex)
          that.setData({
          //获取总时间
          'earIndex':1,
          'testIndex':0,
          'DBIndex':0,
          })
        }else{
          that.data.resultList.push(that.data.DBIndex)
          console.log(that.data.resultList)
          this.nextStep()
        }
      }else{
        that.data.resultList.push(that.data.DBIndex)
        that.setData({
        //获取总时间
        'testIndex':that.data.testIndex+1,
        'DBIndex':0,
        })
      }
    }else{
      that.setData({
      //获取总时间
        'DBIndex':that.data.DBIndex+1,
      })
    }
    this.setMusic()
  },
  // 播放列表中的换曲功能
  replay:function(e){
    this.audioCtx.pause()
    this.audioCtx.seek(0)
    setTimeout(() => {
      this.play()
    }, 500); 
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