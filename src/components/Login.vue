<template>
  <div class="hello">
     <button v-on:click="logout()">返回</button>
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
      // 直接通过this访问全局变量
      token: this.GLOBAL.token
    }
  },
  methods: {
    logout () {
      axios.create({
        headers: {
          'X-Requested-With': 'XMLHttpRequest',
          'Content-Type': 'application/json; charset=UTF-8',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, PATCH, DELETE',
          'token': this.GLOBAL.token
        }
      })
      let user = {
        userToken: this.GLOBAL.token
      }
      console.log(this.GLOBAL.token)
      axios.post('/user/logout', user).then(function (response) {
        // eslint-disable-next-line
        if (response.data.code == 200) {
          console.log('退出成功')
          // 将token值赋值给全局变量
          this.GLOBAL.token = response.data.body
          this.$router.push({name: 'HelloWorld'})
        } else {
          this.$message.error(response.data.msg)
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
<!-- 引入自定义的样式文件 -->
<style scoped src="../style/signin.css">
