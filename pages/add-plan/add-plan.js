// pages/add-plan/add-plan.js
const citys = {
  每日背单词: ['5个', '10个', '20个', '30个', '40个'],
  完成天数: ['福州', '厦门', '莆田', '三明', '泉州'],
};
Page({

  /**
   * 页面的初始数据
   */
  data: {
    amount:'',
    pOrder:1,
    userId:1000,
    picture:"/images/loadpicture.png",
    totalNumber: 2000,
    predictnum: 'xxxx年xx月xx日',
    dictionaries:{
    },
    dictionaryId: '',
    show: false,
    spacedata:{},
    spaceimgs:[],
    currentIndex:1,
    columns: [
      {
        values: citys['每日背单词'],
        className: 'column1',
      },
      {
        values: ["400天"],
        className: 'column2',
        defaultIndex: 2,
      },
    ],
  },
  onChange(event) {
    const { picker, value, index } = event.detail;
    var x = value[0].replace("个","");
    console.log(this.data.totalNumber)
    var days = this.data.totalNumber/x;
    var col = [parseInt(days)+"天"]
    var d=new Date(); 
    d.setDate(d.getDate()+days); 
    var m=d.getMonth()+1; 
    var newdate = d.getFullYear()+'年'+m+'月'+d.getDate()+'日';
    console.log(newdate);
    this.setData({
      'predictnum': newdate,
      'amount': x
    })
    picker.setColumnValues(1, col);
  },
  todetail:function(e) {
    var item = e.currentTarget.dataset.item
    console.log(item)
    this.setData({
      'show':true,
      'totalNumber':item.totalNumber,
      'dictionaryId':item.id
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    var that = this
    that.setData({
      'userId':options.userId,
    })
    console.log(that.data.userId)
    wx.request({
      url: 'https://bewcf.info/dictionary/queryRest',
      method:"get",
      data:{
        userId:that.data.userId
      },
      success:(res)=>{
        that.setData({
          'dictionaries':res.data,
        })
      }
    })
  },
  getSubmit(event) {
    wx.request({
      url: 'https://bewcf.info/plan/add',
      method:"post",
      data: ({
        "userId": this.data.userId,
        "dictionaryId":this.data.dictionaryId,
        "amount":this.data.amount,
        "pOrder":this.data.pOrder,
      }),
      header:{  
        'content-type':"application/x-www-form-urlencoded"
     },
      dataType:'JSON', 
      success:(res)=>{
          console.log(res)  
      }
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onClose() {
    this.setData({ show: false });
  },
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

  }
})