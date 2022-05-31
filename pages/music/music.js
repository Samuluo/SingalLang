// index.js
// 获取应用实例
const app = getApp()

Page({
 data:{
     item:0,
     tab:0,
     isPlayingMusic:false,
     playlist:[
        {
        id:0,title:'钢琴曲',singer:'肖邦',src:'../../images/music/test.mp3',coverImgeUrl:'../../images/protectEar.png'
        },
        {
         id:1,title:'奏鸣曲',singer:'莫扎特',src:'../../images/music/test.mp3',coverImgeUrl:'../../images/protectEar.png'
         },
   ],
   stata:'paused',
   playIndex:0,
   play:{
      currentTime:'00:00',
      duration:'00:00',
      percent: 0,
      title:'',
      singer:'',
      coverImgeUrl:'../../images/protectEar.png',
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
 changeitem(e){
   // 获取点击的索引数据
    this.setData({
        // 给这个item赋值
        item:e.target.dataset.item
    })
 },
 changetab(e){
    this.setData({tab:e.detail.current})
 },

 audioCtx:null,
 onReady:function(){
    //  音乐接口
    this.audioCtx = wx.createInnerAudioContext()
    //调用
    this.setMusic(0)
 },
 setMusic(index){
    var music = this.data.playlist[index]
    this.audioCtx.src = music.src
    this.setData({
       playIndex:index,
       'play.title':music.title,
       'play.singer':music.singer,
       'play.coverImgUrl':music.coverImgeUrl,
       'play.currentTime':'00:00',
       'play.duration':'00:00',
       'play.percent':0
    })
 },
//播放
 play: function(){
    this.audioCtx.play()
    this.setData({ state:'running'})
 },
 //暂停
 pause: function(){
    this.audioCtx.pause()
    this.setData({ state:'paused'})
 },
 next: function(){
    //  如果满足，就等于0，不满足就加一
    var index = this.data.playIndex >= this.data.playlist.length - 1?0: this.data.playIndex + 1
   this.setMusic(index)
   if (this.data.state ==='running'){
      this.play()
   }else{
       this.pause()
   }
 },
 //点击下一曲
 changer:function(e){
     this.setMusic(e.Target.dataset.index)
     this.play()
 },
 
 onReady:function(){
    this.audioCtx = wx.createInnerAudioContext()
    var that = this
   //  播放失败检测
   this.audioCtx.onError(function(){
      console.log('播放失败:'+ that.audioCtx.src)
   })
   // 播放完成自动换下一曲
   this.audioCtx.onEnded(function(){
      thta.next()
   })
   // 自动更新播放进度
   this.audioCtx.onPlay(function(){})
   this.audioCtx.onTimeUpdate(function(){//音乐播放，进度更新就触发
      that.setData({
         'play.duration':formatTime(that.audioCtx.duration),//滑动时间
         'play.currentTime':formatTime(that.audioCtx.currentTime),//总时长
         'play.percent':that.audioCtx.currentTime /
                        that.audioCtx.duration * 100
      })
   })
   //  默认选择第一曲
this.setMusic(0)
   // 格式化时间
   function formatTime(time){
      var minute = Math.floor(time / 60) % 60;
      var second = Math.floor(time) % 60
      return (minute < 10 ? '0' + minute: minute) + ':' +
            (second < 10 ? '0' + second : second)
   }
 },
 //进度条到哪，就播放到哪
sliderChange: function(e){
   var second = e.detail.value * this.audioCtx.duration / 100
   this.audioCtx.seek(second)
},

sliderChanging:function(e){
   console.log(e.detail.value)
},
})

