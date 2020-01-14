<template>
  <div style = "width:100%;height:100%">
  <van-nav-bar left-arrow @click-left = "onClickLeft">
  </van-nav-bar>
  <van-button round type ="info" v-on:click = "logout" block>
    退出
  </van-button>
  </div>
</template>
<script>
import axios from 'axios'
export default {
  name: 'Logout',
  methods: {
    onClickLeft () {
      this.$router.push({name: 'Mine'})
    },
    // 退出
    logout () {
      axios.get('/user/logout', {
        headers: {
          'token': this.$store.state.token
        }
      }).then(function (response) {
        // eslint-disable-next-line
        if (response.data.code == 200) {
          this.$router.push({name: 'Login'})
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
<style scoped src="../style/logout.css">
