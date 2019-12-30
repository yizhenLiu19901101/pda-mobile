<template>
  <div>
  <mt-navbar>
    <mt-tab-item v-for="(tag,index) in tagList" v-bind:key = "index"
    :id = "tag">
      {{tag.menuName}}
    </mt-tab-item>
  </mt-navbar>
  </div>
</template>
<script>
export default {
  // 名称
  name: 'Record',
  data () {
    return {
      menuId: this.$store.state.currentMenuId,
      tagList: this.$store.state.tagList
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<!-- 引入自定义的样式文件 -->
<style scoped src="../style/login.css">
