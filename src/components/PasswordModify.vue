<template>
  <div>
    <van-nav-bar left-arrow @click-left = "onClickLeft">
    </van-nav-bar>
    <van-field label = "新密码" type = "password" v-model = "password" input-align = "right"/>
    <van-field label = "确认密码" type = "password" v-model = "confirmPassword" input-align = "right"/>
    <div style = "margin-top: 5%">
      <van-button class = "submitButton" round type="info" @click = "updateUserPassword(confirmPassword,password)">
        提交
      </van-button>
    </div>
  </div>
</template>
<script>
import axios from 'axios'
export default {
  name: 'PasswordModify',
  data () {
    return {
      reversion: this.$store.state.currentUser == null ? null : this.$store.state.currentUser.reversion,
      id: this.$store.state.currentUser == null ? null : this.$store.state.currentUser.id
    }
  },
  methods: {
    onClickLeft () {
      this.$router.push({name: 'Logout'})
    },
    // 修改用户密码
    updateUserPassword (confirmPassword, password) {
      if (confirmPassword !== password) {
        this.$toast('确认密码和新密码不一致')
      }
      let data = {
        id: this.id,
        password: password,
        reversion: this.reversion
      }
      let config = {
        headers: {
          'token': this.$store.state.token
        }
      }
      // 添加请求头
      axios.put('/user/updateUserPassword', data, config).then(function (response) {
        // eslint-disable-next-line
        if (response.data.code == 200) {
          this.$router.push({name: 'Logout'})
        } else {
          this.$toast(response.data.msg)
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
<style scoped src="../style/passwordModify.css">
