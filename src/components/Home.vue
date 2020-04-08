<template>
<div style = "width: 100%;height: 100%">
    <router-view style = "width: 100%;height: 90%"></router-view>
    <van-tabbar v-model = "active" @change = "change" class = "tabBar">
      <van-tabbar-item  :icon = "menu.menuImage" :name = "menu.menuId" v-bind:key = "index" v-for = "(menu, index) in menuList">
        {{ menu.menuName }}
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>
<script>
import axios from 'axios'
// 设置URL
axios.defaults.baseURL = 'https://www.zhixuanda.top/api'
export default {
  name: 'Home',
  data () {
    return {
      // 直接通过this访问全局变量
      menuList: this.$store.state.menuList,
      // 默认选中第一项
      active: this.$store.state.currentMenu
    }
  },
  created: function () {
    let menu = this.$store.state.currentMenu
    console.log(JSON.stringify(menu))
    this.queryTagList(menu)
  },
  methods: {
    change (index) {
      console.log('index = ' + index)
      // 保存当前页面的ID
      this.$store.commit('changeCurrentMenu', index)
      this.queryTagList(index)
    },
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
          this.$message.error(response.data.msg)
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
          this.$store.commit('changeTagList', response.data.body)
          for (let index in this.menuList) {
            let menu = this.menuList[index]
            if (menu.menuId === menuId) {
              console.log('menuId = ' + menu.menuId)
              if (menu.menuId === 6) {
                this.queryData(menu.menuPath)
              } else {
                this.$router.push(menu.menuPath)
              }
            }
          }
        }
      }.bind(this))
        .catch(function (error) {
          console.log(error)
        })
    },
    queryData (menuPath) {
      let financeDetailDto = {
        queryType: 1
      }
      axios.request({
        url: `/finance/getDetailDate`,
        data: financeDetailDto,
        headers: {
          'token': this.$store.state.token
        },
        method: 'post'
      }).then(function (response) {
        // eslint-disable-next-line
        if (response.data.code == 200) {
          this.$store.commit('changeItems', response.data.body)
          this.$router.push(menuPath)
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
<style scoped src="../style/home.css">
