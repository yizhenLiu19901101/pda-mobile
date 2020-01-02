<template>
  <div>
    <mt-header>
      <router-link to="/mine" slot="left">
        <mt-button icon="back">返回</mt-button>
      </router-link>
      <mt-button icon="more" slot="right"></mt-button>
    </mt-header>
    <span>个人数据管理专家</span>
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
