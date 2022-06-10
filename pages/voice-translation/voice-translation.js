// pages/voice-translation/voice-translation.js
var plugin = requirePlugin("WechatSI")
let manager = plugin.getRecordRecognitionManager()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    h1: "600rpx",
    istouch: false,
    curr: 1,
    color2: 'red',
    startPoint:[0,0],
    css2:"",
    userId: '',
    styleA: 'transform:rotate(0deg);',
    screenWidth:'',
    array:[],
    sentence:[],
    color1:['red','orange','green','blue','purple'],
    sentencedetail:[],
    content:'郭运鹏是憨批',
    history:[],//输入历史记录
    normal:["你好","谢谢","我说不了话","我听不见","对不起","麻烦了","劳驾了","我叫郭运鹏"]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let scrollInfo = {
      prevDistance: 0, //滚动条的距离（默认为0）
      screenHalfwidth: wx.getSystemInfoSync().windowWidth / 2, 
    }
 
    this.data.scrollInfo = scrollInfo;
    var that = this;
    // 获取屏幕宽度
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          screenWidth: res.screenWidth
        })
      },
    })
    wx.getStorage({
      key: "userInfo",
      success:(res)=>{
        that.setData({
          userId: res.data.id
        })
        that.getSentence(that.data.userId);
        //console.log(that.data.userId)
      }
    })
    var that = this;

manager.onRecognize = function (res) {

       cons.log("current result", res.result)

    }

    manager.onStop = function (res) {

      console.log('识别开始');

      var result = res.result;

      var s = result.indexOf('。') //找到第一次出现下划线的位置

      result = result.substring(0,s)  //取下划线前的字符

      var searchType = that.data.searchType;

      wx.showToast({

        title: result,

      })

}

    manager.onError = function (res) {

      console.log('manager.onError')

      console.log(res) //报错信息打印

      wx.showToast({

        title: res.msg,

      })

      // UTIL.log("error msg", res.msg)

    }

  },
   //手指按下

touchdown_plugin: function () {

  var _this = this

  // UTIL.stopTTS();

  manager.start({

    duration: 30000,

    lang: "zh_CN"

  })

},

//手指松开

