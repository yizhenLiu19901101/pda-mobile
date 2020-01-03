<template>
  <div>
    <mt-header>
      <router-link to="/mine" slot="left">
        <mt-button icon="back"></mt-button>
      </router-link>
    </mt-header>
    <div style = "color:gray;text-align:center">
      个人数据管理专家
    </div>
  </div>
</template>
<script>
export default {
  name: 'AboutUs'
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<!-- 引入自定义的样式文件 -->
<style scoped src="../style/aboutUs.css">
