import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

// 状态机入口文件
const store = new Vuex.Store({
  state: {
    // 存放组件之间共享的数据
    token: '1234567',
    menuList: {}
  },
  mutations: {
    // 显式的更改state里的数据
    changeToken (state, a) {
      console.log('token值为 ' + a)
      state.token = a
    },
    changeMenuList (state, b) {
      state.menuList = b
    }
  }
})
export default store
