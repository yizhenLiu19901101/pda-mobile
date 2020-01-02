<template>
  <div>
   <mt-cell isLink v-for="(tag,index) in tagList" v-bind:key = "index"
   :to = "tag.menuPath">
     {{ tag.menuName }}
   </mt-cell>
  </div>
</template>
<script>
export default {
  name: 'Mine',
  data () {
    return {
      tagList: this.$store.state.tagList
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<!-- 引入自定义的样式文件 -->
<style scoped src="../style/login.css">
