
const app =getApp()
var plugin = requirePlugin("WechatSI")
let manager = plugin.getRecordRecognitionManager()
const innerAudioContext = wx.createInnerAudioContext()
Page({ 
  /**
   * 页面的初始数据
   */
  data: {
    showhistory: 0,
    tips1:'滑动',
    tips2:'选择',
    isUsed: 0,
    backgroundcolor:'#ffffff',
    textcolor:'#83c6c2',
    font:50,
    showConfig:false,
    bigitem:0,
    smallitem:0,
    h1: "650rpx",
    istouch: '',
    curr: 1,
    color2:  '#83c6c2',
    startPoint:[0,0],
    css2:"",
    userId: '',
    styleA: 'transform:rotate(0deg);',
    screenWidth:'',
    array:[],
    sentence:[],
    color1:['#83c6c2','#3f81c1','#36ab60','#ea986c','#be8dbd'],
    sentencedetail:[],
    content:'',
    history:[],//输入历史记录
    normal:["你好","谢谢","我说不了话","我听不见","对不起","麻烦了","劳驾了","我叫郭运鹏"],
    configitem:1,
    scrollInfo:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let scrollInfo = {
      prevDistance: 0, //滚动条的距离（默认为0）
      screenHalfwidth: (wx.getSystemInfoSync().windowWidth*0.84) / 2, 
    }
 
    this.data.scrollInfo = scrollInfo;
    var that = this;
    // 获取屏幕宽度
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          screenWidth: res.screenWidth,
          scrollInfo: scrollInfo
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
        that.getHistory(that.data.userId)
        //console.log(that.data.userId)
      }
    })
    this.initRecord();
  },
  showall: function() {
    var that = this;
    if(that.data.showhistory===0) {
      that.setData({
        showhistory: 1
      })
    }else {
      that.setData({
        showhistory: 0
      })
    }
    
  },
  initRecord: function() {    
    var that = this;
    //有新的识别内容返回，则会调用此事件
    manager.onRecognize = function (res) {      
      console.log("current result", res.result)
    }    
    //正常开始录音识别时调用    
    manager.onStart = function (res) {
      //提示录音开始
      wx.showToast({
        title: '开始录音',      
      })      
      console.log("成功开始录音识别", res)    
    }    
    //识别错误事件    
    manager.onError = function (res) {   
      console.error(res.msg)  
      if(res.msg=="record manager record failed"){
        wx.showModal({
          title: '警告',
          content: '你否认了小程序发起的授权请求，前往个人信息授权界面进行确认',
          success (res) {
          }
        })
      } 
      console.error("error msg", res.msg)    
    }    
    //识别结束事件    
    manager.onStop = function (res) {      
       console.log("record file path", res.tempFilePath)
       console.log(res)      
       console.log("result", res.result)            
      if(res.result == ''){        
      //录音内容为空时      
      wx.showModal({
      title: '提示',
      content: '不好意思，没听清',
      showCancel: false,
      success: function (res) {}        
      })
      return;      
      }     
      else{       
      //不为空时提示开始识别        
      wx.showToast({
      title: '正在识别',          
      icon: 'loading'        
      })        
      var text = res.result.replace(/，/, ' ').replace(/。/gi, '');//正则去除识别结果结尾的句号        
      //将识别结果显示在输入框        
      that.setData({          
      content: text        
      })                          
      }
    }
  },              
    //按住说话  
    touchStart: function(e){ 
      console.log(e)
    this.setData({//用来变换按钮样式
    //录音状态      console.log(e)
    voiceStyle: "voiceStyleDown"    
    })    
    wx.showLoading({
      title: '正在识别',
    })

    //开始识别    
    manager.start({      
    lang: 'zh_CN',    //识别的语言，目前支持zh_CN en_US zh_HK sichuanhua
    duration: 60000, //指定录音的时长，单位ms，最大为60000。如果传入了合法的 duration ，在到达指定的 duration 后会自动停止录音
    })  
    },  
    //松开结束  
    touchEnd: function(e){    
      wx.hideLoading()
    this.setData({//用来变换按钮样式         
    voiceStyle: "voiceStyle"    
    })
    //结束识别    
    manager.stop();  
    },
  clear: function() {
    var that = this;
    that.setData({
      content:'',
    })
  },
  savesentence:function(){
    var that = this
    console.log(that.data.userId)
    console.log(that.data.content)
    var c = this.data.content;
    var h = that.data.history;
    wx.request({
      url: 'https://bewcf.info/record/add',
      method:"post",
      data:{
        userId:that.data.userId,
        sentence:that.data.content
      },
      header: {
        "content-type": "application/x-www-form-urlencoded" 
      },
      success:(res)=>{
        that.getHistory()
      }
    })
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
    var that = this
    wx.getStorage({
      key: "userInfo",
      success:(res)=>{
        that.setData({
          userId: res.data.id
        })
        that.getSentence(that.data.userId);
        that.getHistory(that.data.userId)
        //console.log(that.data.userId)
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

  },
  // 文字转语音（语音合成）
  wordtospeak: function (e) {
    var that = this

    var content = that.data.content;

    if (content==''){
      wx.showToast({
        title: '请输入文字',
        image: '/images/fail.png',
      })
    }
    
    plugin.textToSpeech({
      lang: "zh_CN",
      tts: true,
      content: content,
      success: function (res) {
        innerAudioContext.autoplay = true
        innerAudioContext.src = res.filename
        innerAudioContext.onPlay(() => {
          console.log('开始播放')
        })
        
        wx.showLoading({
          title: '正在播放',
        })

        innerAudioContext.onError((res) => {
          if (res) {
            wx.hideLoading(),
              wx.showToast({
                title: '文本格式错误',
                image: '/images/fail.png',
              })
          }
        })

        innerAudioContext.onEnded(function(){
          wx.hideLoading()
        })
        console.log("succ tts", res.filename)
      },
      fail: function (res) {
        console.log("fail tts", res)
      },
    })
  },
  getHistory:function(){
    var that = this;
    wx.request({
      url: 'https://bewcf.info/record/get',
      method:"get",
      data:{
        userId:that.data.userId
      },
      success:(res)=>{
        var history = []
        for (var key in res.data) {
          history.push(res.data[key]);
        }
        that.setData({
          history: history,
        })
      }
    })
  },
  //获取常用语列表
  getSentence: function(e) {
    var that = this;
    wx.request({
      url: 'https://bewcf.info/sentence/queryAll?userId='+e,
      success:(res)=>{
        var a = []
        var b = []
        var arr = []
        var i = 0
        for (var key in res.data) {
          arr.push(i)
          i++
          a.push(key);
          b.push(res.data[key])
        }
        that.setData({
          sentence: a,
          sentencedetail:b,
          array:arr,
          normal: b[0]
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
     if(this.data.bigitem==0){
      this.setData({
        bigitem: 1,
      })
     }else if(this.data.bigitem==1){
      this.setData({
        bigitem: 0,
      })
     }
    if(this.data.styleA=='transform:rotate(180deg);transition: .5s;') {
      this.setData({
        styleA: 'transform:rotate(0deg);transition: .5s;',
      })
    }
    else
      this.setData({
        styleA: 'transform:rotate(180deg);transition: .5s;'
      })
  },
  
  startFn: function(e){
    var that = this
    that.setData({
      tips1: '松开',
      tips2: '输入',
    })
    var startPointX = this.data.screenWidth*0.08;
    var lastPointX = this.data.screenWidth*0.92;
    var len = this.data.normal.length;
    //var len = 7;
    var step = (lastPointX-startPointX)/len;
    for(var i=0;i<len;i++) {
      if(startPointX+step*i<e.touches[0].pageX&&e.touches[0].pageX<=startPointX+step*(i+1)) {
        this.setData({
          curr: i,
          startPoint:[e.touches[0].pageX,e.touches[0].pageY],
          istouch:'hidden',
          h1:"925rpx"
        })
        this.data.scrollInfo.prevDistance = 0;
        this.moveTo();
      }
    }
  },
    catchTouchMove:function(res){

      return false
    
    },
    touchmoveFn: function(e){
      var curPoint = [e.touches[0].pageX,e.touches[0].pageY];
      var startPointX = this.data.screenWidth*0.08;
      var lastPointX = this.data.screenWidth*0.92;
      var len = this.data.normal.length;
      //var len = 7;
      var step2 = (lastPointX-startPointX)/6;
      var step = (lastPointX-startPointX)/len;
      if(curPoint[0]<=startPointX||curPoint[0]>lastPointX) {
        this.setData({
          i: -1
        })
      }
      for(var i=0;i<len;i++) {
        if(startPointX+step*i<curPoint[0]&&curPoint[0]<=startPointX+step*(i+1)) {
          this.data.scrollInfo.subLeft = startPointX+step2*i; //元素一半宽度
          this.data.scrollInfo.subHalfWidth = (this.data.screenWidth*0.02)/2; 
          if(i<this.data.curr&&this.data.isUsed==0) {
            this.setData({
              isUsed: 1,
              curr: i
            })
            //this.data.scrollInfo.prevDistance = 0;
            this.moveTo();
          }
          if(i<this.data.curr&&this.data.isUsed!=0) {
            this.setData({
              isUsed: 1,
              curr: i
            })
            this.moveTo();
          }
          if(i>this.data.curr) {
            this.setData({
              isUsed: 0,
              curr: i
            })
            this.moveTo();
          }
          //console.log(this.data.isUsed);
          
          
        }
      }
    },
    endFn(){
      var that = this
      var con = this.data.content+this.data.normal[this.data.curr].content;
      this.setData({
        tips1: '滑动',
        tips2: '选择',
        istouch:'',
        h1:"650rpx",
        content: con+'，',
        isUsed: 0
      })
    },
  //移动导航栏
  moveTo: function() {
    let subLeft = this.data.scrollInfo.subLeft;
    let subHalfWidth = this.data.scrollInfo.subHalfWidth;
    let prevDistance = this.data.scrollInfo.prevDistance;
    let screenHalfwidth = this.data.scrollInfo.screenHalfwidth;
    
    let needScroll = subLeft - screenHalfwidth;
    console.log(subLeft)
    console.log(screenHalfwidth)
    console.log(needScroll)
    console.log(subHalfWidth)
    let scrollLeft = needScroll + prevDistance;
    console.log(scrollLeft)
 
    this.setData({
      scrollLeft: scrollLeft
    })
  },
  //记录滚动的距离
  scrollMove: function(e) {
    
    let distance = e.detail.scrollLeft;
    let scrollInfo = {
      prevDistance: distance, //滚动条的距离（默认为0）
      screenHalfwidth: (wx.getSystemInfoSync().windowWidth*0.84) / 2, 
    }
    this.setData({
      scrollInfo: scrollInfo
    })
  },
  historyAdd:function(e){
    var that = this
    that.setData({
      content:that.data.content+e.currentTarget.dataset.sentence,
    })
  },
  historyDele:function(e){
    var that = this
    console.log(e)
    wx.request({
      url: 'https://bewcf.info/record/remove',
      method:"post",
      data:{
        recordId:e.currentTarget.dataset.id,
      },
      header: {
        "content-type": "application/x-www-form-urlencoded" 
      },
      success:(res)=>{
        that.getHistory()
      }
    })
  },
  edit: function(e) {
    wx.navigateTo({
      url: '/pages/voice-detail/voice-detail',
    })
  },
  changeSmallItem: function(e){
    var that = this
    that.setData({
      smallitem:e.detail.current
    })
  },
  config:function(e){
    var that = this
    that.setData({
      showConfig:true
    })
  },
  closeConfig:function(e){
    var that = this
    that.setData({
      showConfig:false
    })
  },
  changeConfigItem:function(e){
    var that = this
    that.setData({
      configitem:e.currentTarget.dataset.id
    })
    if(e.currentTarget.dataset.id==3){
      that.setData({
        font:that.data.font+5
      })
      console.log(that.data.font)
    }
    if(e.currentTarget.dataset.id==4){
      that.setData({
        font:that.data.font-5
      })
    }
  },
  changeColor:function(e){
    var that = this
    that.setData({
      textcolor:e.currentTarget.dataset.color
    })
  },
  changeBackground:function(e){
    var that = this
    that.setData({
      backgroundcolor:e.currentTarget.dataset.color
    })
  },
})