import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

// 状态机入口文件
const store = new Vuex.Store({
  state: {
    // 存放组件之间共享的数据
    token: localStorage.getItem('token'),
    currentMenuId: localStorage.getItem('currentMenuId') == null ? null : localStorage.getItem('currentMenuId'),
    menuList: localStorage.getItem('menuList') == null ? null : JSON.parse(localStorage.getItem('menuList').split(',')),
    tagList: localStorage.getItem('tagList') == null ? null : JSON.parse(localStorage.getItem('tagList').split(','))
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
    },
    changeTagList (state, e) {
      state.tagList = e
      localStorage.setItem('tagList', JSON.stringify(e))
    },
    changeCurrentMenuId (state, c) {
      console.log('currentMenuId值为 ' + c)
      state.currentMenuId = c
      localStorage.setItem('currentMenuId', c)
    }
  }
})
export default store
