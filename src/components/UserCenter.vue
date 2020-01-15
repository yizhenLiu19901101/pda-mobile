<template>
  <div>
    <van-nav-bar left-arrow @click-left = "onClickLeft">
    </van-nav-bar>
    <van-field label = "用户名" v-model = "userName" input-align = "right"/>
    <van-cell-group>
      <span style = "float:left">
        <van-field  label = "头像"/>
      </span>
      <span style = "float: right;margin-right: 1rem;margin-top: 1rem;">
      <van-uploader :after-read = "uploadImage">
        <van-image round width = "2rem" height = "2rem" :src = "imageUrl"/>
      </van-uploader>
      </span>
    </van-cell-group>
    <van-field label = "用户简介" v-model = "userDesc" input-align = "right"/>
      <van-button class = "submitButton" round type="info" @click = "updateUserInfo (userName,imageUrl, userDesc)">
      提交
    </van-button>
  </div>
</template>
<script>
import axios from 'axios'
export default {
  name: 'UserCenter',
  data () {
    return {
      userName: this.$store.state.currentUser == null ? null : this.$store.state.currentUser.userName,
      imageUrl: this.$store.state.currentUser == null ? null : this.$store.state.currentUser.imageUrl,
      userDesc: this.$store.state.currentUser == null ? null : this.$store.state.currentUser.userDesc
    }
  },
  methods: {
    onClickLeft () {
      this.$router.push({name: 'Mine'})
    },
    // 修改用户信息
    updateUserInfo (userName, imageUrl, userDesc) {
      console.log(userName + '' + '' + userDesc + '' + imageUrl)
    },
    uploadImage (file) {
      axios.put('/file/uploadFile', {
        headers: {
          'token': this.$store.state.token
        },
        data: file
      }).then(function (response) {
        // eslint-disable-next-line
        if (response.data.code == 200) {
          this.imageUrl = response.data.body
          console.log(this.imageUrl)
        } else {
          this.$toast(response.data.msg)
        }
      }.bind(this))
        .catch(function (error) {
          console.log(error)
        })
      console.log('上传文件')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<!-- 引入自定义的样式文件 -->
<style scoped src="../style/userCenter.css">
