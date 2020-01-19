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
      <van-uploader :after-read = "afterRead" :before-read = "beforeRead" >
        <van-image round width = "2rem" height = "2rem" :src = "imageUrl"/>
      </van-uploader>
      </span>
    </van-cell-group>
    <van-field label = "用户简介" v-model = "userDesc" input-align = "right"/>
    <div style = "margin-top: 5%">
      <van-button class = "submitButton" round type="info" @click = "updateUserInfo (userName,imageUrl, userDesc)">
        提交
      </van-button>
    </div>
  </div>
</template>
<script>
import axios from 'axios'
export default {
  name: 'UserCenter',
  data () {
    return {
      show: false,
      userName: this.$store.state.currentUser == null ? null : this.$store.state.currentUser.userName,
      imageUrl: this.$store.state.currentUser == null ? null : this.$store.state.currentUser.imageUrl,
      userDesc: this.$store.state.currentUser == null ? null : this.$store.state.currentUser.userDesc,
      reversion: this.$store.state.currentUser == null ? null : this.$store.state.currentUser.reversion,
      id: this.$store.state.currentUser == null ? null : this.$store.state.currentUser.id
    }
  },
  methods: {
    onClickLeft () {
      this.$router.push({name: 'Mine'})
    },
    // 修改用户信息
    updateUserInfo (userName, imageUrl, userDesc) {
      let data = {
        id: this.id,
        userName: userName,
        imageUrl: imageUrl,
        userDesc: userDesc,
        reversion: this.reversion
      }
      let config = {
        headers: {
          'token': this.$store.state.token
        }
      }
      // 添加请求头
      axios.put('/user/updateUserInfo', data, config).then(function (response) {
        // eslint-disable-next-line
        if (response.data.code == 200) {
          this.$router.push({name: 'Mine'})
        } else {
          this.$toast(response.data.msg)
        }
      }.bind(this))
        .catch(function (error) {
          console.log(error)
        })
    },
    // 上传之前校验
    beforeRead (file) {
      if (file.type !== 'image/jpeg' && file.type !== 'image/png') {
        this.$toast('只允许上传jpg/png格式的图片！')
        return false
      }
      return true
    },
    // 文件读取完成后的回调函数
    async afterRead (file) {
      // 创建form对象
      var formdata1 = new FormData()
      // 通过append向form对象添加数据,可以通过append继续添加数据
      formdata1.append('file', file.file)
      let config = {
        headers: {
          'Content-Type': 'multipart/form-data',
          'token': this.$store.state.token
        }
      }
      // 添加请求头
      axios.post('/file/uploadImage', formdata1, config).then(function (response) {
        this.show = true
        // eslint-disable-next-line
        if (response.data.code == 200) {
          this.show = false
          this.imageUrl = response.data.body
          console.log(this.imageUrl)
        } else {
          this.show = false
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
<style scoped src="../style/userCenter.css">
