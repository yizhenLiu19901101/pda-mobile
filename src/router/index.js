import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Login from '@/components/Login'
import Mine from '@/components/Mine'
import Record from '@/components/Record'
import Logout from '@/components/Logout'
import AboutUs from '@/components/AboutUs'
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
