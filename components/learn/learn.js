// components/learn.js
let touchDotX = 0; //X按下时坐标
let touchDotY = 0; //y按下时坐标
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
    color1:'#83c6c2',
    color2:'#83c6c2',
    color3:'#83c6c2',
    color4:'#83c6c2',
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
    uesrId:[],
    styleA:'',
    styleB:'',
    isComplete: 0,
    animationData1: {},
    ballTop1: 240,
    ballWidth1: 1080,
    index1: 3,
  },
  
  /**
   * 组件的方法列表
   */
  methods: {
    showb1() {
      this.setData({
        styleA: 'transform:rotateY(180deg)',
        styleB: 'transform:rotateY(0deg)'
      })
    },
    showb2() {
      this.setData({
        styleA: 'transform:rotateY(0deg)',
        styleB: 'transform:rotateY(-180deg)'
      })
    },
     /**
 * 卡片1手势
 */
 touchstart1: function (event) {
  touchDotX = event.touches[0].pageX; // 获取触摸时的原点
  touchDotY = event.touches[0].pageY;
  console.log("起始点的坐标X:" + touchDotX);
  console.log("起始点的坐标Y:" + touchDotY);
  },
  // 移动结束处理动画
  touchend1: function (event) {
  // 手指离开屏幕时记录的坐标
  let touchMoveX = event.changedTouches[0].pageX;
  let touchMoveY = event.changedTouches[0].pageY;
  // 起始点的坐标(x0,y0)和手指离开时的坐标(x1,y1)之差
  let tmX = touchMoveX - touchDotX;
  let tmY = touchMoveY - touchDotY;
  // 两点横纵坐标差的绝对值
  let absX = Math.abs(tmX);
  let absY = Math.abs(tmY);
  //起始点的坐标(x0,y0)和手指离开时的坐标(x1,y1)之间的距离
  let delta = Math.sqrt(absX * absX + absY * absY);
  console.log('起始点和离开点距离:' + delta + 'px');
  // 如果delta超过60px（可以视情况自己微调）,判定为手势触发
  if (delta >= 60) {
  // 如果 |x0-x1|>|y0-y1|,即absX>abxY,判定为左右滑动
  if (absX > absY) {
  // 如更tmX<0，即(离开点的X)-(起始点X)小于0 ，判定为左滑
  if (tmX < 0) {
   console.log("左滑=====");
   // 执行左滑动画
   
   //this.Animation1(-500);
   // 如更tmX>0，即(离开点的X)-(起始点X)大于0 ，判定为右滑
  } else {
   console.log("右滑=====");
   // 执行右滑动画
   //this.Animation1(500);
   this.showb1();
  }
  // 如果 |x0-x1|<|y0-y1|,即absX<abxY,判定为上下滑动
  } else {
  // 如更tmY<0，即(离开点的Y)-(起始点Y)小于0 ，判定为上滑
  if (tmY < 0) {
   console.log("上滑动=====");
   this.setData({
   isFront1: !this.data.isFront1
   });
   // 如更tmY>0，即(离开点的Y)-(起始点Y)大于0 ，判定为下滑
  } else {
   console.log("下滑动=====");
   this.setData({
   isFront1: !this.data.isFront1
   });
  }
  }
  } else {
  console.log("手势未触发=====");
  }
   
  // 让上一张卡片展现正面（如果之前翻转过的话）
  this.setData({
  isFront3: true,
  });
  },
  /**
 * 卡片1:
 * 左滑动右滑动动画
 */
 Animation1: function (translateXX) {
  let animation = wx.createAnimation({
  duration: 680,
  timingFunction: "ease",
  });
  this.animation = animation;
  this.showb2();
  // 如果大于0，判定是右滑动画，否则左滑
  if (translateXX > 0) {
  this.animation.translateY(0).rotate(20).translateX(translateXX).opacity(0).step();
  } else {
  this.animation.translateY(0).rotate(-20).translateX(translateXX).opacity(0).step();
  }
  // 设置10ms，视觉欺骗，直接归位到原来位置
  this.animation.translateY(0).translateX(0).opacity(1).rotate(0).step({
  duration: 10
  });
  
  this.setData({
  animationData1: this.animation.export(),
  });
  // 动画结束后重拍三张卡片
  setTimeout(() => {
  this.setData({
  ballTop1: 220,
  ballLeft1: 150,
  ballWidth1: 785,
  index1: 1,
  })
  }, 500);
  },
 
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
        if(v[i].completed==false){
          wordToFinish.push(v[i])
        }
      }
      that.setData({
        "amount":v.length,
       "wordToFinish":wordToFinish
      })
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
      var cWordTF = "wordToFinish["+that.data.index+"].completed";
      if(e.currentTarget.dataset.button=="button1"){
      if(e.currentTarget.dataset.answer==that.data.wordToFinish[that.data.index].word.answer){
        that.setData({
          'button1':"right",
          'color1':" #87c38f",
          [cWordTF]:true
        })
        that.data.FinishIndex.push(that.data.index)
        that.data.wordIds.push(e.currentTarget.dataset.id)
      }else{
        that.setData({
          'button1':"wrong",
          'color1':"rgb(253, 79, 79)",
        })
        wx.request({
          url: 'https://bewcf.info/mistakeWord/add',
          method:"post",
          data:{
            userId:that.data.userId,
            wordId:e.currentTarget.dataset.id,
            planId:that.data.planId
          },
          header: {
            "content-type": "application/x-www-form-urlencoded" 
          },
          success:(res)=>{
          }
        })
      }
     }//判断选择了哪个按钮，并做出相应样式改变，正确的话将正确的答案放入wordIds，并将wordtoFinish中的状态改为true
     if(e.currentTarget.dataset.button=="button2"){
      if(e.currentTarget.dataset.answer==that.data.wordToFinish[that.data.index].word.answer){
        that.setData({
          'button2':"right",
          'color2':" #87c38f",
          [cWordTF]:true
        })
        that.data.FinishIndex.push(that.data.index)
        that.data.wordIds.push(e.currentTarget.dataset.id)
      }else{
        that.setData({
          'button2':"wrong",
          'color2':"rgb(253, 79, 79)",
        })
        wx.request({
          url: 'https://bewcf.info/mistakeWord/add',
          method:"post",
          data:{
            userId:that.data.userId,
            wordId:e.currentTarget.dataset.id,
            planId:that.data.planId
          },
          header: {
            "content-type": "application/x-www-form-urlencoded" 
          },
          success:(res)=>{
          }
        })
      }
     }
     if(e.currentTarget.dataset.button=="button3"){
      if(e.currentTarget.dataset.answer==that.data.wordToFinish[that.data.index].word.answer){
        that.setData({
          'button3':"right",
          'color3':" #87c38f",
          [cWordTF]:true
        })
        that.data.FinishIndex.push(that.data.index)
        that.data.wordIds.push(e.currentTarget.dataset.id)
      }else{
        that.setData({   
          'button3':"wrong",
          'color3':"rgb(253, 79, 79)"
        })
        wx.request({
          url: 'https://bewcf.info/mistakeWord/add',
          method:"post",
          data:{
            userId:that.data.userId,
            wordId:e.currentTarget.dataset.id,
            planId:that.data.planId
          },
          header: {
            "content-type": "application/x-www-form-urlencoded" 
          },
          success:(res)=>{
          }
        })
      }
     }
     if(e.currentTarget.dataset.button=="button4"){
      if(e.currentTarget.dataset.answer==that.data.wordToFinish[that.data.index].word.answer){
        that.setData({
          'button4':"right",
          'color4':" #87c38f",
          [cWordTF]:true
        })
        that.data.FinishIndex.push(that.data.index)
        that.data.wordIds.push(e.currentTarget.dataset.id)
      }else{
        that.setData({
          'button4':"wrong",
          'color4':"rgb(253, 79, 79)"
        })
        wx.request({
          url: 'https://bewcf.info/mistakeWord/add',
          method:"post",
          data:{
            userId:that.data.userId,
            wordId:e.currentTarget.dataset.id,
            planId:that.data.planId
          },
          header: {
            "content-type": "application/x-www-form-urlencoded" 
          },
          success:(res)=>{
      
          }
        })
      }
     }
     setTimeout(function() {
       //如果需要完成的和已完成的相等，则说明上个是最后一题并且成功答对
      if(that.data.wordToFinish.length==that.data.wordIds.length){

        wx.setStorage({
          key: 'wordIds' ,
          data: that.data.wordIds,
          isComplete: 1,
        }
        )
        wx.redirectTo({
          url: '/pages/word-detail/word-detail?id='+e.currentTarget.dataset.id+'&&isLearning='+2,
        })
      }else{//答题未结束
      // wx.navigateTo({
      //   url: '/pages/word-detail/word-detail?id='+e.currentTarget.dataset.id+'&&isLearning='+1,
      //   success: function(res) {
      //     setTimeout(function() {
      //       that.setData({
      //         'prevId':that.data.wordToFinish[that.data.index].wordId,
      //       })
        
      //       that.triggerEvent("prevId",that.data.prevId);
      //       //如果这道题是一次循环的最后一题，下一题从0开始
      //       if(that.data.index==that.data.wordToFinish.length-1){
      //         that.setData({
      //           'index':0,
      //           'completeN':that.data.amount-that.data.wordToFinish.length+that.data.wordIds.length,
      //           'toCompletedN':that.data.wordToFinish.length-that.data.wordIds.length,
      //           'button1':"",
      //           'color1':"#83c6c2",
      //           'button2':"",
      //           'color2':"#83c6c2",
      //           'button3':"",
      //           'color3':"#83c6c2",
      //           'button4':"",
      //           'color4':"#83c6c2"
      //         })
      //       }else{//如果不是一次循环的后一道题，则+1
      //       that.setData({
      //         'index':that.data.index+1,
      //         'completeN':that.data.amount-that.data.wordToFinish.length+that.data.wordIds.length,
      //         'toCompletedN':that.data.wordToFinish.length-that.data.wordIds.length,
      //         'button1':"",
      //         'color1':"#83c6c2",
      //         'button2':"",
      //         'color2':"#83c6c2",
      //         'button3':"",
      //         'color3':"#83c6c2",
      //         'button4':"",
      //         'color4':"#83c6c2"
      //       })
      //      }//当为true，继续到下一道
      //       while(that.data.wordToFinish[that.data.index].completed==true){
      //           if(that.data.index==that.data.wordToFinish.length-1){
      //             console.log("到头了")
      //             that.setData({
      //               'index':0,
      //             })
      //           }
      //           else{
      //             that.setData({
      //               'index':that.data.index+1,
      //             })
      //           }
      //       }
      //       that.setData({
      //         'nowword':that.data.wordToFinish[that.data.index],
      //       })
      //       that.triggerEvent("completeN",that.data.completeN);
      //       that.triggerEvent("toCompletedN",that.data.toCompletedN);
      //       that.triggerEvent("nowword",that.data.nowword);
      //       wx.setStorage({
      //         key: 'wordIds' ,
      //         data: that.data.wordIds
      //       }
      //       )
      //       let answer = [that.data.wordToFinish[that.data.index].word.answer,that.data.wordToFinish[that.data.index].word.answer2,that.data.wordToFinish[that.data.index].word.answer3,that.data.wordToFinish[that.data.index].word.answer4];
      //       const randomSort = () => {
      //         return Math.random() > 0.5 ? -1 : 1;
      //       };
      //       answer.sort(() => randomSort());
      //       that.setData({
      //         'method':'answer',
      //         'answer1':answer[0],
      //         'answer2':answer[1],
      //         'answer3':answer[2],
      //         'answer4':answer[3],
      //       })
      //     }, 1000);
      //   }
      // })
      that.setData({
        styleA: 'transform:rotateY(180deg)',
        styleB: 'transform:rotateY(0deg)'
      })
      
    }
    },600);
   
    },
    goon: function() {
      let that = this;
      setTimeout(function() {
        that.Animation1(500);
      },500);
      setTimeout(function() {
        
        that.setData({
          'prevId':that.data.wordToFinish[that.data.index].wordId,
        })
        that.triggerEvent("prevId",that.data.prevId);
        //如果这道题是一次循环的最后一题，下一题从0开始
        if(that.data.index==that.data.wordToFinish.length-1){
          that.setData({
            'index':0,
            'completeN':that.data.amount-that.data.wordToFinish.length+that.data.wordIds.length,
            'toCompletedN':that.data.wordToFinish.length-that.data.wordIds.length,
            'button1':"",
            'color1':"#83c6c2",
            'button2':"",
            'color2':"#83c6c2",
            'button3':"",
            'color3':"#83c6c2",
            'button4':"",
            'color4':"#83c6c2"
          })
        }else{//如果不是一次循环的后一道题，则+1
        that.setData({
          'index':that.data.index+1,
          'completeN':that.data.amount-that.data.wordToFinish.length+that.data.wordIds.length,
          'toCompletedN':that.data.wordToFinish.length-that.data.wordIds.length,
          'button1':"",
          'color1':"#83c6c2",
          'button2':"",
          'color2':"#83c6c2",
          'button3':"",
          'color3':"#83c6c2",
          'button4':"",
          'color4':"#83c6c2"
        })
       }//当为true，继续到下一道
        while(that.data.wordToFinish[that.data.index].completed==true){
            if(that.data.index==that.data.wordToFinish.length-1){
              console.log("到头了")
              that.setData({
                'index':0,
              })
            }
            else{
              that.setData({
                'index':that.data.index+1,
              })
            }
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
      }, 800);
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
            url: 'https://bewcf.info/plan/queryNow',
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
