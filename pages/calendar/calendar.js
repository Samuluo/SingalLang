// pages/calendar/calendar.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userId:[],
    week: ["一", "二", "三", "四", "五", "六", "日"],//星期
    maxDayList: [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],//一年12个月，每个月的天数，初始化都给平年
    nowYear: new Date().getFullYear(),//当前年份
    nowMonth: new Date().getMonth()+1,//当前月份
    totalDay: [],//日历天数
    cards:[],
    options: {
      title: {
        text: '学习统计'
      },

      tooltip: {},
      legend: {
        data: ['已学单词数'],
        x:'right'
      },
      xAxis:{
        data:[]
      },
      yAxis:{},
      series: [{
        name: '已学单词数',
        type: 'bar',
        data: [
          
        ],
      }]
    },
  },

  /**
   * 切换年、月
   */
  changeDate(e) {
    let type = e.currentTarget.dataset.type;
    let nowYear = this.data.nowYear;
    let nowMonth = this.data.nowMonth;
    switch(type) {
      case "preYear": //上一年
        nowYear -= 1;
        this.setData({nowYear});
        break;
      case "preMonth": //上一月
        nowMonth -= 1;
        if(nowMonth <= 0) {
          nowMonth = 12;
          nowYear -= 1;
        }
        break;
      case "nextMonth": //下一月
        nowMonth += 1;
        if(nowMonth >= 13) {
          nowMonth = 1;
          nowYear += 1;
        }
        break;
      case "nextYear": //下一年
        nowYear += 1;
        break;
    }
    this.setData({nowYear, nowMonth});
    this.initCalendar();
  },
  statisticformonth: function() {
    wx.request({
      url: 'https://bewcf.info/card/queryLearnedByMonth?userId='+this.data.userId,
      method:'GET',
      success: (res) => {
        console.log(res)
        var a = []
        var b = []
        for (var key in res.data) {
          console.log(key);     //获取key值 
          a.push(key+"月");
          console.log(res[key]); //获取对应的value值
          b.push(res[key])
        }
        this.setData({
          options: {
            title: {
              text: '学习统计'
            },
      
            tooltip: {},
            legend: {
              data: ['已学单词数'],
              x:'right'
            },
            xAxis:{
              data:a,
            },
            yAxis:{},
            series: [{
              name: '已学单词数',
              type: 'bar',
              data: b,
            }]
          },

        })
      }
    })
  },
  /**
   * 初始化日历
   */
  initCalendar() {
    var that = this
    let maxDayList = this.data.maxDayList;
    let year = this.data.nowYear, month = this.data.nowMonth;
    if((year%4 == 0 && year%100 != 0) || year%400 == 0) {//计算当前年是不是闰年，规则：能被4整除且不被100整除，或者能被400整除的年份
      maxDayList[1] = 29;//2月份29天
    }else {//平年
      maxDayList[1] = 28;//2月份28天
    }
    this.setData({maxDayList});
    let firstDayWeek = new Date(year + "-" + month + "-1").getDay() ;//当前月的1号是星期几
    firstDayWeek = firstDayWeek > 0 ? firstDayWeek : 7;//星期日从0转成7
    let endDayWeek = new Date(year + "-" + month + "-" +maxDayList[month - 1]).getDay();//当前月最后一天是星期几
    endDayWeek = endDayWeek > 0 ? endDayWeek : 7;//星期日从0转成7
    let beforArr = [], afterArr = [];//beforArr：本月1号之前需要补充上个月月尾几天，afterArr：本月尾补充下个月月初几天
    //求出补充的上个月的日子
    for(let i=0; i<firstDayWeek-1; i++) {//找出1号之前的空缺上个月的尾数日,比如今天是周三，则i=3-1, 取前两天的日子
      let deffTime = (i+1)*24*60*60*1000; //缺的天数的毫秒值
      let firstTime = new Date(year + "-" + month + "-1").getTime();//本月1号的毫秒值
      beforArr[i] = {otherMonth: true, day: new Date(firstTime - deffTime).getDate()};//从对应月份的尾数天开始存，比如31，30，29... 
    }
    beforArr = beforArr.reverse();//将补的上月的日子翻转
    //求出补充的下个月的日子
    for(let i=0; i<7-endDayWeek; i++) {//找出月尾对应的星期几，看看到周日还差几天就从下个月月初补几天
      afterArr[i] = {otherMonth: true, day: i+1};
    }
    let nowMonthArr = [];//当前月所有日子
    let temp
    let tempday
    for(let i=0; i<maxDayList[month - 1]; i++) {
      nowMonthArr[i] = {day: i+1};
      tempday = i + 1
      temp = year + (month < 10 ? '0' + month : month) + (tempday < 10 ? ('0' + tempday) : tempday);
      if(that.data.cards.indexOf(temp) != -1) {
        nowMonthArr[i].car= true;
      }
      if(year == new Date().getFullYear()) {//如果切换到了本年本月本日，则凸显今日
        if(month == new Date().getMonth() + 1) {
          if(new Date().getDate() == i+1) {
            nowMonthArr[i].today = true;
          }
        }
      }
    }
    let totalDayList = beforArr.concat(nowMonthArr).concat(afterArr);//将所有日期拼接
    let totalDay = [], arr = [];//totalDay:最终用来展示数据，arr：用来分割每一周的日子
    for(let i=0; i<totalDayList.length; i++) {
      arr.push(totalDayList[i]);
      if((i+1)%7 == 0) {//每7天存为一组
        totalDay.push(arr);
        arr = [];//存完清空
      }
    }
    this.setData({totalDay});
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    wx.request({
      url: 'https://bewcf.info/card/queryAll',
      method:"get",
      data:{
        userId:options.userId
      },
      success:(res)=>{                
        let cardday=[];
        for(var i = 0; i<res.data.length;i++){
          if(res.data[i].completed==true){
           cardday.push(res.data[i].clockTime.split('-').join(''))
          }
        }
        that.setData({
          cards:cardday,
          userId:options.userId
        })
        this.initCalendar();
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})
