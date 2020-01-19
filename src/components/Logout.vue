<template>
  <div style = "width:100%;height:100%">
    <van-nav-bar left-arrow @click-left = "onClickLeft">
    </van-nav-bar>
    <div style="margin-top:10%;">
      <van-cell-group>
        <van-cell isLink v-for="(tag,index) in tagList" v-bind:key = "index"
        :to = "tag.menuPath" :title = "tag.menuName" :icon = "tag.menuImage">
        </van-cell>
      </van-cell-group>
    </div>
    <div style = "margin-top: 98%">
      <van-button type ="info" v-on:click = "logout" block>
        退出
      </van-button>
    </div>
  </div>
</template>
<script>
import axios from 'axios'
export default {
  name: 'Logout',
  data () {
    return {
      // 直接通过this访问全局变量
      tag: this.$store.state.currentMenu,
      tagList: null
    }
  },
  created: function () {
    let menu = this.$store.state.currentMenu
    console.log(JSON.stringify(menu))
    this.queryTagList(menu.menuId)
  },
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
        } else {
          // 消息提示
          this.$toast(response.data.msg)
          this.$router.push({name: 'Login'})
        }
      }.bind(this))
        .catch(function (error) {
          console.log(error)
        })
    },
    queryTagList (menuId) {
      // 获得下一个页面的标签列表
      axios.get('/user/queryUserPrivileges/' + menuId, {
        headers: {
          'token': this.$store.state.token
        }
      }).then(function (response) {
        // eslint-disable-next-line
        if (response.data.code == 200) {
          // 将token值赋值给全局变量
          this.tagList = response.data.body
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
