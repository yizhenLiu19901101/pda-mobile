<template>
  <div>
    <div style = "margin-left:30%;margin-top:5%">
      <div>
        <img class = "logo_icon" :src = "currentUser.imageUrl" alt="头像" />
        <span style="margin-left:5%">
          {{ currentUser.userName}}
        </span>
      </div>
      <span>
        {{ currentUser.userDesc }}
      </span>
      <br>
      <span>
       {{ currentUser.userLevel}}
      </span>
    </div>
    <div style="margin-top:60%;">
      <mt-cell isLink v-for="(tag,index) in tagList" v-bind:key = "index"
      :to = "tag.menuPath">
        {{ tag.menuName }}
      </mt-cell>
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
      currentUser: null
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
