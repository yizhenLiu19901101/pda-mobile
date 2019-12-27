<template>
<div>
    <router-view></router-view>
    <mt-tabbar v-model = "message">
      <mt-tab-item v-bind:key="index" v-for="(menu, index) in menuList"
        :id = "menu.menuPath">
        {{ menu.menuName}}
      </mt-tab-item>
    </mt-tabbar>
  </div>
</template>
<script>
import axios from 'axios'
// 设置URL
axios.defaults.baseURL = 'http://www.client.zhixuanda.top/api'
export default {
  name: 'Home',
  data () {
    return {
      // 直接通过this访问全局变量
      menuList: this.$store.state.menuList,
      message: '/record'
    }
  },
  watch: {
    message: function (val, oldVal) {
      console.log(val + '' + oldVal)
      if (val !== oldVal) {
        console.log(val)
        this.$router.push(val)
      }
    }
  },
  methods: {
    logout () {
      axios.get('/user/logout', {
        headers: {
          'token': this.$store.state.token
        }
      }).then(function (response) {
        // eslint-disable-next-line
        if (response.data.code == 200) {
          this.$router.push({name: 'Login'})
        } else {
          this.$message.error(response.data.msg)
        }
      }.bind(this))
        .catch(function (error) {
          console.log(error)
        })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<!-- 引入自定义的样式文件 -->
<style scoped src="../style/home.css">
