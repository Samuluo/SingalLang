const citys = {
  每日背单词: ['5个', '10个', '20个', '30个', '40个'],
  完成天数: ['福州', '厦门', '莆田', '三明', '泉州'],
};

Page({
  data: {
    restdays: 20,
    amount:'5',
    pOrder:1,
    id:'',
    everyda:'',
    picture:"/images/loadpicture.png",
    totalNumber: 2000,
    predictnum: 'xxxx年xx月xx日',
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
    var days = this.data.cidiandata.dictionary.totalNumber/x;
    var col = [parseInt(days)+"天"]
    var d=new Date(); 
    d.setDate(d.getDate()+days); 
    var m=d.getMonth()+1; 
    var newdate = d.getFullYear()+'年'+m+'月'+d.getDate()+'日';
    this.setData({
      'predictnum': newdate,
      'amount': x
    })
    picker.setColumnValues(1, col);
  },
  onLoad: function (options) {
    var f = JSON.parse(options.plan) 
    var days = (f.dictionary.totalNumber-f.learnedNumber)/f.todayAmount;
    var d=new Date(); 
    d.setDate(d.getDate()+days); 
    var m=d.getMonth()+1; 
    var newdate = d.getFullYear()+'年'+m+'月'+d.getDate()+'日';
    var sd = parseInt(days);
    console.log(f)
    this.setData({
      cidiandata: f,
      restdays:sd,
      predictnum: newdate,
      id:f.id,
      everyday:f.amount
    })  
  },
  setCurrent: function(e){  //当前图片索引
    this.setData({
      currentIndex:e.detail.current+1
    })
  },
  getSubmit(event) {
    var that = this
    wx.showModal({
      title: '提示',
      content: '确认修改该计划么',
      success (res) {
        if (res.confirm) {
          wx.request({
            url: 'https://bewcf.info/plan/changeOne',
            method:"post",
            data: ({
              "id": that.data.id,
              "amount":that.data.amount,
              "pOrder":that.data.pOrder,
            }),
            header: {
              "content-type": "application/x-www-form-urlencoded" 
            },
            dataType:'JSON', 
            success:(res)=>{
              that.setData({
                everyday:that.data.amount
              })
              wx.showToast({
                title: '修改成功',
                icon: 'none',
                duration: 1000,
                success: function () {

                  }
                })
            }
          })
        }else if (res.cancel) {
        }
      }
    })

  },
  imgPreview: function(){ //图片预览
    const imgs = this.data.spaceimgs;
    wx.previewImage({
      current: imgs[this.data.currentIndex-1], // 当前显示图片的https链接
      urls: imgs // 需要预览的图片https链接列表
    })
  },
  getAddress:function(e){
    const d = e.currentTarget.dataset;
    const address = d.address;
    const latitude = d.latitude;
    const longitude = d.longitude;
    wx.openLocation({
      latitude: latitude,
      longitude: longitude,
      scale: 18,
      // name: address,
      address: address,
      success:function(res){
        console.log(res);
      },
      fail:function(res){
        console.log(res);
      },
      success:function(res){
        console.log(res);
      }
    })
  },
  reserveHandle: function(){
    wx.navigateTo({
      url: '../spacereserve/spacereserve'
    })
  },
  goApply: function(){
    wx.navigateTo({
      url: '../apply/apply'
    })
  },
  // formateNumber:function(n){
  //   return n>9?n:'0'+n
  // }
  changePlan:function() {
    wx.navigateTo({
      url: '../switch-plan/switch-plan',
    })
  }
})