touchup_plugin: function (e) {

  var searchType = e.currentTarget.dataset.type;

  this.setData({

    searchType: searchType,

    background:  "#ED6C00",

    yysb:"长按语音识别"

  });

  manager.stop();

  wx.showToast({

    title: '正在识别……',

    icon: 'loading',

    duration: 2000

  })

},
  clear: function() {
    var that = this;
    var c = this.data.content;
    var h = that.data.history;
    h.push(c)
    that.setData({
      history:h,
      content:'',
    })
    console.log(that.data.history)
  },
  onChange(event) {
    // event.detail 为当前输入的值
    this.setData({
      content:event.detail
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

  },
  //获取常用语列表
  getSentence: function(e) {
    var that = this;
    console.log(this.data.userId)
    wx.request({
      url: 'https://bewcf.info/sentence/queryAll?userId='+e,
      success:(res)=>{
        console.log(res)
        var a = []
        var b = []
        var arr = []
        var i = 0
        for (var key in res.data) {
          arr.push(i)
          i++
          console.log(key);     //获取key值 
          a.push(key);
          console.log(a); //获取对应的value值
          b.push(res.data[key])
        }
        console.log(b)
        that.setData({
          sentence: a,
          sentencedetail:b,
          array:arr
        })
      }
    })
  },
  //选择卡片
  selecttarget: function(e) {
    var x = e.currentTarget.dataset;
    console.log(x)
    var that = this;
    var arr = that.data.color1;
    var sen = this.data.sentencedetail;
    console.log(arr[x.item%5])
    that.setData({
      color2: arr[x.item%5],
      normal: sen[x.item]
    })
  },
  //点击卡片旋转
  circle: function() {
    if(this.data.styleA=='transform:rotate(180deg);transition: .5s;') {
      this.setData({
        styleA: 'transform:rotate(0deg);transition: .5s;'
      })
    }
    else
      this.setData({
        styleA: 'transform:rotate(180deg);transition: .5s;'
      })
  },
  // tartRecord: function() {

  //   if (this.recorderManager == null) {
    
  //   this.recorderManager = wx.getRecorderManager();
    
  //   this.options = {
    
  //   duration: 10000,
    
  //   sampleRate: 16000,
    
  //   numberOfChannels: 1,
    
  //   encodeBitRate: 64000,
    
  //   format: 'mp3',
    
  //   frameSize: 50
    
  //   }
    
  //   }
    
  //   this.recorderManager.start(this.options);
    
  //   this.recorderManager.onStop((res) => {
    
  //   console.log(res)
    
  //   wx.uploadFile({
    
  //   url: 'https://https://bewcf.info/transform/speechRecognition',//将录音文件传到后台服务器
    
  //   filePath: res.tempFilePath,
    
  //   method:'POST',
    
  //   name: 'file',
    
  //   header: {
    
  //     'content-type': 'multipart/form-data'
    
  //   },
    
  //   success: function(res) {
    
  //     console.log(res);
    
  //   },
    
  //   fail: function() {
    
  //     console.log("语音识别失败");
    
  //   }
    
  //   })
    
  //   });
    
  //   },
    
  //   stopRecord: function() {
    
  //     this.recorderManager.stop()
    
  //   },
  
    startFn: function(e){
      var startPointX = this.data.screenWidth*0.08;
      var lastPointX = this.data.screenWidth*0.92;
      var len = this.data.normal.length+2;
      //var len = 7;
      var step = (lastPointX-startPointX)/len;
      for(var i=0;i<len;i++) {
        if(startPointX+step*i<e.touches[0].pageX&&e.touches[0].pageX<=startPointX+step*(i+1)) {
          this.setData({
            curr: i,
            startPoint:[e.touches[0].pageX,e.touches[0].pageY],
            istouch:true,
            h1:"760rpx"
          })
          
        }
      }
    },
     touchmoveFn: function(e){
      var curPoint = [e.touches[0].pageX,e.touches[0].pageY];
      var startPointX = this.data.screenWidth*0.08;
      var lastPointX = this.data.screenWidth*0.92;
      var len = this.data.normal.length+2;
      //var len = 7;
      var step = (lastPointX-startPointX)/len;
      if(curPoint[0]<=startPointX||curPoint[0]>lastPointX) {
        this.setData({
          i: -1
        })
      }
      for(var i=0;i<len;i++) {
        if(startPointX+step*i<curPoint[0]&&curPoint[0]<=startPointX+step*(i+1)) {
          this.setData({
            curr: i
          })
          this.data.scrollInfo.subLeft = startPointX+step*i; //元素一半宽度
          this.data.scrollInfo.subHalfWidth = 35; 
          this.moveTo();
        }
      }
    },
    endFn(){
      var con = this.data.content+this.data.normal[this.data.curr].content;
      this.setData({
        istouch:false,
        h1:"600rpx",
        content: con
      })
    },
  //移动导航栏
  moveTo: function() {
    let subLeft = this.data.scrollInfo.subLeft;
    let subHalfWidth = this.data.scrollInfo.subHalfWidth;
    let prevDistance = this.data.scrollInfo.prevDistance;
    let screenHalfwidth = this.data.scrollInfo.screenHalfwidth;
 
    let needScroll = subLeft - screenHalfwidth + subHalfWidth;
    let scrollLeft = needScroll + prevDistance;
 
    this.setData({
      scrollLeft: scrollLeft
    })
  },
 
  //记录滚动的距离
  scrollMove: function(e) {
 
    let distance = e.detail.scrollLeft;
    this.data.scrollInfo.prevDistance = distance
  },
  

    
})