import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

// 状态机入口文件
const store = new Vuex.Store({
  state: {
    // 存放组件之间共享的数据
    token: localStorage.getItem('token'),
    currentMenu: null,
    currentUser: localStorage.getItem('currentUser') == null ? null : JSON.parse(localStorage.getItem('currentUser')),
    currentItem: localStorage.getItem('currentItem') == null ? null : JSON.parse(localStorage.getItem('currentItem')),
    menuList: localStorage.getItem('menuList') == null ? null : JSON.parse(localStorage.getItem('menuList').split(',')),
    tagList: localStorage.getItem('tagList') == null ? null : JSON.parse(localStorage.getItem('tagList').split(',')),
    items: localStorage.getItem('items') == null ? null : JSON.parse(localStorage.getItem('items').split(','))
  },
  mutations: {
    // 显式的更改state里的数据
    changeToken (state, a) {
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
    changeCurrentMenu (state, c) {
      state.currentMenu = c
      localStorage.setItem('currentMenu', JSON.stringify(c))
    },
    changeItems (state, d) {
      state.items = d
      localStorage.setItem('items', JSON.stringify(d))
    },
    changeCurrentItem (state, f) {
      state.currentItem = f
      localStorage.setItem('currentItem', JSON.stringify(f))
    },
    changeCurrentUser (state, g) {
      state.currentUser = g
      localStorage.setItem('currentUser', JSON.stringify(g))
    }
  }
})
export default store
