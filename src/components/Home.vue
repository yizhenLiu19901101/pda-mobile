<template>
  <el-container style="width: 100%;height: 100%;">
    <el-header>
      <el-row :gutter="20">
        <el-col :span="18">
          <el-menu @select="choose" mode="horizontal" style="background-color: #007BFF">
            <el-menu-item v-for="(menu,index) in menuList" :key="index" :index="menu.menuPath"
              :keyPath="menu.menuPath">
              {{ menu.menuName}}
            </el-menu-item>
          </el-menu>
        </el-col>
        <el-col :span="2">
        <el-dropdown>
          <i class="el-icon-setting" style="color: #FFFFFF;margin-right: 15px"></i>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>修改密码</el-dropdown-item>
            <el-dropdown-item>修改昵称</el-dropdown-item>
            <el-dropdown-item @click.native="logout">退出</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <span style="color: #FFFFFF">lele</span>
      </el-col>
    </el-row>
      </el-header>
      <!-- 被渲染的子页面-->
      <el-main>
        <router-view></router-view>
      </el-main>
  </el-container>
</template>
<script>
import axios from 'axios'
// 设置URL
axios.defaults.baseURL = 'http://www.operate.zhixuanda.top/api'
export default {
  name: 'Home',
  data () {
    return {
      // 直接通过this访问全局变量
      menuList: this.$store.state.menuList
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
