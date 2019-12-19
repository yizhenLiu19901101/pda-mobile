<template>
  <el-container width = "100%" height = "100%">
    <el-aside width = "10%" style="background-color: rgb(238, 241, 246)">
      <el-menu class="el-menu-demo" @select="choose">
        <el-menu-item v-for="(menu,index) in menuList" :key="index" :index="menu.menuPath"
        :keyPath="menu.menuPath">
          {{ menu.menuName}}
        </el-menu-item>
      </el-menu>
    </el-aside>
    <el-container>
    <el-header style="text-align: right; font-size: 12px">
       <el-dropdown>
        <i class="el-icon-setting" style="margin-right: 15px"></i>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>修改密码</el-dropdown-item>
          <el-dropdown-item>修改昵称</el-dropdown-item>
          <el-dropdown-item @click.native="logout">退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <span>乐乐</span>
    </el-header>
        <!-- 被渲染的子页面-->
      <el-main>
        <router-view></router-view>
      </el-main>
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
      menuList: null
    }
  },
  mounted: function () {
    this.queryMenuList()
  },
  methods: {
    logout () {
      axios.get('/user/logout', {
        headers: {
          'token': this.GLOBAL.token
        }
      }).then(function (response) {
        // eslint-disable-next-line
        if (response.data.code == 200) {
          // 将token值赋值给全局变量
          this.GLOBAL.token = response.data.body
          this.$router.push({name: 'Login'})
        } else {
          this.$message.error(response.data.msg)
        }
      }.bind(this))
        .catch(function (error) {
          console.log(error)
        })
    },
    // 查询用户的菜单列表
    queryMenuList () {
      axios.get('/user/queryUserPrivileges', {
        headers: {
          'token': this.GLOBAL.token
        }
      }).then(function (response) {
        // eslint-disable-next-line
        if (response.data.code == 200) {
          // 将token值赋值给全局变量
          this.menuList = response.data.body
        }
      }.bind(this))
        .catch(function (error) {
          console.log(error)
        })
    },
    choose (key, keyPath) {
      this.$router.push(key)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<!-- 引入自定义的样式文件 -->
<style scoped src="../style/home.css">
