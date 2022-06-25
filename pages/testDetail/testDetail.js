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
   options: {
    title: {
      text: '测试结果'
    },
    tooltip: {
      trigger: 'axis'
    },
    legend: {
      data: ['左耳', '右耳', 'Line 1', 'Direct', 'Search Engine']
    },
    grid: {
      show: true,
      bottom: 20,
      top: 20,
      left: 40,
      right: 0
  },
    toolbox: {
      feature: {
        saveAsImage: {}
      }
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: [250,500,1000,2000,3000,4000]
    },
    yAxis: {
      type: 'value',
    },
    series: [
      {
        name: '左耳',
        type: 'line',
        stack: 'Total',
        data: []
      },
      {
        name: '右耳',
        type: 'line',
        stack: 'Total',
        data: []
      },
    ]
 }

  },
  catchTouchMove:function(res){

    return false
  
  },
  nextStep:function(res){
    var that = this
    
    that.setData({
      item:that.data.item+1
    })
    if(that.data.item===3) that.getCharts();
  },
  getCharts: function() {
    var that = this;
    var res = that.data.resultList;
    let lres = []
    let rres = []
    for (var i=0;i<res.length;i++) {
      res[i] = res[i]*10+10;
      if(i<6) lres.push(res[i])
      else rres.push(res[i])
    }
    that.setData({
      options: {
        grid: {
          show: true,
          bottom: 60,
          top: 60,
          left: 50,
          right: 60
      },
        tooltip: {
          trigger: 'axis'
        },
        color: ['', '', '#19fa28', '#36ab60', '#f6ef37','red'],
        legend: {
          data: ['左耳', '右耳','健听区','轻损区','中损区','重损区'],
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        xAxis: {
          type: 'category',
          name: '音调/Hz',
          nameLocation:'middle',
          nameTextStyle:{ 
              fontSize:10,  
              padding:10
          },
          boundaryGap: false,
          data: [250,500,1000,2000,3000,4000]
        },
        yAxis: {
          type: 'value',
          name: '分贝/DB',
          nameLocation:'middle',
          nameTextStyle:{ 
              fontSize:10,  
              padding:10
          },
        },
        dataZoom: [
          // ...
        ],
        series: [
          {
            name: '左耳',
            type: 'line',
            data: lres,
            lineStyle: {
              normal: {
                color: 'red',
                width: 4,
                
              }
            }
          },
          {
            name: '右耳',
            type: 'line',
            data: rres,
            lineStyle: {
              normal: {
                color: 'blue',
                width: 4,
                
              }
            }
          },
          
           
                {
            name: '健听区',
            type: 'line',
            stack: 'Total',
            smooth: true,
            lineStyle: {
              width: 0
            },
            showSymbol: false,
            areaStyle: {
              color:'#19fa28',
              opacity: 0.4
          
            },
            emphasis: {
              focus: 'series'
            },
            data: [25, 25, 25, 25, 25, 25]
          },
          {
            name: '轻损区',
            type: 'line',
            stack: 'Total',
            smooth: true,
            lineStyle: {
              width: 0
            },
            showSymbol: false,
            areaStyle: {
              color:'#36ab60',
              opacity: 0.4,
            },
            emphasis: {
              focus: 'series'
            },
            data: [15, 15, 15, 15, 15, 15]
          },
          {
            name: '中损区',
            type: 'line',
            stack: 'Total',
            smooth: true,
            lineStyle: {
              width: 0
            },
            showSymbol: false,
            areaStyle: {
              color:'#f6ef37',
              opacity: 0.4,
              focus: 'series'
            },
            data: [15, 15, 15, 15, 15, 15]
          },
          {
            name: '重损区',
            type: 'line',
            stack: 'Total',
            smooth: true,
            lineStyle: {
              width: 0
            },
            showSymbol: false,
            areaStyle: {
              color:'red',
              opacity: 0.4,
            },
            emphasis: {
              focus: 'series'
            },
            data: [30, 30, 30, 30, 30, 30]
          },
        ]
     }
    })
  },
  audioCtx:null,
  goText:function(){
    console.log("我开始播放测音")
    var that = this
    that.setData({
      item:that.data.item+1
    })
    this.audioCtx=wx.createInnerAudioContext()
    // 播放失败检测
    this.audioCtx.onError(function(e){
      console.log(e)
      console.log("播放失败:"+that.audioCtx.src)
    })
    this.setMusic2()
  },
  setMusic2:function(){
    console.log("set阶段")
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
    this.audioCtx.onError(function(e){
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
    setTimeout(() => {
      that.audioCtx.play()
    }, 500); 
   /* this.audioCtx.onCanplay(() => {
      console.log(1)
          that.audioCtx.play() // play()方法看上去能重新触发onTimeUpdate()回调
    })*/
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
    console.log("我重播了")
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