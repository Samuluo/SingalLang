// pages/canvas/canvas.js
const app = getApp();

Page({
  /**
   * 页面的初始数据
   */
  data: {
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
        img: 'https://img0.baidu.com/it/u=1802919804,2554595945&fm=253&fmt=auto&app=138&f=JPEG?w=400&h=800'
      }, {
        id: '03',
        img: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg1.doubanio.com%2Fview%2Frichtext%2Flarge%2Fpublic%2Fp231769778.jpg&refer=http%3A%2F%2Fimg1.doubanio.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1658758562&t=69370c1e37e6e30c239783a96c889f39'
      }, {
        id: '04',
        img: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fc-ssl.duitang.com%2Fuploads%2Fitem%2F202004%2F14%2F20200414103000_symeg.thumb.400_0.jpg&refer=http%3A%2F%2Fc-ssl.duitang.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1658758562&t=a1a8303f55fc2698edf2993859541b49'
      }, {
        id: '05',
        img: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fc-ssl.duitang.com%2Fuploads%2Fitem%2F202006%2F03%2F20200603115002_hKG3C.thumb.400_0.jpeg&refer=http%3A%2F%2Fc-ssl.duitang.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1658758562&t=d9e8d60cc84768e78be6a546c2c3199c'
      }, {
        id: '06',
        img: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fc-ssl.duitang.com%2Fuploads%2Fitem%2F201908%2F01%2F20190801070209_XnWXa.thumb.400_0.jpeg&refer=http%3A%2F%2Fc-ssl.duitang.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1658758562&t=1bbca499b07eaeacf812a058b38ebbe7'
      },
    ],
    dakaDays: []
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
    ctx.fillText('长按二维码，开启你的学习之路', that.data.pdWidth, that.data.pt3)

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
    
      defaultCardImgSrc = that.data.cardArr[e].img;
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
        that.defaultFirstShow(Math.round(Math.random()*5));
        that.querySelect();
        that.drawCanvas();
        that.getDays(res.data.id);
      }
    })
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    that.init();

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
  onShareAppMessage: function (options) {

  }
  
})