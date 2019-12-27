import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Login from '@/components/Login'
import Mine from '@/components/Mine'
import Record from '@/components/Record'
Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/home',
      name: 'Home',
      // 重定向，第一次进入就进入看板，不添加的话第一次进入右侧是空白
      redirect: '/record',
      children: [
        {
          path: '/mine',
          name: 'Mine',
          component: Mine
        },
        {
          path: '/record',
          name: 'Record',
          component: Record
        }
      ],
      component: Home
    }
  ]
})
