<template>
  <div>
    <form class="form-signin">
      <img class="mb-4" src="../assets/dog.jpg" alt="登录" width="300" height="200">
      <input type="userName" id="inputUserName"  class="form-control" v-model="userName" placeholder="用户名" required autofocus>
      <input type="password" id="inputPassword" v-model="userPassword"  class="form-control" placeholder="密码" required>
      <!--暂时不需要注册登陆以及记住我-->
      <!--
      <div class="checkbox mb-3">
        <label class="left">
          <input type="checkbox" value="remember-me"> 记住我
        </label>
        <label class="right">
          <a href="#" class="nav-link">注册/忘记密码</a>
        </label>
      </div>
      -->
      <br>
      <button class="btn btn-lg btn-primary btn-block" type="submit" v-on:click.prevent="login(userName,userPassword)">登录</button>
    </form>
  </div>
</template>
<script>
import axios from 'axios'
// 设置URL
axios.defaults.baseURL = 'http://www.api.zhixuanda.top'
export default {
  name: 'Login',
  data () {
    return {
      userName: '',
      userPassword: ''
    }
  },
  methods: {
    // 登录
    login (userName, userPassword) {
      let user = {
        userName: userName,
        password: userPassword
      }
      axios.request({
        url: `/user/login`,
        data: user,
        method: 'post'
      }).then(function (response) {
        // eslint-disable-next-line
        if (response.data.code == 200) {
          // 将token值赋值给全局变量
          this.$store.commit('changeToken', response.data.body)
          axios.get('/user/queryUserPrivileges', {
            headers: {
              'token': this.$store.state.token
            }
          }).then(function (response) {
            // eslint-disable-next-line
            if (response.data.code == 200) {
              // 将token值赋值给全局变量
              this.$store.commit('changeMenuList', response.data.body)
              this.$router.push({name: 'Home'})
            }
          }.bind(this))
            .catch(function (error) {
              console.log(error)
            })
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
<style scoped src="../style/login.css">
