const app = getApp()

Page({
  data: {
    filePath:'',//临时雷达图路径
    totalAmount: 3000,
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
        data:["1月","2月","3月","4月","5月"]
      },
      yAxis:{},
      series: [{
        name: '已学单词数',
        type: 'bar',
        data: [
          10,20,30,40,50
        ],
      }]
    },
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    canIUseGetUserProfile: false,
    canIUseOpenData: wx.canIUse('open-data.type.userAvatarUrl') && wx.canIUse('open-data.type.userNickName') // 如需尝试获取用户信息可改为false
  },
  // onInstance({detail: instance}) {
  //   const dom = instance.getDom()                                                                                                                                                                                                                                                                                                                                                                                                            
  //   const that = this;
  //   dom.saveAsImage().then((path) => {
  //     // 临时地址
  //     console.log(path);
  //     wx.saveImageToPhotosAlbum({
  //       filePath: path
  //     })
  //     that.setData({
  //       filePath:path
  //     })
  //   });
  //},
  onLoad: function () {
    this.onLoad2();
    if (wx.getUserProfile) {
      this.setData({
        canIUseGetUserProfile: true
      })
    }
  },
  onLoad2() {
    if (wx.getUserProfile) {
      this.setData({
        canIUseGetUserProfile: true
      })
    
    }
    this.login();
  },
  login() {
    var that = this;
    // 登录
    wx.login({
      success (res) {
        if (res.code) {
          //发起网络请求
          wx.request({
            url: 'http://bewcf.info:8081/user/login',
            data: {
              code: res.code
            },
            success: function(res) {
              console.log(res);
              wx.setStorage({
                key: 'userInfo' ,
                data: res.data
              })
              wx.request({
                url: 'http://bewcf.info:8081/card/queryLearnedWord?userId='+res.data.id,
                method:"GET",
                success: function(res) {
                 that.setData ({
                   totalAmount:res.data
                 })
                }
              })
              wx.request({
                url: 'http://bewcf.info:8081/card/queryLearnedDay?userId='+res.data.id,
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
      desc: '展示用户信息', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        console.log(res)
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    })
  },
  getUserInfo(e) {
    // 不推荐使用getUserInfo获取用户信息，预计自2021年4月13日起，getUserInfo将不再弹出弹窗，并直接返回匿名的用户个人信息
    console.log(e)
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  getUserProfile(e) {
    // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认，开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
    wx.getUserProfile({
      desc: '展示用户信息', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        console.log(res)
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    })
  },
  getUserInfo(e) {
    // 不推荐使用getUserInfo获取用户信息，预计自2021年4月13日起，getUserInfo将不再弹出弹窗，并直接返回匿名的用户个人信息
    console.log(e)
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
