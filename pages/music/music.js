// index.js
// 获取应用实例
const app = getApp()
 
Page({
  // 页面初始数据
  data: {
    item:0,
    //记录当前页的索引
    tab:0,
    // 播放列表
    playlist:[{
      id:1,
      title:"周杰伦阿三大苏打",
      singer:"周杰伦",
      src:"/images/music/test.mp3",
      coverImgUrl:"/images/protectEar.png"
    },{
      id:2,
      title:"第一次爱的人委屈恶气",
      singer:"王心凌",
      src:"/images/music/test2.mp3",
      coverImgUrl:"/images/protectEar.png"
    }],
    state:"paused",
    // 播放的索引值
    playIndex:0,
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
    "../../images/music/swip1.jpg",
    "../../images/music/prop2.jpeg",
    "../../images/music/prop3.jpeg",
    ],
    indicatorDots:true,
    autoplay:true,
    interval:3000,
    duration:500,
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
      tab:e.detail.current
    })
  },
  // 手动控制进度
  sliderChange:function(e){
    var that = this
    var second=e.detail.value *this.audioCtx.duration / 100
    console.log(e)
    console.log(this.audioCtx.duration)
    console.log(second)
    //跳到指定位置
    this.audioCtx.seek(second)
    this.audioCtx.onPlay(function(){})
    this.audioCtx.onTimeUpdate(function(){
      console.log("hi")
      that.setData({
        //获取总时间
        'play.duration':formatTime(that.audioCtx.duration),
        //当前歌曲播放的时长
        'play.currentTime':formatTime(that.audioCtx.currentTime),
        'play.percent':that.audioCtx.currentTime/that.audioCtx.duration*100
      })
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

    this.setMusic(0)
  },
 setMusic:function(index){
  var music=this.data.playlist[index]
  this.audioCtx.src=music.src
  this.setData({
    playIndex:index,
    'play.title':music.title,
    'play.singer':music.singer,
    "play.coverImgUrl":music.coverImgUrl,
    "play.currentTime":'00:00',
    "play.duration":'00:00',
    "play.percent":0
  })
 },
  play:function(){
    console.log('e')
    var that = this
      this.audioCtx.play()
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
      console.log("hi")
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
    var that = this
    this.setMusic(e.currentTarget.dataset.index);
    setTimeout(function () {
      that.play()
    }, 700)
  }
})