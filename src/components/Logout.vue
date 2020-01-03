<template>
  <div style = "width:100%;height:100%">
    <mt-header>
    <router-link to="/mine" slot="left">
      <mt-button icon="back"></mt-button>
    </router-link>
  </mt-header>
  <mt-button type = 'primary' v-on:click = "logout">
    退出
  </mt-button>
  </div>
</template>
<script>
import axios from 'axios'
export default {
  name: 'Logout',
  methods: {
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
