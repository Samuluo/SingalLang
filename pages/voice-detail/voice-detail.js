// pages/voice-detail/voice-detail.js
import Dialog from '@vant/weapp/dialog/dialog';


Page({

  /**
   * 页面的初始数据
   */
  data: {
    sentence:[],
    array:[],
    sentencedetail:[],
    screenheight:0,
  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    let that = this;
    wx.getStorage({
      key: "screenHeight",
      success:(res)=>{
        that.setData({
          screenheight: res.data
        })
      }
    })
    wx.getStorage({
      key: "userInfo",
      success:(res)=>{
        that.setData({
          userId: res.data.id
        })
        that.getSentence(that.data.userId);
      }
    })
  },
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
          array: arr
        })
      }
    })
  },
  onClose(event) {
    const { position, instance } = event.detail;
    switch (position) {
      case 'left':
      case 'cell':
        instance.close();
        break;
      case 'right':
        Dialog.confirm({
          message: '确定删除吗？',
        }).then(() => {
          instance.close();
        });
        break;
    }
  },
})