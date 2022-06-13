const citys = {
  每日背单词: ['5个', '10个', '20个', '30个', '40个'],
  完成天数: ['福州', '厦门', '莆田', '三明', '泉州'],
};

Page({
  data: {
    amount:'',
    pOrder:1,
    userId:1000,
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
    console.log(this.data.cidiandata.dictionary.totalNumber)
    var days = this.data.cidiandata.dictionary.totalNumber/x;
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
  onLoad: function (options) {
    var f = JSON.parse(options.plan) 
    console.log(f)
    
    this.setData({
      cidiandata: f,
      spaceimgs:["https://cdn.jsdelivr.net/gh/honjun/cdn@1.6/img/cover/(5).jpg.webp"]
    })  
  },
  setCurrent: function(e){  //当前图片索引
    this.setData({
      currentIndex:e.detail.current+1
    })
  },
  getSubmit(event) {
    wx.request({
      url: 'https://bewcf.info/plan/changeOne',
      method:"post",
      data: ({
        "userId": this.data.userId,
        "amount":this.data.amount,
        "pOrder":this.data.pOrder,
      }),
     
      dataType:'JSON', 
      success:(res)=>{
          console.log(res)  
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
