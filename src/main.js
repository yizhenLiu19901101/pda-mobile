// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
// 引入bootstrap样式文件
import 'bootstrap/dist/js/bootstrap.min.js'
import 'bootstrap/dist/css/bootstrap.min.css'
import mintUI from 'mint-ui'
import './style/my-mint.css'
import LightTimeline from 'vue-light-timeline'
import VCharts from 'v-charts'

// 引入全局变量文件,挂载到Vue实例上面
Vue.use(mintUI)
Vue.use(VCharts)
// 使用时间轴组件
Vue.use(LightTimeline)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
