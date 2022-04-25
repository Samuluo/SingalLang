// components/learn.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
      words:{
        type:Array,
        observer:'loadFirst'
      }
    },

  /**
   * 组件的初始数据
   */
  data: {
    button1:'primary',
    button2:'primary',
    button3:'primary',
    button4:'primary',
    color1:'#9EDDB2 ',
    color2:'#9EDDB2 ',
    color3:'#9EDDB2 ',
    color4:'#9EDDB2 ',
    judge:[],
    userId:1000,
    index:0,
    wordIndex:[],
    wordToFinish:[],
    wordId:[]
  },

  /**
   * 组件的方法列表
   */
  methods: {
    loadFirst(v) {
      var that = this
      let wordToFinish=[];
      for(var i = 0; i<v.length;i++){
        if(v[i].completed==false){
          wordToFinish.push(v[i])
        }
      }
      that.setData({
       "wordToFinish":wordToFinish
      })
   },
    answer:function(e){
      var that = this
      if(e.currentTarget.dataset.button=="button1"){
      if(e.currentTarget.dataset.answer==that.data.wordToFinish[that.data.index].word.answer){
        that.setData({
          'button1':"right",
          'color1':" rgb(79, 134, 253)"
        })
      }else{
        that.setData({
          'button1':"wrong",
          'color1':"rgb(253, 79, 79)"
        })
      }
     }
     if(e.currentTarget.dataset.button=="button2"){
      if(e.currentTarget.dataset.answer==that.data.wordToFinish[that.data.index].word.answer){
        that.setData({
          'button2':"right",
          'color2':" rgb(79, 134, 253)"
        })
      }else{
        that.setData({
          'button2':"wrong",
          'color2':"rgb(253, 79, 79)"
        })
      }
     }
     if(e.currentTarget.dataset.button=="button3"){
      if(e.currentTarget.dataset.answer==that.data.wordToFinish[that.data.index].word.answer){
        that.setData({
          'button3':"right",
          'color3':" rgb(79, 134, 253)"
        })
      }else{
        that.setData({   
          'button3':"wrong",
          'color3':"rgb(253, 79, 79)"
        })
      }
     }
     if(e.currentTarget.dataset.button=="button4"){
      if(e.currentTarget.dataset.answer==that.data.wordToFinish[that.data.index].word.answer){
        that.setData({
          'button4':"right",
          'color4':" rgb(79, 134, 253)"
        })
      }else{
        that.setData({
          'button4':"wrong",
          'color4':"rgb(253, 79, 79)"
        })
      }
     }
     setTimeout(function() {
      wx.navigateTo({
        url: '/pages/word-detail/word-detail?id='+e.currentTarget.dataset.id,
        success: function(res) {
          setTimeout(function() {
            that.setData({
              'index':that.data.index+1,
              'button1':"",
              'color1':"#9EDDB2",
              'button2':"",
              'color2':"#9EDDB2 ",
              'button3':"",
              'color3':"#9EDDB2 ",
              'button4':"",
              'color4':"#9EDDB2 "
            })
          }, 1000);
          wx.setStorage({
            key: 'learnIndex' ,
            data: that.data.index
          })
        }
      })
    },600);
     console.log(that.data.button1)
     console.log(that.data.button2)
     console.log(that.data.button3)
     console.log(that.data.button4)
     console.log(e)
     console.log(that.data.wordToFinish)
     console.log(that.data.wordToFinish[that.data.index])
     console.log(that.data.judge)
    }
  },
  lifetimes:{
    ready:function(){
      var that = this
    },
    attached: function () {
      var that = this
      wx.setStorage({
        key: 'learnIndex' ,
        data: that.data.index
      }
      )
      wx.getStorage({
        key: 'learnIndex',
        success(res){
          that.setData({
            'userId': that.data.index,
          })
        }
      })
    },
  }
})
