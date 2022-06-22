// index.js
// 获取应用实例
const app = getApp()
 
Page({
  // 页面初始数据
  data: {
    item:0,
    userId:[],
    //记录当前页的索引
    tab:0,
    // 播放列表
    playlist:[],
    state:"paused",
    // 播放的索引值
    playIndex:0,
    songIndex:0,
    showtop:false,
    //设置的默认值
    play:{
      // 当前时间
      currentTime:'00.00',
      // 歌曲总时间
      duration:'00.00',
      // 播放进度
      percent:0,
      title:'',
      singer:'',
      coverImgUrl:"/images/protectEar.png",
    },
   imgUrls:[
    ],
    indicatorDots:true,
    autoplay:true,
    interval:3000,
    duration:500,
    listInfo: {
      coverImgUrl:'https://cdn.bewcf.info/signlang/song_list_img1.webp',
      title:'我的收藏',
      introduction:'收藏你喜欢的音乐吧，记得保护耳朵喔'
    },
    songlist:{}
  },
  // 保存在page里面了,音频对象
  audioCtx:null,
  
  changeitem:function(e){
    //设置获取item的值，来实现页面切换
    this.setData({
      item:e.target.dataset.item
    })
  },
  changetab:function(e){
    this.setData({
      //当前页的索引
      tab:e.detail.current,
      'showtop':false,
    })
  },
  // 手动控制进度
  sliderChange:function(e){
    var that = this
    var second=e.detail.value *this.audioCtx.duration / 100
    //跳到指定位置
    this.audioCtx.pause()
    this.audioCtx.seek(second)
    setTimeout(() => {
      this.play()
    }, 500); 
  },
  showtop:function(){
    var that = this
    that.setData({
      'showtop':true
    })
  },
  closeTop:function(){
    var that = this
    that.setData({
      'showtop':false
    })
  },
  onLoad:function(){
    var that = this
    wx.request({
      url: 'https://bewcf.info/song/getSongList',
      method:"get",
      data:{
      },
      success:(res)=>{
        const newArr = [];
        while(res.data.length > 0) {
          newArr.push(res.data.splice(0, 3));
        }
        console.log(newArr)
        that.setData({
          'songlist':newArr
        })
      }
    })
    wx.getStorage({
      key: 'userInfo',
      success(res){
        that.setData({
          'userId': res.data.id,
        })
      }
    })
  },
  onReady:function(){
    //获取音频播放对象
    var that=this
   this.audioCtx=wx.createInnerAudioContext()
    // 播放失败检测
    this.audioCtx.onError(function(){
      console.log("播放失败:"+that.audioCtx.src)
    })
    wx.request({
      url: 'https://bewcf.info/song/getSong',
      method:"get",
      data:{
        songListId:1,
        userId:this.data.userId
      },
      success:(res)=>{
        that.setData({
          'playlist':res.data
        })
      }
    })
    wx.request({
      url: 'https://bewcf.info/swiper/getMusic',
      method:"get",
      success:(res)=>{
        that.setData({
          'imgUrls':res.data
        })
      }
    })
  },
 setMusic:function(index){
  console.log(this.data.playlist)
  var music=this.data.playlist[index]
  this.audioCtx.src=music.url
  this.setData({
    playIndex:index,
    songIndex:music.id,
    'play.title':music.title,
    'play.author':music.author,
    "play.coverImgUrl":music.imgUrl,
    "play.currentTime":'00:00',
    "play.duration":'00:00',
    "play.percent":0
  })
 },
  play:function(){
    var that = this
    that.audioCtx.play()
    this.setData({
      state:"running"
    })
    function formatTime(time){    
      var minute=Math.floor(time/60)%60;
      var second=Math.floor(time)%60;
      return(minute<10? '0'+minute:minute)+":"+
      (second<10?'0'+second:second)
    }
    this.audioCtx.onPlay(function(){})
    this.audioCtx.onTimeUpdate(function(){
      console.log('hi')
      that.setData({
        //获取总时间
        'play.duration':formatTime(that.audioCtx.duration),
        //当前歌曲播放的时长
        'play.currentTime':formatTime(that.audioCtx.currentTime),
        'play.percent':that.audioCtx.currentTime/that.audioCtx.duration*100
      })
    })
  },
  pause:function(){
    this.audioCtx.pause()
    this.setData({
      state:"paused"
    })
  },
  // 播放列表中的换曲功能
  change:function(e){
    if(e.currentTarget.dataset.index!=this.data.playIndex)
    {
    console.log("hi")
    var that = this
    console.log(e)
    this.setMusic(e.currentTarget.dataset.index);
    setTimeout(function () {
      that.play()
    }, 700)
   }
  },
  star:function(e){
    console.log(e.currentTarget)
    var that = this
    let tag =  'playlist[' + e.currentTarget.dataset.index + '].isStar'
    if(e.currentTarget.dataset.isstar==false){
      wx.request({
        url: 'https://bewcf.info/song/star',
        method:"post",
        data:{
          songId:e.currentTarget.dataset.id,
          userId:this.data.userId
        },
        header: {
          "content-type": "application/x-www-form-urlencoded" 
        },
        success:(res)=>{
          that.setData({
            [tag]:true
          })
          console.log(this.data.playlist)
        }
      })
    }else if(e.currentTarget.dataset.isstar==true){
      wx.request({
        url: 'https://bewcf.info/song/cancelStar',
        method:"post",
        data:{
          songId:e.currentTarget.dataset.id,
          userId:this.data.userId
        },
        header: {
          "content-type": "application/x-www-form-urlencoded" 
        },
        success:(res)=>{
          that.setData({
            [tag]:false
          })
          console.log(this.data.playlist)
        }
      })
    }
  },
  songs:function(e){
    console.log(e)
    if(e.currentTarget.dataset.item.id=="6"){
      wx.navigateTo({
        url: '/pages/handVideo/handVideo',
      })
    }else{
    var that = this
    wx.request({
      url: 'https://bewcf.info/song/getSong',
      method:"get",
      data:{
        songListId:e.currentTarget.dataset.item.id,
        userId:this.data.userId
      },
      success:(res)=>{
        that.setData({
          'playlist':res.data
        })
      }
    })
    that.setData({
      'listInfo.title':e.currentTarget.dataset.item.title,
      'listInfo.introduction':e.currentTarget.dataset.item.introduction,
      'listInfo.imgUrl':e.currentTarget.dataset.item.imgUrl,
      'item':2
    })
  }
  }
})