<template>
  <div>
    <van-nav-bar left-arrow @click-left = "onClickLeft">
    </van-nav-bar>
    <div style = "color:gray;text-align:center">
      个人数据管理专家
    </div>
  </div>
</template>
<script>
export default {
  name: 'AboutUs',
  methods: {
    onClickLeft () {
      this.$router.push({name: 'Mine'})
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<!-- 引入自定义的样式文件 -->
<style scoped src="../style/aboutUs.css">
