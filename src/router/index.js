import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Login from '@/components/Login'
import Menu from '@/components/Menu'
import Role from '@/components/Role'
import User from '@/components/User'
import ShowView from '@/components/ShowView'
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
      redirect: '/showView',
      children: [
        {
          path: '/menu',
          name: 'Menu',
          component: Menu
        },
        {
          path: '/user',
          name: 'User',
          component: User
        },
        {
          path: '/role',
          name: 'Role',
          component: Role
        },
        {
          path: '/showView',
          name: 'ShowView',
          component: ShowView
        }
      ],
      component: Home
    }
  ]
})
