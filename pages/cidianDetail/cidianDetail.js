const citys = {
  每日背单词: ['5个', '10个', '20个', '30个', '40个'],
  完成天数: ['福州', '厦门', '莆田', '三明', '泉州'],
};

Page({
  data: {
    windowHeight: '',
    options: [],
    color1: '#83c6c2',
    color2: '#aad1cf',
    color3: '#aad1cf',
    userId: -1,
    planId:'',
    plan: {},
    countArr:[],
    dateArr:[],
    nameArr:[],
    planid: [],
    wordList:null,
    wordList2:null,
    wordList3:null,
    spacedata:{},
    spaceimgs:[],
    loading: true,
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
  onLoad: function (options) {
    var that = this
    var f = JSON.parse(options.plan) 
    console.log(f)
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          windowHeight: res.windowHeight
        })
      },
    })
    wx.getStorage({
      key: 'userInfo',
      success:(res)=>{
        console.log(res.data.id)
        this.setData({
          'userId': res.data.id,
          'plan': f,
          'planid': f.id,
          options: options
        })
        console.log(this.data.planid)
        wx.request({
          url: 'https://bewcf.info/plan/queryCompletedWord?id='+f.id,
          method:'get',
          success: (res)=> {
            console.log(res.data)
            var clearRoom = res.data;
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
              "wordList": clearRoom
            })
            console.log(this.data.countArr)
          }
        })
      }
    })

  },
  setCurrent: function(e){  //当前图片索引
    this.setData({
      currentIndex:e.detail.current+1
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
  studied:function() {
    this.setData({
      wordList2: null,
      wordList3: null,
    })
    this.setData({
      color1: '#83c6c2',
      color2: '#aad1cf',
      color3: '#aad1cf'
    })
    console.log(this.data.planid)
    wx.request({
      url: 'https://bewcf.info/plan/queryCompletedWord?id='+this.data.planid,
      method:'get',
      success: (res)=> {
        console.log(res.data)
        var clearRoom = res.data;
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
          "wordList": clearRoom
        })
        console.log(this.data.countArr)
      }
    })
  },
  mistaked: function(e) {
    this.setData({
      wordList: null,
      wordList3: null,
    })
    this.setData({
      color1: '#aad1cf',
      color2: '#83c6c2',
      color3: '#aad1cf'
    })
    var that = this;
    console.log(this.data.userId)
    wx.request({
      url: 'https://bewcf.info/mistakeWord/queryAll?userId='+this.data.userId,
      method:'GET',
      success: (res)=> {
        console.log(res.data)
        this.setData({
          'wordList2':res.data
        })
        console.log(this.data.wordList2)
      }
    })
  },
  notstudy: function(e) {
    this.setData({
      wordList2: null,
      wordList: null,
    })
    this.setData({
      color1: '#aad1cf',
      color2: '#aad1cf',
      color3: '#83c6c2'
    })
    var that = this;
    wx.request({
      url: 'https://bewcf.info/plan/queryAllWord?id='+that.data.planid+'&completed=0',
      method:'GET',
      success: (res)=> {
        console.log(res.data)
        this.setData({
          'wordList3':res.data
        })
        for (let i = 0; i <res.data.length; i++) {
          wx.createSelectorQuery().select('#curr' + i).boundingClientRect(function (rect) {
            that.data.wordList3[i].height = rect.top
            if (that.data.wordList3[i].height <= that.data.windowHeight) {
              that.data.wordList3[i].hide = true
            } else {
              that.data.wordList3[i].hide = false
            }
            if (i == (res.data.length - 1)) {
              that.setData({
                'wordList3':that.data.wordList3
              })
            }
          }).exec()
        }
      }
    })
  },
  onPageScroll: function (e) {
    let that = this
    if (that.data.detail[that.data.detail.length - 1].hide) {
      return false
    }
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          windowHeight: res.windowHeight + e.scrollTop
        })
      },
    })
    for (let i = 0; i < that.data.detail.length; i++) {
      if (that.data.detail[i].height <= that.data.windowHeight) {
        that.data.detail[i].hide = true
      } else {
        that.data.detail[i].hide = that.data.detail[i].hide ? true : false
      }
    }
    that.setData({
      detail: that.data.detail
    })
  },
  getdetail: function(e) {
    var item = e.currentTarget.dataset.item;
    wx.navigateTo({
      url: '/pages/word-detail/word-detail?id='+item,
    })
  },
  setStar: function(e) {
    var that = this;
    var item = e.currentTarget.dataset.item;
    wx.getStorage({
      key: 'userInfo',
      success(res){
        console.log(res.data.id)
        that.setData({
          'userId': res.data.id,
        })
        wx.request({
          url: 'https://bewcf.info/starWord/add',
          method:'POST',
          data:{
            "userId": that.data.userId,
            "wordId": item,
          },
          header: {
            "content-type": "application/x-www-form-urlencoded" 
          },
          success:(res)=>{
            console.log(res)
            that.mistaked();
            that.onLoad(that.data.options);

          }
        })
      }
    })
  },
  setNotStar: function(e) {
    var that = this;
    var item = e.currentTarget.dataset.item;
    wx.getStorage({
      key: 'userInfo',
      success(res){
        //console.log(res.data.id)
        that.setData({
          'userId': res.data.id,
        })
        wx.request({
          url: 'https://bewcf.info/starWord/removeOne',
          method:'POST',
          data:{
            "userId": that.data.userId,
            "wordId": item,
          },
          header: {
            "content-type": "application/x-www-form-urlencoded" 
          },
          success:(res)=>{
            //console.log(res)
            that.mistaked();
            that.onLoad(that.data.options);
          }
        })
      }
    })
  },
})
