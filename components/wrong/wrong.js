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
    method:'answer',
    prevId:-1,
    answer1:[],
    answer2:[],
    answer3:[],
    answer4:[],
    completeN:[],
    toCompletedN:[],
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
    amount:0,
    nowword:[],
    wordIndex:[],
    wordToFinish:[],
    FinishIndex:[],
    wordIds:[],
    planId:[],
    uesrId:[]
  },

  /**
   * 组件的方法列表
   */
  methods: {
    updateWTF(){
      var that = this
      let wordToFinish=[];
      for(var i = 0; i<that.data.wordToFinish.length;i++){
        if(that.data.wordToFinish[i].completed==false){
          wordToFinish.push(that.data.wordToFinish[i])
        }
      }
      that.setData({
       "wordToFinish":wordToFinish
      })
    },
    loadFirst(v) {
  
      var that = this
      let wordToFinish=[];
      for(var i = 0; i<v.length;i++){
          wordToFinish.push(v[i])
      }
      that.setData({
        "amount":wordToFinish.length,
       "wordToFinish":wordToFinish
      })
      console.log(that.data.wordToFinish)
      if(wordToFinish.length>0){
      let answer = [that.data.wordToFinish[that.data.index].word.answer,that.data.wordToFinish[that.data.index].word.answer2,that.data.wordToFinish[that.data.index].word.answer3,that.data.wordToFinish[that.data.index].word.answer4];
      const randomSort = () => {
        return Math.random() > 0.5 ? -1 : 1;
      };
      answer.sort(() => randomSort());
      that.setData({
        'answer1':answer[0],
        'answer2':answer[1],
        'answer3':answer[2],
        'answer4':answer[3],
        'completeN':that.data.amount-that.data.wordToFinish.length+that.data.wordIds.length,
        'toCompletedN':that.data.wordToFinish.length-that.data.wordIds.length
      })
      }
      that.setData({
        'nowword':that.data.wordToFinish[that.data.index],
      })
      that.triggerEvent("completeN",that.data.completeN);
      that.triggerEvent("toCompletedN",that.data.toCompletedN);
      that.triggerEvent("nowword",that.data.nowword);
   },
    answer:function(e){
      var that = this
      that.setData({
        'method':"",
      })
      if(e.currentTarget.dataset.button=="button1"){
      if(e.currentTarget.dataset.answer==that.data.wordToFinish[that.data.index].word.answer){
        that.setData({
          'button1':"right",
          'color1':" rgb(79, 134, 253)",
        })
        that.data.FinishIndex.push(that.data.index)
        that.data.wordIds.push(e.currentTarget.dataset.id)
      }else{
        that.setData({
          'button1':"wrong",
          'color1':"rgb(253, 79, 79)"
        })
      }
     }//判断选择了哪个按钮，并做出相应样式改变，正确的话将正确的答案放入wordIds，并将wordtoFinish中的状态改为true
     if(e.currentTarget.dataset.button=="button2"){
      if(e.currentTarget.dataset.answer==that.data.wordToFinish[that.data.index].word.answer){
        that.setData({
          'button2':"right",
          'color2':" rgb(79, 134, 253)",
        })
        that.data.FinishIndex.push(that.data.index)
        that.data.wordIds.push(e.currentTarget.dataset.id)
      }else{
        that.setData({
          'button2':"wrong",
          'color2':"rgb(253, 79, 79)",
        })
      }
     }
     if(e.currentTarget.dataset.button=="button3"){
      if(e.currentTarget.dataset.answer==that.data.wordToFinish[that.data.index].word.answer){
        that.setData({
          'button3':"right",
          'color3':" rgb(79, 134, 253)",
        })
        that.data.FinishIndex.push(that.data.index)
        that.data.wordIds.push(e.currentTarget.dataset.id)
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
          'color4':" rgb(79, 134, 253)",
        })
        that.data.FinishIndex.push(that.data.index)
        that.data.wordIds.push(e.currentTarget.dataset.id)
      }else{
        that.setData({
          'button4':"wrong",
          'color4':"rgb(253, 79, 79)"
        })
      }
     }
     setTimeout(function() {
       //答题未结束
       if(that.data.index==that.data.wordToFinish.length-1){
        console.log('hi')
        wx.setStorage({
          key: 'wordIds' ,
          data: that.data.wordIds
        }
        )
        wx.redirectTo({
          url: '/pages/word-detail/word-detail?id='+e.currentTarget.dataset.id,
        })
      }else{
      wx.navigateTo({
        url: '/pages/word-detail/word-detail?id='+e.currentTarget.dataset.id,
        success: function(res) {
          setTimeout(function() {
            that.setData({
              'prevId':that.data.wordToFinish[that.data.index].wordId,
            })
            that.triggerEvent("prevId",that.data.prevId);
            //如果这道题是一次循环的最后一题,结束
            if(that.data.index==that.data.wordToFinish.length-1){
              console.log('hi')
              wx.setStorage({
                key: 'wordIds' ,
                data: that.data.wordIds
              }
              )
              wx.redirectTo({
                url: '/pages/word-detail/word-detail?id='+e.currentTarget.dataset.id,
              })
            }else{//如果不是一次循环的后一道题，则+1
            that.setData({
              'index':that.data.index+1,
              'completeN':that.data.amount-that.data.wordToFinish.length+that.data.wordIds.length,
              'toCompletedN':that.data.wordToFinish.length-that.data.wordIds.length,
              'button1':"",
              'color1':"#9EDDB2",
              'button2':"",
              'color2':"#9EDDB2 ",
              'button3':"",
              'color3':"#9EDDB2 ",
              'button4':"",
              'color4':"#9EDDB2 "
            })
           }
            that.setData({
              'nowword':that.data.wordToFinish[that.data.index],
            })
            that.triggerEvent("completeN",that.data.completeN);
            that.triggerEvent("toCompletedN",that.data.toCompletedN);
            that.triggerEvent("nowword",that.data.nowword);
            wx.setStorage({
              key: 'wordIds' ,
              data: that.data.wordIds
            }
            )
            let answer = [that.data.wordToFinish[that.data.index].word.answer,that.data.wordToFinish[that.data.index].word.answer2,that.data.wordToFinish[that.data.index].word.answer3,that.data.wordToFinish[that.data.index].word.answer4];
            const randomSort = () => {
              return Math.random() > 0.5 ? -1 : 1;
            };
            answer.sort(() => randomSort());
            that.setData({
              'method':'answer',
              'answer1':answer[0],
              'answer2':answer[1],
              'answer3':answer[2],
              'answer4':answer[3],
            })
          }, 1000);
        }
      })
    }
    },600);
    }
  },
  lifetimes:{
    ready:function(){
      var that = this
      wx.getStorage({
        key: 'userInfo',
        success(res){
          that.setData({
            'userId':res.data.id
          })
          wx.request({
            url: 'http://bewcf.info:8081/plan/queryNow',
            method:"get",
            data:{
              userId:that.data.userId
            },
            success:(res)=>{
              that.setData({
                'planId':res.data.id,
              })
            }
          })
        }
      })

    },
    attached: function () {
    },
  }
})
