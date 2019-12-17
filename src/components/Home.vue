<template>
  <el-container width = "100%" height = "100%">
    <el-aside width = "10%" style="background-color: rgb(238, 241, 246)">
      <el-menu  class="el-menu-demo">
        <el-menu-item v-for="(menu,index) in menuList" :key="index">
          {{ menu.menuName }}
        </el-menu-item>
      </el-menu>
    </el-aside>
    <el-container>
    <el-header style="text-align: right; font-size: 12px">
      <span v-on:click="logout()">退出</span>
    </el-header>
      <el-main></el-main>
    </el-container>
  </el-container>
</template>
<script>
import axios from 'axios'
// 设置URL
axios.defaults.baseURL = 'http://www.api.zhixuanda.top'
export default {
  name: 'Home',
  data () {
    return {
      // 直接通过this访问全局变量
      menuList: this.GLOBAL.menuList
    }
  },
  methods: {
    logout () {
      console.log(this.GLOBAL.token)
      axios.get('/user/logout', {
        headers: {
          'token': this.GLOBAL.token
        }
      }).then(function (response) {
        // eslint-disable-next-line
        if (response.data.code == 200) {
          console.log('退出成功')
          // 将token值赋值给全局变量
          this.GLOBAL.token = response.data.body
          this.$router.push({name: 'Login'})
        } else {
          this.$message.error(response.data.msg)
          console.log(response.data.msg)
        }
      }.bind(this))
        .catch(function (error) {
          console.log(error)
        })
    },
    queryUserMenus () {
      axios.get('/user/queryUserPrivileges', {
        headers: {
          'token': this.GLOBAL.token
        }
      }).then(function (response) {
        // eslint-disable-next-line
        if (response.data.code == 200) {
          // 将token值赋值给全局变量
          this.GLOBAL.menuList = response.data.body
          console.log(this.GLOBAL.menuList)
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
