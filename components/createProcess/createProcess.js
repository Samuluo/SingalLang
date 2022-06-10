//js
Component({
  /**
   * 组件的属性列表（processList为步骤条个数，iconIndex:当前步骤）
   */
  properties: {
    processList: {
      type: Array,
      observer:'loadFirst'
    },
    iconIndex: {
      type: String,
      value: '',
      observer:'loadFirst'
    },
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    loadFirst(v){
      console.log(v)
    }
  },
  lifetimes:{
    ready:function(){
    },
    attached: function () {
    },
  }
})
