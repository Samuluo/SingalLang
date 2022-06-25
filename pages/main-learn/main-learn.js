const app = getApp();
// pages/main-learn/main-learn.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    defaultData: {
      title: "我的主页", // 导航栏标题
   },
   show2: false,
   tabshow:false,
    showshare:false,
    cardshow: false,
    button1:'primary',
    button2:'primary',
    button3:'primary',
    button4:'primary',
    Acolor1:'#83c6c2 ',
    Acolor2:'#83c6c2 ',
    Acolor3:'#83c6c2 ',
    Acolor4:'#83c6c2 ',
    columns: ['5', '10', '15', '20', '25','30','35','40','45','50'],
    addWords: 5,
    show: false,
    needday:[],
    answerpool:[],
    todayword:{},
    color1:'#aad1cf',
    color2:'#aad1cf',
    color3:'#aad1cf',
    todayLearned:[],
    userId:[],
    planN:[],
    plans:[],
    Day:[],
    Year:[],
    Month:[],
    options: [
      { name: '微信', icon: 'wechat', openType: 'share' },
      { name: '微博', icon: 'weibo' },
      { name: '复制链接', icon: 'link' },
      { name: '分享海报', icon: 'poster' },
      { name: '二维码', icon: 'qrcode' },
    ],
    continuday:[],
    wrongwords:[],
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
        todayAmount:[],
        dictionary:[],
        dictionaryName:[],
        dictionaryImg:[],
    },
    finish:[],
    userInfo: {
      'nickname':'麦兜兜',
      'avatar':''
    }, 
    imgUrl:'../../images',
    xcxEwm: '../../images/ewm.jpg',
    poster: '', //生成的分享图
    width: 200,
    height: 345,
    imgHeight: 285,
    pdWidth: 7,
    pdHeight: 10,
    ewmLeft: 153,
    ewmTop: 295,
    ewmWidth: 40,
    pt1: 305,
    pt2: 320,
    pt3: 334,
    pixelRatio: 1, //像素密度
   
    // 卡片模块：
    currentTab: 0, //预设当前项的值
    scrollLeft: 0, //切换栏的滚动条位置
    cardImgSrc: '',  //存储卡片图
    //卡片数组
    cardArr: [
      {
        id: '01',
        img: 'https://img2.baidu.com/it/u=3355844021,4179371454&fm=253&fmt=auto&app=138&f=JPEG?w=281&h=500'
      }, {
        id: '02',
        img: 'https://cdn.bewcf.info/dakaimange/load.png'
      }, {
        id: '03',
        img: 'https://cdn.bewcf.info/dakaimange/card-tp03.jpg'
      }, {
        id: '04',
        img: 'https://cdn.bewcf.info/dakaimange/card-tp04.jpg'
      }, {
        id: '05',
        img: 'https://cdn.bewcf.info/dakaimange/card-tp05.jpg'
      }, {
        id: '06',
        img: 'https://cdn.bewcf.info/dakaimange/card-tp06.jpg'
      },
    ],
    dakaDays: []
  },
  onShare(event) {
    this.setData({ showShare: true });
  },

  shareClose() {
    this.setData({ showShare: false });
  },

  shareSelect(event) {
    console.log(event)
    Toast(event.detail.name);
    this.shareClose();
  },
  showCalendar() {
    this.setData({
      show2: true
    })
  },
  addplan: function(e){
    wx.navigateTo({
      url: '/pages/add-plan/add-plan?userId='+this.data.userId
    })
  },
  search:function(e){
    wx.navigateTo({
      url: '/pages/search/search?userId='+this.data.userId
    })
  },
  beginLearn:function(e){
    wx.navigateTo({
      url: '/pages/learn-word/learn-word?userId='+this.data.userId
    })
  },
  adjust: function(e){
    console.log("hello")
     console.log(e)
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
  onChange(event) {
    var that = this
    const { picker, value, index } = event.detail;
    that.setData({
      'addWords': value,
    })
  },
  onClose() {
    this.setData({ show: false });
  },
  answer(e){
    var that = this
    that.setData({
      'button1':"primary",
      'Acolor1':"#83c6c2",
      'button2':"primary",
      'Acolor2':"#83c6c2",
      'button3':"primary",
      'Acolor3':"#83c6c2",
      'button4':"primary",
      'Acolor4':"#83c6c2",
    })
    if(e.currentTarget.dataset.button=="button1"){
      if(e.currentTarget.dataset.answer==that.data.todayword.answer){
        that.setData({
          'button1':"right",
          'Acolor1':"#87c38f",
        })
        setTimeout(() => {
          this.exchangeword()
        }, 1000); 
      }else{
        that.setData({
          'button1':"wrong",
          'Acolor1':"rgb(253, 79, 79)"
        })
      }
     }//判断选择了哪个按钮，并做出相应样式改变，正确的话将正确的答案放入wordIds，并将wordtoFinish中的状态改为true
     if(e.currentTarget.dataset.button=="button2"){
      if(e.currentTarget.dataset.answer==that.data.todayword.answer){
        that.setData({
          'button2':"right",
          'Acolor2':" #87c38f",
        })
        setTimeout(() => {
          this.exchangeword()
        }, 1000); 
      }else{
        that.setData({
          'button2':"wrong",
          'Acolor2':"rgb(253, 79, 79)",
        })
      }
     }
     if(e.currentTarget.dataset.button=="button3"){
      if(e.currentTarget.dataset.answer==that.data.todayword.answer){
        that.setData({
          'button3':"right",
          'Acolor3':" #87c38f",
        })
        setTimeout(() => {
          this.exchangeword()
        }, 1000); 
      }else{
        that.setData({   
          'button3':"wrong",
          'Acolor3':"rgb(253, 79, 79)"
        })
      }
     }
     if(e.currentTarget.dataset.button=="button4"){
      if(e.currentTarget.dataset.answer==that.data.todayword.answer){
        that.setData({
          'button4':"right",
          'Acolor4':" #87c38f",
        })
        setTimeout(() => {
          this.exchangeword()
        }, 1000); 
      }else{
        that.setData({
          'button4':"wrong",
          'Acolor4':"rgb(253, 79, 79)"
        })
      }
     }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
     var that = this
     that.init();
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
              'planN':res.data.length
            })
          }
        })
        wx.request({
          url: 'https://bewcf.info/plan/queryNow',
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
        wx.request({
          url: 'https://bewcf.info/card/queryCardDays',
          method:"get",
          data:{
            userId:that.data.userId
          },
          success:(res)=>{
            that.setData({
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
  onReady: function () {
    var that = this
    that.getTime();
    wx.request({
      url: 'https://bewcf.info/word/getRandomOne',
      method:"GET",
      success:(res)=>{
        this.setData({
          todayword:res.data
        })
        let answer = [res.data.answer,res.data.answer2,res.data.answer3,res.data.answer4];
        answer = this.shuffle(answer);
        this.setData({
          answerpool: answer
        })
       
      }
    })
    wx.request({
      url: 'https://bewcf.info/word/getTodayLearned',
      method:"get",
      data:{
        userId:that.data.userId
      },
      success:(res)=>{
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
    var needday = Math.ceil((that.data.plan.totalNumber-that.data.plan.learnedNumber)/that.data.plan.amount)
    that.setData({
     'needday':needday,
   })
  },
  add:function(e) {
    this.setData({
      'show':true,
    })
  },
  getSubmit(event) {
    var that = this
    wx.request({
      url: 'https://bewcf.info/card/cancelClock',
      method:"post",
      data:{
        userId:that.data.userId,
      },
      header: {
        "content-type": "application/x-www-form-urlencoded" 
      },
      success:(res)=>{
        console.log(res)
      }
    })
    wx.request({
      url: 'https://bewcf.info/word/addTodayWord',
      method:"post",
      data:{
        userId:that.data.userId,
        addAmount: that.data.addWords
      },
      header: {
        "content-type": "application/x-www-form-urlencoded" 
      },
      success:(res)=>{
        that.setData({
          'addWords': 5,
        })
        this.onShow()
      }
    })
  },
  getCard(){
    var that =this
    that.setData({
      'cardshow': true,
    })
    wx.request({
      url: 'https://bewcf.info/card/clock',
      method:"post",
      data:{
        userId:that.data.userId,
      },
      header: {
        "content-type": "application/x-www-form-urlencoded" 
      },
      success:(res)=>{
        console.log(res)
      }
    })
  },
  cardClose() {
    this.setData({ cardshow: false });
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
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
              'planN':res.data.length
            })
            wx.request({
              url: 'https://bewcf.info/plan/queryNow',
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
                wx.request({
                  url: 'https://bewcf.info/plan/queryAllWord',
                  method:"get",
                  data:{
                    id:that.data.plan.id,
                  },
                  success:(res)=>{
                    that.setData({
                      'wrongwords':res.data,
                    })
                
                    let wrongtoFinish=[];
                    console.log()
                    for(var i = 0; i<that.data.wrongwords.length;i++){
                      if(that.data.wrongwords[i].isMistake==true){
                        wrongtoFinish.push(that.data.wrongwords[i])
                      }
                    }
                    that.setData({
                      'wrongwords': wrongtoFinish,
                    })
                  }
                })
                var needday = Math.ceil((that.data.plan.totalNumber-that.data.plan.learnedNumber)/that.data.plan.amount)
                that.setData({
                 'needday':needday,
               })
              }
            })
          }
        })
      },fail(){

      }
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
    setTimeout(function() {
      wx.request({
        url: 'https://bewcf.info/word/getTodayLearned',
        method:"get",
        data:{
          userId:that.data.userId
        },
        success:(res)=>{
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
      color1: '#83c6c2',
      color2: '#aad1cf',
      color3: '#aad1cf'
    })
  },
  wordtrain: function() {
    this.setData({
      color1: '#aad1cf',
      color2: '#83c6c2',
      color3: '#aad1cf'
    })
    wx.navigateTo({
      url: '/pages/wrong-learn/wrong-learn?userId='+this.data.userId+'&&wrongwords='+JSON.stringify(this.data.wrongwords)
    })
  },
  vocabularytext: function() {
    this.setData({
      color1: '#aad1cf',
      color2: '#aad1cf',
      color3: '#83c6c2'
    })
  },
  cidianDetail: function(e) {
    console.log(this.data.plan)
    console.log(e)
    console.log(JSON.stringify(e.currentTarget.dataset.item))
    wx.navigateTo({
      url: '/pages/cidianDetail/cidianDetail?plan='+JSON.stringify(e.currentTarget.dataset.item),
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
},
  exchangeword: function() {
    var that = this
    that.setData({
      'button1':"primary",
      'Acolor1':"#83c6c2",
      'button2':"primary",
      'Acolor2':"#83c6c2",
      'button3':"primary",
      'Acolor3':"#83c6c2",
      'button4':"primary",
      'Acolor4':"#83c6c2",
    })
    wx.request({
      url: 'https://bewcf.info/word/getRandomOne',
      method:"GET",
      success:(res)=>{
        this.setData({
          todayword:res.data
        })
        let answer = [res.data.answer,res.data.answer2,res.data.answer3,res.data.answer4];
        answer = this.shuffle(answer);
        this.setData({
          answerpool: answer
        })
       
      }
    })
  },
    //获取打卡天数
    getDays: function(e) {
      wx.request({
        url: 'https://bewcf.info/card/queryCardDays?userId='+e,
        success: (res)=>{
          this.setData({
            dakaDays: res.data
          })
        }
      })
    },
    //canvas画图
    drawCanvas(e) {
      let that = this;
      /* 创建 canvas 画布 */
      const ctx = wx.createCanvasContext('myCanvas')
      ctx.drawImage(that.data.cardImgSrc, 0, 0, that.data.width, that.data.imgHeight)
      ctx.rect(0, that.data.imgHeight, that.data.width, that.data.height - that.data.imgHeight)
      ctx.setStrokeStyle('#ffffff')
      ctx.setFillStyle('#ffffff')
      ctx.fill()
      ctx.drawImage(that.data.xcxEwm, that.data.ewmLeft, that.data.ewmTop, that.data.ewmWidth, that.data.ewmWidth)
      ctx.setFillStyle('#333')
      ctx.setFontSize(12)
      ctx.setTextAlign('left')
      ctx.fillText('我是' + that.data.userInfo['nickname'] + '', that.data.pdWidth, that.data.pt1)
      ctx.setFontSize(11)
      ctx.fillText('已连续学习手语'+ that.data.dakaDays +'天！', that.data.pdWidth, that.data.pt2)
      ctx.setFillStyle('#999')
      ctx.setFontSize(8)
      ctx.fillText('长按二维码，开启你的旅行之路', that.data.pdWidth, that.data.pt3)
  
      /* 绘制 */
      ctx.stroke()
      ctx.draw()
    },
  
    //将绘制后的canvas保存为图片
    canvasToPath() {
      let that = this;
      that.drawCanvas();
      //加个定时器，防止图为黑屏
      setTimeout(()=>{
        wx.canvasToTempFilePath({
          x: 0,
          y: 0,
          width: that.data.width,
          height: that.data.height,
          destWidth: that.data.width * that.data.pixelRatio,     //乘以像素比，防止模糊
          destHeight: that.data.height * that.data.pixelRatio,
          canvasId: 'myCanvas',
          success(res) {
            console.log(res.tempFilePath)
            that.setData({
              poster: res.tempFilePath,
            })
            wx.nextTick(() => {
              that.saveCanvasImage();
            })
          }
        })
      }, .1e3);
    },
  
    // 保存图片方法
    saveCanvasImage() {
      let that = this;
      wx.saveImageToPhotosAlbum({
        filePath: that.data.poster,
        success: (res) => {
          console.log(res)
          wx.showToast({
            title: '保存成功'
          });
        },
        fail: (err) => {
          console.log(err)
        }
      })
    },
  
  
    // 点击保存图片到相册（授权）
    saveImageToPhotos() {
      let that = this;
      // 相册授权
      wx.getSetting({
        success(res) {
          if (!res.authSetting['scope.writePhotosAlbum']) {
            wx.authorize({
              scope: 'scope.writePhotosAlbum',
              success() {
                that.canvasToPath();
              },
              // 拒绝授权时，则进入手机设置页面，可进行授权设置
              fail() {
                console.log('拒绝授权');
                wx.showModal({
                  title:'授权失败',
                  content:'请允许”保存图片到相册“后，才可以把分享图保存到手机相册哦~',
                  showCancel:false,
                  success(res) {
                    if (res.confirm) {
                      wx.openSetting({
                        success: (ret) => {
                          if(ret.authSetting['scope.writePhotosAlbum']){
                            that.canvasToPath();
                          }else{
                            //返回-回调
                            if (that.isCancleCallback){
                              that.isCancleCallback(ret);
                             }
                          }
                         }
                      })
                   }
                  }
                })
              }
            })
          } else {
            // 已授权则直接进行保存图片
            that.canvasToPath();
          }
        },
        fail(res) {
          console.log(res);
        }
      })
    },
  
    // 点击切换卡片
    swichNav(e) {
      var that = this,
        cur = e.target.dataset.current,
        src = e.target.dataset.src;
      if (that.data.currentTaB == cur) {
        return false;
      } else {
        that.setData({
          currentTab: cur
        })
      }
      that.setData({
        cardImgSrc: src
      })
      that.checkCor();
    },
  
    //判断当前滚动超过一屏时
    checkCor(e) {
      var that = this;
      if (that.data.currentTab > 2) {
        that.setData({
          scrollLeft: 300
        })
      } else {
        that.setData({
          scrollLeft: 0
        })
      }
    },
  
    //卡片默认显示第一张
    defaultFirstShow(e) {
      let that = this,
        defaultCardImgSrc = that.data.cardArr[0].img;
        // that.setData({
        //   cardImgSrc:defaultCardImgSrc
        // })
        this.preLoadImg(defaultCardImgSrc);
  
    },
    // 预先下载图片
    preLoadImg(url) {  
      var that = this   
      wx.getImageInfo({      
        src:url,      
        success(res) {        
          // 把图片存下       
          that.setData({cardImgSrc:res.path})      
        },      
        fail(err) {        
          console.log(err);      
        },   
       });  
    },
    //获取像素比
    getPix(){
      let that = this;
      wx.getSystemInfo({
        success(res) {
          that.setData({
            pixelRatio: res.pixelRatio   
          })
        }
      })
    },
  
    //标签选择:用于得到距离的，方便canvas那拿测量距离
    querySelect(e) {
      let that = this;
      //canvas宽高
      var query = wx.createSelectorQuery();
      query.select('#my-canvas').boundingClientRect(function (rect) {
        that.setData({
          width: rect.width,
          height: rect.height
        })
      }).exec();
  
      query.select('#card-img').boundingClientRect(function (rect) {
        that.setData({
          imgHeight: rect.height
        })
      }).exec();
  
      query.select('.pd').boundingClientRect(function (rect) {
        that.setData({
          pdWidth: rect.width,
          pdHeight: rect.height
        })
      }).exec();
  
      query.select('.ewm-leftTop').boundingClientRect(function (rect) {
        that.setData({
          ewmLeft: rect.width,
          ewmTop: rect.height
        })
      }).exec();
  
      query.select('#ewm-img').boundingClientRect(function (rect) {
        that.setData({
          ewmWidth: rect.width
        })
      }).exec();
  
      query.select('.pt1').boundingClientRect(function (rect) {
        that.setData({
          pt1: rect.height
        })
      }).exec();
      query.select('.pt2').boundingClientRect(function (rect) {
        that.setData({
          pt2: rect.height
        })
      }).exec();
      query.select('.pt3').boundingClientRect(function (rect) {
        that.setData({
          pt3: rect.height
        })
      }).exec();
    },
    // setImgPath(path){//传入图片线上路径
    //   console.log(path);
    //   return new Promise((resolve,reject)=>{
    //     wx.getImageInfo({
    //       src:'https://cdn.bewcf.info/dakaimange/card-tp07.jpg',
    //       success (res) {
    //         resolve(res.path)
    //       }
    //     });
    //   })
      
    //},
    //初始化
    init(){
      let that = this;
      wx.getStorage({
        key: "avatar",
        success:(res)=>{
          console.log(res.data);
          that.setData({
            userInfo: res.data
          })
        }
      })
      wx.getStorage({
        key: "userInfo",
        success:(res)=>{
          that.getPix();
          that.defaultFirstShow();
          that.querySelect();
          that.drawCanvas();
          that.getDays(res.data.id);
        }
      })
      
    },
})