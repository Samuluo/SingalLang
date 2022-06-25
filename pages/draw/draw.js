let app = getApp();
Page({
 
  /**
   * 页面的初始数据
   */
  data: {
    // 弹框是否显示
    // 初始化标题
    width:'',
    height:'',
    project: '太阳',
    // 绘图线的粗细
    linewidth: [5, 5.5,6, 6.5,7,7.5,8,8.5],
    // 当前默认的粗细
    currentLinewidth: 0,
    // 绘图的颜色
    color: ['#da1c34', '#8a3022', '#ffc3b0', '#ffa300', '#66b502', '#148bfd', '#000', '#9700c2', '#8a8989'],
    // 当前默认的颜色
    currentColor: 0,
    // 橡皮擦是否被点击
    cancelChange:false,
    // 判断是否开始绘画
    isStart:false
  },
  // 改变颜色的事件
  changeColor:function(e){
    // 获取点击画笔的编号
    let colorIndex = e.currentTarget.id;
    // 修改默认的颜色编号
    this.setData({
      cancelChange: false,
      currentColor: colorIndex
    });
    // 设置颜色
    this.mycanvas.setStrokeStyle(this.data.color[this.data.currentColor]);
  },
  // 改变线的粗细
  changeLineWidth:function(e){
    // 获取点击粗细的编号
    let widthIndex = e.currentTarget.id;
    // 修改当前的粗细
    this.setData({ currentLinewidth:widthIndex});
    // 设置粗细
    this.mycanvas.setLineWidth(this.data.linewidth[this.data.currentLinewidth]);
  },
 
  // 点击橡皮擦
 
  chengCancel:function(){
    // 设置橡皮擦被选中
    this.setData({
      cancelChange:true
    });
    // 画笔颜色设置成白色
    this.mycanvas.setStrokeStyle("#fff");
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 获取题目的
  
  },
 
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  },
 
  /**
   * 生命周期函数--监听页面显示
   */
  // 获取标题的函数
 
  onShow: function () {
    
 
    let data = this.data;
 
    // 创建画板
    this.mycanvas = wx.createCanvasContext("canvas");
    // 设置线的样式
    this.mycanvas.setLineCap("round");
    this.mycanvas.setLineJoin("round");
    // 初始化颜色
    this.mycanvas.setStrokeStyle(data.color[data.currentColor]);
    // 初始化粗细
    this.mycanvas.setLineWidth(data.linewidth[data.currentLinewidth]);
    this.mycanvas.setFillStyle('#ffffff')
    this.mycanvas.fillRect(0, 0, 400, 400)
  },
  // 绘画开始
  canvasStart:function(e){
    // 获取触摸点的x，y位置
    let x = e.touches[0].x;
    let y = e.touches[0].y;
    console.log(x)

    // 将画笔移动到指定坐标
    this.mycanvas.moveTo(x,y);
  },
  // 绘画进行中
  canvasMove:function(e){
    // 获取移动过程中的x,y位置
    let x = e.touches[0].x;
    let y = e.touches[0].y;
    // 指定移动的位置
    this.mycanvas.lineTo(x,y);
    // 开始画线
    this.mycanvas.stroke();
    // 将绘画绘制到canvas
    this.mycanvas.draw(true);
    // 绘制完成，将起始点进行移动
    this.mycanvas.moveTo(x,y);
 
  },
  // 绘画结束

  rotate: function () {
    if(this.data.styleA=='transform:rotate(180deg);transition: .5s;') {
      this.setData({
    styleA: 'transform:rotate(0deg);transition: .5s;'
   })
    }
     else{
      this.setData({
        styleA: 'transform:rotate(180deg);transition: .5s;'
      })
      }
  },
    /*this.mycanvas.save()
    this.mycanvas.setFillStyle('#ffffff')
    this.mycanvas.clearRect(0,0,350,325);
    this.mycanvas.restore()*/
    /*this.mycanvas.fillRect(0, 0, 350, 325)
    this.mycanvas.clearRect(0,0,350,325);*/
    /*this.mycanvas.rotate(90 / 180 * Math.PI);
    this.mycanvas.translate(-175, -162.5);   
    this.mycanvas.restore()*/
    
    /* 
if(this.data.styleA=='transform:rotate(180deg);transition: .5s;') {
  this.setData({
    styleA: 'transform:rotate(0deg);transition: .5s;'
  })
}
else
  this.setData({
    styleA: 'transform:rotate(180deg);transition: .5s;'
  })*/
  canvasEnd:function(){
    // 判断是否开始绘画
    this.setData({
      isStart:true
    });
 
  },
  save:function(){
    wx.canvasToTempFilePath({//把当前画布指定区域的内容导出生成指定大小的图片
      canvasId: 'canvas',
      fileType:'png',
      success(res) {
        var temp = res.tempFilePath
        console.log(temp)
        wx.getSetting({
          success(res) {
            console.log(res);
            // 如果从未申请保存到相册权限，则申请权限
            if (res.authSetting['scope.writePhotosAlbum'] == null) {
              //申请权限
              wx.authorize({
                scope: 'scope.writePhotosAlbum',
                success() {
                  // 用户已经同意
                  console.log("success");
                  wx.saveImageToPhotosAlbum({//保存图片到系统相册
                    filePath: res.tempFilePath,
                    success: () => {
                      console.log("保存了")
                      wx.showToast({
                        title: '图片保存成功'
                      })
                    }
                  })
                },
                fail() {
                  // 用户不同意
                  console.log("fail");
                  wx.showToast({
                      title: '获取权限失败，请再次点击按钮并授权保存到相册',
                      icon: 'none',
                      duration: 2000
                  });
                }
              })
            }
            // 如果已经有权限，就下载图片
            else if (res.authSetting['scope.writePhotosAlbum'] == true) {
              console.log("已经有权限")
              console.log(temp)
              wx.saveImageToPhotosAlbum({//保存图片到系统相册
                filePath: temp,
                success: (res) => {
                  console.log(res)
                  console.log("保存了")
                  wx.showToast({
                    title: '图片保存成功'
                  })
                }
              })
            }
            // 被拒绝过授权，重新申请
            else {
              wx.showModal({
                title: '警告',
                content: '你否认了小程序发起的授权请求，前往个人信息授权界面进行确认',
                success (res) {
                }
              })
            }
          }
        })
      }
    })
  },
  // 清除画板
  clearCanvas:function(){
    // 清除区域   
    this.mycanvas.setFillStyle('#ffffff')
    this.mycanvas.fillRect(0, 0, 750, 1000)
    this.mycanvas.clearRect(0,0,400,400);
    this.mycanvas.draw(true);
  },
 
})
