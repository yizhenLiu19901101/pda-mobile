<template>
  <div>
    <div style = "margin-left:30%;margin-top:20%">
      <img class = "logo_icon" :src = "currentUser.imageUrl" alt = "头像"/>
      <span style="margin-left:5%">
        {{ currentUser.userName }}
      </span>
      <span style="margin-left:1%">
        <img slot = "icon" class = "level_icon" src = "../assets/gold.png" v-if = "currentUser.userLevel == 3"/>
        <img slot = "icon" class = "level_icon" src = "../assets/silver.png" v-if = "currentUser.userLevel == 2"/>
        <img slot = "icon" class = "level_icon" src = "../assets/bronze.png" v-if = "currentUser.userLevel == 1"/>
      </span>
    </div>
    <div style = "margin-top:5%;color:gray;text-align:center">
      {{currentUser.userDesc}}
    </div>
    <div style="margin-top:40%;">
      <van-cell-group>
        <van-cell isLink v-for="(tag,index) in tagList" v-bind:key = "index"
        :to = "tag.menuPath" :title = "tag.menuName">
          <img slot = "icon" :src = "tag.menuImage" width = "24" height = "24">
        </van-cell>
      </van-cell-group>
    </div>
  </div>
</template>
<script>
import axios from 'axios'
export default {
  name: 'Mine',
  data () {
    return {
      tagList: this.$store.state.tagList,
      currentUser: {
        userLevel: null,
        imageUrl: null,
        userName: null,
        userDesc: null
      }
    }
  },
  created: function () {
    // 查询当前用户的信息
    this.queryUserInfo()
  },
  methods: {
    queryUserInfo () {
      axios.get('/user/findByToken', {
        headers: {
          'token': this.$store.state.token
        }
      }).then(function (response) {
        // eslint-disable-next-line
        if (response.data.code == 200) {
          this.currentUser = response.data.body
        } else {
          this.$message.error(response.data.msg)
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
<style scoped src="../style/mine.css">
