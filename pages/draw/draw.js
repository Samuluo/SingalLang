let ctx;
Page({
  data: {
    isrotate:false,
    tempFilePath:'',
    pen: {
      lineWidth: 5,
      color: "#2c2c2c"
    },
    styleA:'transform:rotate(0deg);',
  },
  onShareAppMessage: function () {
    return {
      title: '心声Lite，用画笔说话',
      path: '/pages/index/draw/draw',
      imageUrl: '/images/xxs.png'
    }
  },
  onLoad(options) {
    ctx = wx.createCanvasContext('myCanvas');
    ctx.setStrokeStyle(this.data.pen.color);
    ctx.setLineWidth(this.data.pen.lineWidth);
    ctx.setLineCap('round');
    ctx.setLineJoin('round');
  },
  touchstart(e) {
    ctx.setStrokeStyle(this.data.pen.color);
    ctx.setLineWidth(this.data.pen.lineWidth);
    ctx.moveTo(e.touche-s[0].x, e.touches[0].y);
  },
  touchmove(e) {
    let x = e.touches[0].x;
    let y = e.touches[0].y;
    ctx.lineTo(x, y)
    ctx.stroke();
    ctx.draw(true);
    ctx.moveTo(x, y)
  },
  dele: function () {
    ctx.setFillStyle('#ffffff')
    ctx.fillRect(0, 0, 750, 1000)
    ctx.draw()
  },
  rotate: function () {
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
})
