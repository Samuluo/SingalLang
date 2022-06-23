// pages/voice-detail/voice-detail.js
import Dialog from '@vant/weapp/dialog/dialog';


Page({

  /**
   * 页面的初始数据
   */
  data: {
    color1:['#83c6c2','#3f81c1','#36ab60','#ea986c','#be8dbd'],
    content:"",
    content2:"",
    content3:"",
    content4:"",
    curr: 0,
    currgroup:"",
    show: false,
    show2: false,
    show3: false,
    show4:false,
    show5:false,
    show6:false,
    sentence:[],
    array:[],
    sentencedetail:[],
    screenheight:0,
    toChagneCategory:[],
    toDeleteCategory:[]
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
  showAddCategory(){
    this.setData({
      show4: true,
    })
  },
  showChangeCategory(e){
    this.setData({
      show5: true,
      toChagneCategory:e.currentTarget.dataset.name
    })
  },
  deleteCategory(e){
    console.log(e)
    this.setData({
      show6: true,
      toDeleteCategory:e.currentTarget.dataset.name
    })
  },
  addCategory(){
    wx.request({
      url: 'https://bewcf.info/sentence/addGroup',
      method:"POST",
      data:{
        userId:this.data.userId,
        name:this.data.content3
      },
      header: {
        "content-type": "application/x-www-form-urlencoded" 
      },
      success:(res)=>{
        console.log("删除成功")
        this.onLoad();
      }
    })
  },
  changeCategory(e){
    wx.request({
      url: 'https://bewcf.info/sentence/updateGroup',
      method:"POST",
      data:{
        userId:this.data.userId,
        name:this.data.toChagneCategory,
        newName:this.data.content4
      },
      header: {
        "content-type": "application/x-www-form-urlencoded" 
      },
      success:(res)=>{
        this.onLoad();
      }
    })
  },
  deleteCat(e){
    wx.request({
      url: 'https://bewcf.info/sentence/removeGroup',
      method:"POST",
      data:{
        userId:this.data.userId,
        name:this.data. toDeleteCategory,
      },
      header: {
        "content-type": "application/x-www-form-urlencoded" 
      },
      success:(res)=>{
        this.onLoad();
      }
    })
  },
  onChange3(event) {
    // event.detail 为当前输入的值
    this.setData({
      content3:event.detail
    })
  },
  onChange4(event) {
    // event.detail 为当前输入的值
    this.setData({
      content4:event.detail
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