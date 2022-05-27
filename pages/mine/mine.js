const app = getApp()

Page({
  data: {
    filePath:'',//临时雷达图路径
    totalAmount: 3000,
    avatar: "",
    nickname: "",
    totalDate:30,
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
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    canIUseGetUserProfile: false,
    canIUseOpenData: wx.canIUse('open-data.type.userAvatarUrl') && wx.canIUse('open-data.type.userNickName') // 如需尝试获取用户信息可改为false
  },
  onLoad: function () {
  },
  statisticformonth: function() {
    wx.request({
      url: 'https://bewcf.info/card/queryLearnedByMonth?userId='+this.data.userInfo.id,
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
  login() {
    var that = this;
    // 登录
    console.log("执行了")
    wx.login({
      success (res) {
        if (res.code) {
          //发起网络请求
          wx.request({
            url: 'https://bewcf.info/user/login',
            data: {
              code: res.code
            },
            success: (res)=> {
              console.log(res);
              wx.setStorage({
                key: 'userInfo' ,
                data: res.data
              })
              that.setData({
                userInfo: res.data
              })
              wx.request({
                url: 'https://bewcf.info/card/queryLearnedByMonth?userId='+res.data.id,
                method:'GET',
                success: (res) => {
                  console.log(res)
                  var a = []
                  var b = []
                  for (var key in res.data) {
                   
                    a.push(key+"月");
                   
                    b.push(res.data[key])
                  }
                  that.setData({
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
              wx.request({
                url: 'https://bewcf.info/card/queryLearnedWord?userId='+res.data.id,
                method:"GET",
                success: function(res) {
                 that.setData ({
                   totalAmount:res.data
                 })
                }
              })
              wx.request({
                url: 'https://bewcf.info/card/queryLearnedDay?userId='+res.data.id,
                method:"GET",
                success: function(res) {
                 that.setData ({
                   totalDate:res.data
                 })
                }
              })
            }
          })
        } else {
          console.log('登录失败！' + res.errMsg)
        }
      }
    })
  },
  getUserProfile(e) {
    
    // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认，开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
    wx.getUserProfile({
      desc: '展示用户昵称', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        console.log(res)
        this.setData({
          nickname: res.userInfo.nickName,
          avatar:res.userInfo.avatarUrl,
          hasUserInfo: true,
          canIUseGetUserProfile: true
        })
        console.log(this.data.avatar)
      }
    })
    this.login();
  },
})
