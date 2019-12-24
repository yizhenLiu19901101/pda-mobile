import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

// 状态机入口文件
const store = new Vuex.Store({
  state: {
    // 存放组件之间共享的数据
    token: localStorage.getItem('token'),
    menuList: JSON.parse(localStorage.getItem('menuList').split(','))
  },
  mutations: {
    // 显式的更改state里的数据
    changeToken (state, a) {
      console.log('token值为 ' + a)
      state.token = a
      localStorage.setItem('token', a)
    },
    changeMenuList (state, b) {
      state.menuList = b
      localStorage.setItem('menuList', JSON.stringify(b))
    }
  }
})
export default store
