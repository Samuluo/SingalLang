const citys = {
  每日背单词: ['5个', '10个', '20个', '30个', '40个'],
  完成天数: ['福州', '厦门', '莆田', '三明', '泉州'],
};

Page({
  data: {
    countArr:[],
    dateArr:[],
    nameArr:[],
    planid: 10,
    wordList:{},
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
  onLoad: function () {
    wx.request({
      url: 'http://bewcf.info:8081/plan/queryCompletedWord?id='+this.data.planid,
      method:'GET',
      success: (res)=> {
        console.log(res.data)
        this.setData({
          wordList: res.data,
          cidiandata:{
            "ParkCode": "ZCKJ20160831200444",
            "Name": "国家通用手语词典",
            "img": "https://cdn.jsdelivr.net/gh/honjun/cdn@1.6/img/cover/(5).jpg.webp",
            "CompleteDate":"2022年4月10日",
            "detail":"国家通用手语词典是一本国家通用手语单词的词典，适合国家通用手语学习。",
            "amount":2000,
          },
          spaceimgs:["https://cdn.jsdelivr.net/gh/honjun/cdn@1.6/img/cover/(5).jpg.webp"]
        })  
        var clearRoom = this.data.wordList;
        let countArr = [];
        let dateArr = [];
        let nameArr = [];
        var i = 0; // 定义一个数组来存放name
        for (let date in clearRoom) {
          dateArr.push(date);
          nameArr.push(clearRoom[date]);
          countArr.push(i);
          i++;
        }
        this.setData ({
          "dateArr":dateArr,
          "nameArr":nameArr,
          "countArr":countArr,
        })
        console.log(this.data.countArr)
      }
    })
    console.log(this.data.wordList)
    
  },
  setCurrent: function(e){  //当前图片索引
    this.setData({
      currentIndex:e.detail.current+1
    })
  },
  imgPreview: function(){ //图片预览
    const imgs = this.data.spaceimgs;
    wx.previewImage({
      current: imgs[this.data.currentIndex-1], // 当前显示图片的http链接
      urls: imgs // 需要预览的图片http链接列表
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
  studied:function() {
    wx.request({
      url: 'http://bewcf.info:8081/plan/queryCompletedWord?id='+this.data.planid,
      method:'GET',
      success: (res)=> {
        console.log(res.data)
        this.setData({
          'wordList':res.data
        })
      }
    })
  }
  // formateNumber:function(n){
  //   return n>9?n:'0'+n
  // }
})
