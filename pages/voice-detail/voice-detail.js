// pages/voice-detail/voice-detail.js
import Dialog from '@vant/weapp/dialog/dialog';


Page({

  /**
   * 页面的初始数据
   */
  data: {
    content:"",
    content2:"",
    curr: 0,
    currgroup:"",
    show: false,
    show2: false,
    show3: false,
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
  onDelete(item) {
    //const { position, instance } = event.detail;
    var s = item.currentTarget.dataset.item.id
    this.setData({
      show: true,
      curr: s
    })
  },
  onChange(event) {
    // event.detail 为当前输入的值
    this.setData({
      content:event.detail
    })
  },
  onChange2(event) {
    // event.detail 为当前输入的值
    this.setData({
      content2:event.detail
    })
  },
  onEdit(item) {
    //const { position, instance } = event.detail;
    var s = item.currentTarget.dataset.item.id
    this.setData({
      show2: true,
      curr: s
    })
  },
  onAdd(item) {
    //const { position, instance } = event.detail;
    //console.log(item)
    var s = item.currentTarget.dataset.item
    this.setData({
      show3: true,
      currgroup:s
    })
  },
  onClose(item) {
    //const { position, instance } = event.detail;
    this.setData({
      show: false,
      show2:false,
      show3:false
    })
  },
  delete() {
    console.log(this.data.curr)
    wx.request({
      url: 'https://bewcf.info/sentence/removeSentence?sentenceId='+this.data.curr,
      method:"POST",
      success:(res)=>{
        console.log("删除成功")
        this.onLoad();
      }
    })
  },
  edit() {
    wx.request({
      url: 'https://bewcf.info/sentence/updateSentence?sentenceId='+this.data.curr+'&content='+this.data.content,
      method:'POST',
      success:(res)=>{
        console.log("修改成功")
        this.onLoad();
      }
    })
  },
  add() {
    console.log(this.data.currgroup);
    wx.request({
      url: 'https://bewcf.info/sentence/addSentence?userId='+this.data.userId+'&name='+this.data.currgroup+'&content='+this.data.content2,
      method:'POST',
      success:(res)=>{
        console.log("修改成功")
        this.onLoad();
      }
    })
  } 
})