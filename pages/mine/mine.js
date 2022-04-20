const app = getApp()

Page({
  data: {
    filePath:'',//临时雷达图路径
    options: {
      title: {
        text: ''
      },
      tooltip: {},
      legend: {
        data: []
      },
      radar: {
        shape: 'polygon',
        name: {
          textStyle: {
            color: '#999999',
            backgroundColor: '#fff',
            borderRadius: 3,
            padding: [3, 5]
          }
        },
        center: ['50%', '50%'],
        indicator:  [{
          "name": "测试",
          "max": 10
        }, {
          "name": "店铺陈列",
          "max": 10
        }, {
          "name": "护理知识",
          "max": 10
        }, {
          "name": "营养知识",
          "max": 10
        }, {
          "name": "店铺知识",
          "max": 10
        }],
        radius: 70,
        splitArea: {
          show: false,
          areaStyle: {
            color: 'transparent', // 雷达图背景的颜色
          }
        },
      },
      series: [{
        name: '',
        type: 'radar',
        data: [
          {
            value:  [0, 0, 5, 5, 10],
            name: '',
            label: {
              normal: {
                show: true,
                formatter: function (params) {
                  return params.value;
                }
              },
              color: '#000'
            }
          }
        ],
        symbol: 'none',
        label: {
          color: '#000',
        },
        lineStyle: {
          color: '#F3CD99'
        },
        areaStyle: {
          color: '#FDF4E8'
        }
      }]
    }
  },
  onInstance({detail: instance}) {
    const dom = instance.getDom()
    const that = this;
    dom.saveAsImage().then((path) => {
      // 临时地址
      console.log(path);
      wx.saveImageToPhotosAlbum({
        filePath: path
      })
      that.setData({
        filePath:path
      })
    });
  },
  onLoad: function () {
    console.log('代码片段是一种迷你、可分享的小程序或小游戏项目，可用于分享小程序和小游戏的开发经验、展示组件和 API 的使用、复现开发问题和 Bug 等。可点击以下链接查看代码片段的详细文档：')
    console.log('https://mp.weixin.qq.com/debug/wxadoc/dev/devtools/devtools.html')
  },
})
