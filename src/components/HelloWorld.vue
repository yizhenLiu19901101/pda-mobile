<template>
  <div class="hello">
       <form class="form-signin">
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
      <button class="btn btn-lg btn-primary btn-block" type="submit" v-on:click.prevent="login(userName,userPassword)">登录</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'HelloWorld',
  data () {
    return {
      userName: '',
      userPassword: ''
    }
  },
  methods: {
    login (userName, userPassword) {
      axios.create({
        headers: {
          'X-Requested-With': 'XMLHttpRequest',
          'Content-Type': 'application/json; charset=UTF-8',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, PATCH, DELETE'
        }
      })
      let user = {
        userName: userName,
        password: userPassword
      }
      axios.post('/api/user/login', user).then(function (response) {
        //eslint-disable-line
        if (response.data.code == 200) {
          console.log('登陆成功')
          this.$router.push({name: 'Login'})
        } else {
          alert(response.data.msg)
          console.log(response.data.msg)
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
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
