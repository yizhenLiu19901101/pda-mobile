import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Login from '@/components/Login'
import Mine from '@/components/Mine'
import Record from '@/components/Record'
import Logout from '@/components/Logout'
import AboutUs from '@/components/AboutUs'
import AddRecord from '@/components/AddRecord'
import RecordDetail from '@/components/RecordDetail'
import UserCenter from '@/components/UserCenter'
import PasswordModify from '@/components/PasswordModify'

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
      path: '/passwordModify',
      name: 'PasswordModify',
      component: PasswordModify
    },
    {
      path: '/logout',
      name: 'Logout',
      component: Logout
    },
    {
      path: '/aboutUs',
      name: 'AboutUs',
      component: AboutUs
    },
    {
      path: '/userCenter',
      name: 'UserCenter',
      component: UserCenter
    },
    {
      path: '/addRecord',
      name: 'AddRecord',
      component: AddRecord
    },
    {
      path: '/recordDetail',
      name: 'RecordDetail',
      component: RecordDetail
    },
    {
      path: '/home',
      name: 'Home',
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
