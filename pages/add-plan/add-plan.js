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
    userId:1000,
    picture:"/images/loadpicture.png",
    dictionaries:{
    },
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
    var col = [parseInt(2000/x)+"天"]
    picker.setColumnValues(1, col);
  },
  todetail:function(e) {
    var item = e.currentTarget.dataset.item
    console.log(item)
    this.setData({
      'show':true,
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
    wx.request({
      url: 'http://bewcf.info:8081/dictionary/queryRest',
      method:"get",
      data:{
        userId:this.data.userId
      },
      success:(res)=>{
        that.setData({
          'dictionaries':res.data,
        })
      }
    })
  },
  getUserInfo(event) {
    console.log(event.detail);
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