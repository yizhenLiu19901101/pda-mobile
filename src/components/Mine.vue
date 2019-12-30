<template>
  <div>
   <mt-button type = "primary" v-for="(tag,index) in tagList" v-bind:key = "index" v-on:click.prevent = "cellClick()">
     {{ tag.menuName }}
   </mt-button>
  </div>
</template>
<script>
export default {
  name: 'Mine',
  data () {
    return {
      tagList: this.$store.state.tagList
    }
  },
  methods: {
    cellClick () {
      this.$router.push('/logout')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<!-- 引入自定义的样式文件 -->
<style scoped src="../style/login.css">
